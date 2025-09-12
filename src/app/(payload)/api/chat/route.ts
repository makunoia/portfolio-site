import {openai} from "@ai-sdk/openai";
import {streamText} from "ai";

export const maxDuration = 30;
export const runtime = "edge";

type IncomingMessage = {role: "user" | "assistant"; text: string};

export async function POST(req: Request) {
  const {messages}: {messages: IncomingMessage[]} = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: messages.map((m) => ({
      role: m.role,
      content: [{type: "text", text: m.text}],
    })),
  });

  // Stream back plain text for easy client consumption
  return result.toTextStreamResponse();
}
