import {openai} from "@ai-sdk/openai";
import {embed} from "ai";

// Pinecone (HTTP) configuration
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_HOST = process.env.PINECONE_INDEX_HOST; // e.g. https://<index>-<project>.svc.<env>.pinecone.io
const PINECONE_NAMESPACE = process.env.PINECONE_NAMESPACE || undefined; // optional
const PINECONE_TOPK_DEFAULT = 16; // Increased from 8

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
    /\b(experience|worked|employer|company|role|job|position|career)\b/i.test(
      query
    );

  // Don't apply experience filter for education-related queries
  const mentionsEducation =
    /\b(graduate|graduation|school|college|university|education|degree|study|studied)\b/i.test(
      query
    );

  if (!mentionsExperience || mentionsEducation) return null;

  // Enhanced company extraction - handles various patterns
  const patterns = [
    /\bat\s+([A-Z][\w&.\- ]+(?:\s+\([^)]+\))?)/i, // "at Company (Location)"
    /\bwith\s+([A-Z][\w&.\- ]+)/i, // "with Company"
    /\b(multisys|innoxcell|tanda|recontech)\b/i, // Known company names (fixed InnoXcell)
  ];

  let rawCompany = null;
  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      rawCompany = (match[1] || match[0])?.trim();
      break;
    }
  }

  const filter: any = {type: {$eq: "experience"}};

  if (rawCompany) {
    // Support both exact company match and aliases
    const variants = new Set<string>();
    const base = rawCompany;
    variants.add(base);
    variants.add(base.toLowerCase());
    variants.add(base.toUpperCase());
    // Title Case variant
    variants.add(
      base
        .toLowerCase()
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );
    filter.$or = [
      {company: {$in: Array.from(variants)}},
      {aliases: {$in: Array.from(variants)}},
    ];
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
export async function getPersonalContext(
  query: string,
  minSimilarity = 0.7
): Promise<string> {
  try {
    // Pass 1: try with experience filter if confidently extracted
    const xpFilter = buildExperienceFilterFromQuery(query);
    let results = await findRelevantContent(
      query,
      PINECONE_TOPK_DEFAULT,
      xpFilter || undefined
    );

    // Threshold filter
    let relevantContent = results.filter(
      (item: any) => item.similarity >= minSimilarity
    );

    // Pass 2: if none, retry without filter and slightly lower threshold
    if (relevantContent.length === 0) {
      results = await findRelevantContent(
        query,
        Math.max(PINECONE_TOPK_DEFAULT, 10)
      );
      relevantContent = results.filter(
        (item: any) => item.similarity >= Math.min(0.6, minSimilarity)
      );
    }

    // Pass 3: if still none, try to fetch some general/basic info regardless of similarity
    if (relevantContent.length === 0) {
      try {
        const general = await pineconeQuery(
          (await embed({model: embeddingModel, value: query})).embedding,
          5,
          true,
          {
            type: {
              $in: [
                "basic_info",
                "skills",
                "faq",
                "project",
                "experience",
                "experience_summary",
                "education",
              ],
            },
          }
        );
        const generalMatches = Array.isArray(general.matches)
          ? general.matches
          : [];
        relevantContent = generalMatches.map((m: any) => ({
          content: m.metadata?.content,
          type: m.metadata?.type,
          source: m.metadata?.source,
          company: m.metadata?.company,
          title: m.metadata?.title,
          similarity: m.score,
        }));
      } catch {}
    }

    // Final guard: if absolutely nothing, return a minimal basic profile hint
    if (!relevantContent || relevantContent.length === 0) {
      return "Personal Information Context:\n[INFO] Unable to retrieve relevant chunks at this time.";
    }

    // Sort by similarity
    const sorted = relevantContent.sort(
      (a: any, b: any) => b.similarity - a.similarity
    );

    // Ensure coverage: include experience summary if present, and at most one experience per company
    const selected: any[] = [];
    const seenCompanies = new Set<string>();

    for (const item of sorted) {
      if ((item.type || "").toString() === "experience_summary") {
        selected.push(item);
        break;
      }
    }

    for (const item of sorted) {
      if ((item.type || "").toString() === "experience") {
        const key = (item.company || "").toString().toLowerCase();
        if (key && !seenCompanies.has(key)) {
          seenCompanies.add(key);
          selected.push(item);
        }
      }
      if (selected.length >= 12) break;
    }

    if (selected.length < 12) {
      for (const item of sorted) {
        if ((item.type || "").toString() !== "experience") {
          if (!selected.includes(item)) selected.push(item);
        }
        if (selected.length >= 12) break;
      }
    }

    const context = selected
      .slice(0, 12)
      .map((item: any) => {
        const confidence =
          item.similarity > 0.85
            ? "HIGH"
            : item.similarity > 0.75
              ? "MED"
              : "LOW";
        const type = (item.type || "").toString().toUpperCase();
        const header =
          item.company && item.title
            ? `[${type} - ${item.company}] (${confidence})`
            : `[${type}] (${confidence})`;
        return `${header} ${item.content}`;
      })
      .join("\n\n");

    return `Personal Information Context:\n${context}`;
  } catch (error) {
    console.error("Error getting personal context:", error);
    return "Unable to retrieve personal information context.";
  }
}
