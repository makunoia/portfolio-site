import {openai} from "@ai-sdk/openai";
import {streamText} from "ai";
import {getPersonalContext} from "../../../(app)/lib/vector-db";

export const maxDuration = 30;
export const runtime = "edge";

type IncomingMessage = {role: "user" | "assistant"; text: string};

export async function POST(req: Request) {
  const {messages}: {messages: IncomingMessage[]} = await req.json();

  // Get the latest user message
  const latestMessage = messages[messages.length - 1];
  const isUserMessage = latestMessage?.role === "user";

  // Get personal context if this is a user message
  let personalContext = "";
  if (isUserMessage && latestMessage?.text) {
    try {
      personalContext = await getPersonalContext(latestMessage.text);
    } catch (error) {
      console.error("Error getting personal context:", error);
      // Continue without context if there's an error
    }
  }

  // Create system message with personal context
  const systemPrompt = `You are a helpful AI assistant for a portfolio website. You have access to the user's personal information and should use it to provide accurate, personalized responses about their background, experience, skills, projects, and achievements.

${personalContext ? `\nHere is relevant personal information for the current query:\n${personalContext}\n` : ""}

Guidelines:
- Always be helpful and professional
- Use the personal information provided to give accurate responses
- If you don't have specific information about something, say so rather than making assumptions
- Focus on the user's professional background, skills, and achievements
- Be concise but informative
- If asked about contact information, projects, or experience, refer to the personal information provided

Remember: You should only respond based on the personal information provided. If the query is not related to the user's professional background or personal information, politely redirect the conversation to topics you can help with.`;

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
  });

  // Stream back plain text for easy client consumption
  return result.toTextStreamResponse();
}
