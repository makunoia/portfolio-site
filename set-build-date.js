// set-build-date.js
import { readFileSync, writeFileSync } from "fs";

// Function to format date
function formatBuildDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

// Read the existing .env file
const envPath = ".env";
const envFileContent = readFileSync(envPath, "utf-8");

// Convert the content to a list of lines
const lines = envFileContent.split("\n");

// Prepare the new build date value
const buildDate = new Date();
const formattedBuildDate = formatBuildDate(buildDate);
const buildDateEntry = `NEXT_PUBLIC_BUILD_DATE="${formattedBuildDate}"`;

// Find and update the line that contains the build date variable, or add it if it doesn't exist
let updated = false;
const newLines = lines.map((line) => {
  if (line.startsWith("NEXT_PUBLIC_BUILD_DATE=")) {
    updated = true;
    return buildDateEntry;
  }
  return line;
});

if (!updated) {
  newLines.push(buildDateEntry);
}

// Write the updated content back to the .env file
writeFileSync(envPath, newLines.join("\n"), "utf-8");
