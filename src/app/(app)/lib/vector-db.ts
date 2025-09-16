import {openai} from "@ai-sdk/openai";
import {embed} from "ai";

// Pinecone (HTTP) configuration
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_HOST = process.env.PINECONE_INDEX_HOST; // e.g. https://<index>-<project>.svc.<env>.pinecone.io
const PINECONE_NAMESPACE = process.env.PINECONE_NAMESPACE || undefined; // optional
const PINECONE_TOPK_DEFAULT = 5;

if (!PINECONE_API_KEY) {
  console.warn(
    "PINECONE_API_KEY is not set. Upsert/query will fail until it's configured."
  );
}
if (!PINECONE_INDEX_HOST) {
  console.warn(
    "PINECONE_INDEX_HOST is not set. Provide your index host URL from Pinecone console."
  );
}

// Embedding model configuration (1536 dims)
const embeddingModel = openai.embedding("text-embedding-3-small");

async function pineconeQuery(
  vector: number[],
  topK: number = PINECONE_TOPK_DEFAULT,
  includeMetadata: boolean = true
) {
  if (!PINECONE_API_KEY || !PINECONE_INDEX_HOST) {
    throw new Error("Pinecone credentials (API key/host) are missing");
  }
  const body: any = {vector, topK, includeMetadata};
  if (PINECONE_NAMESPACE) body.namespace = PINECONE_NAMESPACE;

  const res = await fetch(`${PINECONE_INDEX_HOST}/query`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": PINECONE_API_KEY,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinecone query failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  return json;
}

// Function to find relevant content based on user query
export async function findRelevantContent(query: string, topK: number = 5) {
  try {
    // Generate embedding for the query
    const {embedding} = await embed({
      model: embeddingModel,
      value: query,
    });

    // Query Pinecone
    const result = await pineconeQuery(embedding, topK, true);

    const matches = Array.isArray(result.matches) ? result.matches : [];
    return matches.map((m: any) => ({
      content: m.metadata?.content,
      type: m.metadata?.type,
      source: m.metadata?.source,
      similarity: m.score,
    }));
  } catch (error) {
    console.error("Error finding relevant content:", error);
    throw new Error("Failed to find relevant content");
  }
}

// Function to get context for AI assistant
export async function getPersonalContext(query: string): Promise<string> {
  try {
    const relevantContent = await findRelevantContent(query, 3);

    if (relevantContent.length === 0) {
      return "No relevant personal information found for this query.";
    }

    const context = relevantContent
      .map(
        (item: {type?: string; content?: string}) =>
          `[${(item.type || "context").toUpperCase()}] ${item.content || ""}`
      )
      .join("\n\n");

    return `Personal Information Context:\n${context}`;
  } catch (error) {
    console.error("Error getting personal context:", error);
    return "Unable to retrieve personal information context.";
  }
}
