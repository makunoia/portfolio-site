import {openai} from "@ai-sdk/openai";
import {streamText, Output} from "ai";
import {getPersonalContext} from "../../../(app)/lib/vector-db";
import {headers} from "next/headers";
import {z} from "zod";

// Simple in-memory rate limiter (use Redis in production)
const rateLimiter = new Map<string, {count: number; resetTime: number}>();

function checkRateLimit(ip: string, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const userLimit = rateLimiter.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimiter.set(ip, {count: 1, resetTime: now + windowMs});
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count++;
  return true;
}

export const maxDuration = 30;
export const runtime = "edge";

type IncomingMessage = {role: "user" | "assistant"; text: string};

// Schema for structured response with text and useful links
const responseSchema = z.object({
  text: z.string().describe("The main response text in markdown format"),
  usefulLinks: z
    .array(
      z.object({
        resource_name: z.string().describe("Display name for the resource"),
        resource_link: z.string().url().describe("Valid URL to the resource"),
      })
    )
    .optional()
    .describe("Array of useful links related to the response"),
});

export async function POST(req: Request) {
  // Get IP from headers
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    console.log("Rate limit exceeded");
    return new Response("Rate limit exceeded", {status: 429});
  }

  const {messages}: {messages: IncomingMessage[]} = await req.json();

  // Get the latest user message
  const latestMessage = messages[messages.length - 1];
  const isUserMessage = latestMessage?.role === "user";

  // Get personal context if this is a user message
  let personalContext = "";
  if (isUserMessage && latestMessage?.text) {
    try {
      personalContext = await getPersonalContext(latestMessage.text, 0.65);
    } catch (error) {
      console.error("Error getting personal context:", error);
      // Continue without context if there's an error
    }
  }

  // Create system message with personal context
  const systemPrompt = `You are an assistant to visitors on Mark's portfolio website. You have access to his personal and professional information through a knowledge base.

GUIDELINES:
- ONLY answer questions about Mark's background, experience, skills, projects, and achievements.
- If a user ask for fit for a role, compare Mark's profile to the role requirements to answer the question accurately with a list of why Mark is a good fit for the role.
- If asked about topics outside Mark's professional/personal context, politely redirect: "I can only help with questions about Mark's background and experience."
- Be concise but informative (2-3 paragraphs max unless specifically asked for details)
- If you're unsure about specific details, say "I don't have that specific information" rather than guessing
- For contact requests, direct users to Mark's email: markbriannoya@gmail.com or LinkedIn
- Never make up information not provided in the context

RESPONSE STYLE:
- Professional but conversational
- Use the third person when speaking for Mark ("Mark has experience in...")
- Include specific examples and metrics when available
- Format lists and technical details clearly
- Do not include links in the main response text nor prompts to the user to visit links

USEFUL LINKS:
- Include links to Mark's resume, portfolio projects, LinkedIn, GitHub, or other relevant resources  
- Only include links that are directly related to the question and response
- Use descriptive resource names like "Mark's Resume", "LinkedIn Profile", etc.
- Ensure all URLs are valid and accessible

${personalContext ? `\nCONTEXT:\n${personalContext}` : ""}

Remember: Only respond based on the provided context. If the question isn't related to Mark's professional background, politely redirect.`;

  // Prepare messages with system context
  const messagesWithContext = [
    {
      role: "system" as const,
      content: systemPrompt,
    },
    ...messages.map((m) => ({
      role: m.role,
      content: m.text,
    })),
  ];

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: messagesWithContext,
    experimental_output: Output.object({
      schema: responseSchema,
    }),
  });

  // For experimental_output, we need to handle the stream differently
  return new Response(
    new ReadableStream({
      start(controller) {
        (async () => {
          try {
            for await (const part of result.experimental_partialOutputStream) {
              const chunk = JSON.stringify(part) + "\n";
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
          }
        })();
      },
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );
}
