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

// Prepare the new build date value
const buildDate = new Date();
const formattedBuildDate = formatBuildDate(buildDate);

const token = process.env.VERCEL_TOKEN;
const id = process.env.VERCEL_BUILD_DATE_ENV_ID;
const projectID = process.env.VERCEL_PROJECT_ID;
const teamID = process.env.VERCEL_TEAM_ID;

await fetch(`https://api.vercel.com/v9/projects/${projectID}/env/${id}`, {
  body: {
    value: formattedBuildDate,
  },
  headers: {
    Authorization: `Bearer ${token}`,
  },
  method: "PATCH",
});
