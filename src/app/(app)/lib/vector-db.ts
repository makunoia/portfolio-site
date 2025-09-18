import {openai} from "@ai-sdk/openai";
import {embed} from "ai";

// Pinecone (HTTP) configuration
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_HOST = process.env.PINECONE_INDEX_HOST; // e.g. https://<index>-<project>.svc.<env>.pinecone.io
const PINECONE_NAMESPACE = process.env.PINECONE_NAMESPACE || undefined; // optional
const PINECONE_TOPK_DEFAULT = 8; // Increased from 5

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
  includeMetadata: boolean = true,
  filter?: Record<string, any>
) {
  if (!PINECONE_API_KEY || !PINECONE_INDEX_HOST) {
    throw new Error("Pinecone credentials (API key/host) are missing");
  }
  const body: any = {vector, topK, includeMetadata};
  if (PINECONE_NAMESPACE) body.namespace = PINECONE_NAMESPACE;
  if (filter) body.filter = filter;

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

// Enhanced company detection and filtering
function buildExperienceFilterFromQuery(query: string) {
  const q = query.toLowerCase();
  const mentionsExperience =
    /\b(experience|worked|employer|company|role|at\s+|job|position|career)\b/i.test(
      query
    );

  if (!mentionsExperience) return null;

  // Enhanced company extraction - handles various patterns
  const patterns = [
    /\bat\s+([A-Z][\w&.\- ]+(?:\s+\([^)]+\))?)/i, // "at Company (Location)"
    /\bwith\s+([A-Z][\w&.\- ]+)/i, // "with Company"
    /\b(multisys|innocxell|tanda|recontech)\b/i, // Known company names
  ];

  let rawCompany = null;
  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      rawCompany = match[1]?.trim();
      break;
    }
  }

  const filter: any = {type: {$eq: "experience"}};

  if (rawCompany) {
    // Support both exact company match and aliases
    filter.$or = [{company: {$eq: rawCompany}}, {aliases: {$in: [rawCompany]}}];
  }

  return filter;
}

// Function to find relevant content based on user query
export async function findRelevantContent(
  query: string,
  topK: number = PINECONE_TOPK_DEFAULT,
  filter?: Record<string, any>
) {
  try {
    // Generate embedding for the query
    const {embedding} = await embed({
      model: embeddingModel,
      value: query,
    });

    // Query Pinecone with optional filtering
    const result = await pineconeQuery(embedding, topK, true, filter);

    const matches = Array.isArray(result.matches) ? result.matches : [];
    return matches.map((m: any) => ({
      content: m.metadata?.content,
      type: m.metadata?.type,
      source: m.metadata?.source,
      company: m.metadata?.company,
      title: m.metadata?.title,
      similarity: m.score,
    }));
  } catch (error) {
    console.error("Error finding relevant content:", error);
    throw new Error("Failed to find relevant content");
  }
}

// Enhanced function to get context for AI assistant
export async function getPersonalContext(query: string): Promise<string> {
  try {
    const xpFilter = buildExperienceFilterFromQuery(query);

    // First pass: if experience-related, prefilter to experience; else general
    let relevantContent = await findRelevantContent(
      query,
      PINECONE_TOPK_DEFAULT,
      xpFilter || undefined
    );

    // Fallback: if too few results, do a general search and merge
    if ((relevantContent?.length || 0) < 2) {
      const general = await findRelevantContent(query, PINECONE_TOPK_DEFAULT);
      // Merge unique by content to avoid duplicates
      const seen = new Set<string>();
      relevantContent = [...(relevantContent || []), ...general].filter((r) => {
        const key = (r.type || "") + ":" + (r.content || "");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    if (!relevantContent.length) {
      return "No relevant personal information found for this query.";
    }

    const context = relevantContent
      .map(
        (item: {
          type?: string;
          content?: string;
          company?: string;
          title?: string;
        }) => {
          const header =
            item.company && item.title
              ? `[${(item.type || "context").toUpperCase()} - ${item.company}]`
              : `[${(item.type || "context").toUpperCase()}]`;
          return `${header} ${item.content || ""}`;
        }
      )
      .join("\n\n");

    return `Personal Information Context:\n${context}`;
  } catch (error) {
    console.error("Error getting personal context:", error);
    return "Unable to retrieve personal information context.";
  }
}
