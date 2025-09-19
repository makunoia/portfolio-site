import env from "@next/env";
env.loadEnvConfig("./");

function formatBuildDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

let data;
const buildDate = new Date();
const formattedBuildDate = formatBuildDate(buildDate);

const token = process.env.VERCEL_TOKEN;
const id = process.env.VERCEL_BUILD_DATE_ENV_ID;
const projectID = process.env.VERCEL_PROJECT_ID;

if (!token || !id || !projectID) {
  console.warn(
    "Skipping build date sync because Vercel credentials are not configured locally.",
  );
  process.exit(0);
}

const fetchURL = `https://api.vercel.com/v9/projects/${projectID}/env/${id}`;
try {
  const response = await fetch(fetchURL, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: formattedBuildDate }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update: ${response.statusText}`);
  }

  data = await response.json();
  console.log("Environment variable updated.");
} catch (error) {
  console.warn("Unable to update build date on Vercel:", error.message);
}
