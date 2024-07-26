import env from "@next/env";
env.loadEnvConfig("./");

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

let data;
const buildDate = new Date();
const formattedBuildDate = formatBuildDate(buildDate);

const token = process.env.VERCEL_TOKEN;
const id = process.env.VERCEL_BUILD_DATE_ENV_ID;
const projectID = process.env.VERCEL_PROJECT_ID;
const fetchURL = `https://api.vercel.com/v9/projects/${projectID}/env/${id}`;

if (!token || !id || !projectID) {
  console.error("Environment variables are missing.");
}
try {
  const response = await fetch(fetchURL, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: formattedBuildDate }), // Stringify the body
  });

  if (!response.ok) {
    throw new Error(`Failed to update: ${response.statusText}`);
  }

  data = await response.json();
  console.log("Environment variable updated:", data);
} catch (error) {
  console.error("Error updating environment variable:", error);
}
