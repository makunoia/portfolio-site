import {openai} from "@ai-sdk/openai";
import {embedMany, embed} from "ai";
import fs from "fs/promises";
import path from "path";
import {personalInfoToChunks} from "./personal-chunking.js";

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

// Minimal Pinecone HTTP helpers (Edge-compatible)
async function pineconeUpsert(
  vectors: Array<{
    id: string;
    values: number[];
    metadata?: Record<string, any>;
  }>
) {
  if (!PINECONE_API_KEY || !PINECONE_INDEX_HOST) {
    throw new Error("Pinecone credentials (API key/host) are missing");
  }
  const body: any = {vectors};
  if (PINECONE_NAMESPACE) body.namespace = PINECONE_NAMESPACE;

  const res = await fetch(`${PINECONE_INDEX_HOST}/vectors/upsert`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": PINECONE_API_KEY,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinecone upsert failed: ${res.status} ${text}`);
  }
}

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

// Function to chunk content into smaller pieces for better embedding
function chunkContent(content: string, maxChunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  let currentChunk = "";

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (
      currentChunk.length + trimmedSentence.length > maxChunkSize &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.trim());
      currentChunk = trimmedSentence;
    } else {
      currentChunk += (currentChunk ? ". " : "") + trimmedSentence;
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Function to generate embeddings for multiple chunks
async function generateEmbeddings(chunks: string[]): Promise<number[][]> {
  try {
    const {embeddings} = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    return embeddings;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw new Error("Failed to generate embeddings");
  }
}

// Function to upsert personal information into vector database
export async function upsertPersonalInfo() {
  try {
    // Read personal information from JSON file
    const personalInfoPath = path.join(process.cwd(), "personal-info.json");
    const data = await fs.readFile(personalInfoPath, "utf-8");
    const personalInfo = JSON.parse(data);

    // Convert personal information to searchable chunks
    const chunks = personalInfoToChunks(personalInfo);

    // Generate embeddings for each chunk
    const embeddings = await generateEmbeddings(chunks.map((c) => c.content));

    // Prepare vectors for Pinecone upsert
    const vectors = embeddings.map((values, i) => ({
      id: `personal_info_${chunks[i].type}_${i}`,
      values,
      metadata: chunks[i],
    }));

    // Batch upsert to stay within API limits
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await pineconeUpsert(batch);
    }

    console.log(
      `Successfully upserted ${vectors.length} chunks of personal information`
    );
    return {success: true, chunksCount: vectors.length};
  } catch (error) {
    console.error("Error upserting personal information:", error);
    throw new Error("Failed to upsert personal information");
  }
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

// Pinecone-based implementation; no in-memory store exported
