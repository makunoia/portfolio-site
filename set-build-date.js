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
async function updateBuildDate() {
  const buildDate = new Date();
  const formattedBuildDate = formatBuildDate(buildDate);

  const token = process.env.VERCEL_TOKEN;
  const id = process.env.VERCEL_BUILD_DATE_ENV_ID;
  const projectID = process.env.VERCEL_PROJECT_ID;

  if (!token || !id || !projectID) {
    console.error("Environment variables are missing.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.vercel.com/v9/projects/${projectID}/env/${id}`,
      {
        body: { value: formatBuildDate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Environment variable updated:", data);
  } catch (error) {
    console.error("Error updating environment variable:", error);
  }
}

updateBuildDate();
