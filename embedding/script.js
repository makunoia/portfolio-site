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

function chunkContent(content, maxChunkSize = 800) {
  const chunks = [];
  const sentences = content
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  let current = "";
  for (const s of sentences) {
    if (current.length && current.length + s.length > maxChunkSize) {
      chunks.push(current);
      current = s;
    } else {
      current += (current ? ". " : "") + s;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function personalInfoToChunks(personalInfo) {
  const chunks = [];
  const links = [];
  if (personalInfo.website) links.push(`Website: ${personalInfo.website}`);
  if (personalInfo.linkedin) links.push(`LinkedIn: ${personalInfo.linkedin}`);
  if (personalInfo.github) links.push(`GitHub: ${personalInfo.github}`);
  chunks.push({
    content: `Name: ${personalInfo.name}. Bio: ${personalInfo.bio}. Location: ${personalInfo.location}. Email: ${personalInfo.email}. ${links.join(", ")}`,
    type: "basic_info",
    source: "personal_info",
  });

  if (Array.isArray(personalInfo.experience)) {
    personalInfo.experience.forEach((exp, i) => {
      const skills = Array.isArray(exp.skills)
        ? exp.skills.join(", ")
        : exp.skills || "Not specified";
      const tools = Array.isArray(exp.tools)
        ? exp.tools.join(", ")
        : exp.tools || undefined;
      chunks.push({
        content: `Experience ${i + 1}: ${exp.title} at ${exp.company} (${exp.duration}). ${exp.description}. Skills: ${skills}${
          tools ? `. Tools: ${tools}` : ""
        }`,
        type: "experience",
        source: "personal_info",
      });
    });
  }

  if (personalInfo.skills) {
    const cats = [];
    if (Array.isArray(personalInfo.skills.core_domains))
      cats.push(`Core Domains: ${personalInfo.skills.core_domains.join(", ")}`);
    if (Array.isArray(personalInfo.skills.tools))
      cats.push(`Tools: ${personalInfo.skills.tools.join(", ")}`);
    if (Array.isArray(personalInfo.skills.methodologies))
      cats.push(
        `Methodologies: ${personalInfo.skills.methodologies.join(", ")}`
      );
    if (cats.length)
      chunks.push({
        content: cats.join(". "),
        type: "skills",
        source: "personal_info",
      });
  }

  if (Array.isArray(personalInfo.projects)) {
    personalInfo.projects.forEach((project, i) => {
      const title = project.title || project.name || `Project ${i + 1}`;
      const description =
        project.summary || project.description || project.detailedText || "";
      const stack = project.stack;
      const features = project.features;
      const tags = project.tags;
      const roles = project.role;
      const domain = project.domain;
      const status = project.status;
      const outcomes = project.outcomes;
      const caseStudy = project.links?.caseStudy || project.link;
      const live = project.links?.live || project.live_url;
      const dates = project.dates;
      const type = project.type;
      const source = project.source;
      const id = project.id;
      const privacy = project.privacy;
      const client = project.client;
      const mediaCover = project.media?.cover;
      const collaborators = Array.isArray(project.collaborators)
        ? project.collaborators
            .filter((c) => c && (c.name || c.role))
            .map((c) =>
              c.name && c.role ? `${c.name} (${c.role})` : c.name || c.role
            )
        : undefined;
      const lastUpdated = project.lastUpdated;

      const parts = [
        `${title}. ${description}`,
        id ? `ID: ${id}` : "",
        type ? `Type: ${type}` : "",
        source ? `Source: ${source}` : "",
        stack
          ? `Stack: ${Array.isArray(stack) ? stack.join(", ") : stack}`
          : "",
        roles
          ? `Roles: ${Array.isArray(roles) ? roles.join(", ") : roles}`
          : "",
        dates
          ? `Dates: ${dates.start || "n/a"} – ${dates.end || "present"}`
          : "",
        features ? `Features: ${features.join?.(", ") || features}` : "",
        tags ? `Tags: ${tags.join?.(", ") || tags}` : "",
        domain ? `Domain: ${domain}` : "",
        status ? `Status: ${status}` : "",
        outcomes ? `Outcomes: ${outcomes}` : "",
        privacy ? `Privacy: ${privacy}` : "",
        client ? `Client: ${client}` : "",
        collaborators && collaborators.length
          ? `Collaborators: ${collaborators.join(", ")}`
          : "",
        caseStudy ? `Case Study: ${caseStudy}` : "",
        live ? `Live: ${live}` : "",
        mediaCover ? `Media Cover: ${mediaCover}` : "",
        lastUpdated ? `Last Updated: ${lastUpdated}` : "",
      ].filter(Boolean);

      const longText = parts.join(". ");
      const split = chunkContent(longText, 800);
      split.forEach((piece, j) => {
        chunks.push({
          content: `Project ${i + 1}${split.length > 1 ? ` (part ${j + 1})` : ""}: ${piece}`,
          type: "project",
          source: "personal_info",
        });
      });
    });
  }

  if (Array.isArray(personalInfo.certifications)) {
    personalInfo.certifications.forEach((cert, i) => {
      chunks.push({
        content: `Certification ${i + 1}: ${cert.name} — ${cert.organization || ""} (${cert.year || "n/a"})`,
        type: "certification",
        source: "personal_info",
      });
    });
  }

  if (Array.isArray(personalInfo.achievements)) {
    personalInfo.achievements.forEach((a, i) => {
      chunks.push({
        content: `Achievement ${i + 1}: ${a}`,
        type: "achievement",
        source: "personal_info",
      });
    });
  }

  if (Array.isArray(personalInfo.languages)) {
    const languagesText = personalInfo.languages
      .map((l) => `${l.language} (${l.proficiency})`)
      .join(", ");
    chunks.push({
      content: `Languages: ${languagesText}`,
      type: "languages",
      source: "personal_info",
    });
  }

  if (personalInfo.availability) {
    chunks.push({
      content: `Availability: ${personalInfo.availability.status}. Remote work: ${
        personalInfo.availability.remote_work ? "Yes" : "No"
      }. Relocation: ${personalInfo.availability.relocation ? "Yes" : "No"}. Preferred locations: ${
        personalInfo.availability.preferred_locations?.join(", ") ||
        "Not specified"
      }`,
      type: "availability",
      source: "personal_info",
    });
  }

  return chunks;
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
