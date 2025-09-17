export function chunkContent(content, maxChunkSize = 800) {
  const chunks = [];
  const sentences = String(content)
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

export function personalInfoToChunks(personalInfo) {
  const chunks = [];

  // Basic info
  const links = [];
  if (personalInfo.website) links.push(`Website: ${personalInfo.website}`);
  if (personalInfo.linkedin) links.push(`LinkedIn: ${personalInfo.linkedin}`);
  if (personalInfo.github) links.push(`GitHub: ${personalInfo.github}`);
  chunks.push({
    content: `Name: ${personalInfo.name}. Bio: ${personalInfo.bio}. Location: ${personalInfo.location}. Email: ${personalInfo.email}. ${links.join(". ")}`,
    type: "basic_info",
    source: "personal_info",
  });

  // Experience
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

  // Education
  if (Array.isArray(personalInfo.education)) {
    personalInfo.education.forEach((edu, i) => {
      chunks.push({
        content: `Education ${i + 1}: ${edu.degree} at ${edu.institution} (${edu.year}).`,
        type: "education",
        source: "personal_info",
      });
    });
  }

  // Skills
  if (personalInfo.skills) {
    const parts = [];
    // Support new schema: skills.core (with fallback to legacy core_domains)
    const core = Array.isArray(personalInfo.skills.core)
      ? personalInfo.skills.core
      : null;
    if (core) parts.push(`Core: ${core.join(", ")}`);
    if (Array.isArray(personalInfo.skills.tools))
      parts.push(`Tools: ${personalInfo.skills.tools.join(", ")}`);
    if (Array.isArray(personalInfo.skills.methodologies))
      parts.push(
        `Methodologies: ${personalInfo.skills.methodologies.join(", ")}`
      );
    if (parts.length)
      chunks.push({
        content: parts.join(". "),
        type: "skills",
        source: "personal_info",
      });
  }

  // Projects (full schema)
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
      const impact = project.impact; // new schema support
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

      // Build impact text from various possible shapes (string | array | object)
      let impactText = "";
      if (impact) {
        if (typeof impact === "string") {
          impactText = `Impact: ${impact}`;
        } else if (Array.isArray(impact)) {
          impactText = `Impact: ${impact.join(", ")}`;
        } else if (typeof impact === "object") {
          const impactParts = [];
          if (impact.summary) impactParts.push(`Summary: ${impact.summary}`);
          if (impact.metrics && typeof impact.metrics === "object") {
            const metricsPairs = Object.entries(impact.metrics).map(
              ([k, v]) => `${k}: ${v}`
            );
            if (metricsPairs.length)
              impactParts.push(`Metrics: ${metricsPairs.join(", ")}`);
          }
          if (Array.isArray(impact.highlights))
            impactParts.push(`Highlights: ${impact.highlights.join(", ")}`);
          impactText = impactParts.length
            ? `Impact: ${impactParts.join(". ")}`
            : `Impact: ${JSON.stringify(impact)}`;
        }
      }

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
        impactText || "",
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

  // Product Design Flow
  if (Array.isArray(personalInfo.product_design_flow)) {
    personalInfo.product_design_flow.forEach((stepObj, i) => {
      const stepNumber = stepObj.step ?? i + 1;
      const title = stepObj.title || "";
      const description = stepObj.description || "";
      const activities = Array.isArray(stepObj.activities)
        ? stepObj.activities.join(", ")
        : stepObj.activities || "";
      const deliverables = Array.isArray(stepObj.deliverables)
        ? stepObj.deliverables.join(", ")
        : stepObj.deliverables || "";
      const tags = Array.isArray(stepObj.tags)
        ? stepObj.tags.join(", ")
        : stepObj.tags || "";

      const parts = [
        `Step ${stepNumber}${title ? ` — ${title}` : ""}: ${description}`.trim(),
        activities ? `Activities: ${activities}` : "",
        deliverables ? `Deliverables: ${deliverables}` : "",
        tags ? `Tags: ${tags}` : "",
      ].filter(Boolean);

      const longText = parts.join(". ");
      const split = chunkContent(longText, 800);
      split.forEach((piece, j) => {
        chunks.push({
          content: `Product Design Flow ${stepNumber}${
            split.length > 1 ? ` (part ${j + 1})` : ""
          }: ${piece}`,
          type: "product_design_flow",
          source: "personal_info",
        });
      });
    });
  }

  // Certifications
  if (Array.isArray(personalInfo.certifications)) {
    personalInfo.certifications.forEach((cert, i) => {
      chunks.push({
        content: `Certification ${i + 1}: ${cert.name} — ${cert.organization || ""} (${cert.year || "n/a"})`,
        type: "certification",
        source: "personal_info",
      });
    });
  }

  // Achievements (categorized schema)
  if (
    personalInfo.achievements &&
    typeof personalInfo.achievements === "object"
  ) {
    Object.entries(personalInfo.achievements).forEach(([category, list]) => {
      if (!Array.isArray(list)) return;
      list.forEach((a, i) => {
        chunks.push({
          content: `Achievement (${category}) ${i + 1}: ${a}`,
          type: "achievement",
          source: "personal_info",
        });
      });
    });
  }

  // Languages
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

  // Availability
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
