#!/usr/bin/env node

/**
 * Script to embed personal information into Pinecone using Vercel AI SDK embeddings.
 * Run after updating personal-info.json
 *
 * Usage: node embedding/script.js
 */

import path from "path";
import fs from "fs/promises";
import {openai} from "@ai-sdk/openai";
import {embedMany} from "ai";
import dotenv from "dotenv";
import {personalInfoToChunks} from "./chunking.js";

// Load environment variables for standalone Node script
dotenv.config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_HOST = process.env.PINECONE_INDEX_HOST;
const PINECONE_NAMESPACE = process.env.PINECONE_NAMESPACE || undefined;

function assertEnv() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to .env.local and re-run the script."
    );
  }
  if (!PINECONE_API_KEY || !PINECONE_INDEX_HOST) {
    throw new Error(
      "PINECONE_API_KEY or PINECONE_INDEX_HOST missing. Configure Pinecone env vars."
    );
  }
}

async function pineconeUpsert(vectors) {
  const body = {vectors};
  if (PINECONE_NAMESPACE) body.namespace = PINECONE_NAMESPACE;
  const res = await fetch(`${PINECONE_INDEX_HOST}/vectors/upsert`, {
    method: "POST",
    headers: {"content-type": "application/json", "api-key": PINECONE_API_KEY},
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinecone upsert failed: ${res.status} ${text}`);
  }
}

async function main() {
  try {
    console.log("🚀 Starting personal information embedding process...");

    assertEnv();

    const personalInfoPath = path.join(
      process.cwd(),
      "./embedding/personal-info.json"
    );
    try {
      await fs.access(personalInfoPath);
    } catch {
      console.error("❌ Error: embedding/personal-info.json file not found!");
      console.log(
        "Please create embedding/personal-info.json first with your information."
      );
      process.exit(1);
    }

    console.log("📄 Reading personal information...");
    const personalInfo = JSON.parse(
      await fs.readFile(personalInfoPath, "utf-8")
    );
    console.log(`✅ Found personal information for: ${personalInfo.name}`);

    console.log("🧩 Preparing chunks...");
    const chunks = personalInfoToChunks(personalInfo);

    console.log("🔡 Generating embeddings...");
    const {embeddings} = await embedMany({
      model: openai.embedding("text-embedding-3-small"),
      values: chunks.map((c) => c.content),
    });

    console.log("📤 Upserting to Pinecone...");
    const vectors = embeddings.map((values, i) => ({
      id: `personal_info_${chunks[i].type}_${i}`,
      values,
      metadata: chunks[i],
    }));

    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await pineconeUpsert(batch);
    }

    console.log(
      `✅ Successfully embedded ${vectors.length} chunks of personal information!`
    );
    console.log(
      "🎉 Your assistant is now ready to answer questions about your background!"
    );
  } catch (error) {
    console.error("❌ Error during embedding process:", error.message);
    process.exit(1);
  }
}

main();
