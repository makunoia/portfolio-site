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
  if (personalInfo.cv_resume)
    links.push(`CV/Resume: ${personalInfo.cv_resume}`);
  const basicParts = [
    `Name: ${personalInfo.name}`,
    personalInfo.bio ? `Bio: ${personalInfo.bio}` : "",
    personalInfo.location ? `Location: ${personalInfo.location}` : "",
    personalInfo.email ? `Email: ${personalInfo.email}` : "",
    personalInfo.birthday ? `Birthday: ${personalInfo.birthday}` : "",
    Number.isFinite(personalInfo.age) || typeof personalInfo.age === "number"
      ? `Age: ${personalInfo.age}`
      : "",
    links.length ? links.join(". ") : "",
  ].filter(Boolean);
  chunks.push({
    content: basicParts.join(". "),
    type: "basic_info",
    source: "personal_info",
  });

  // Enhanced Experience with rich metadata and chunking
  if (Array.isArray(personalInfo.experience)) {
    personalInfo.experience.forEach((exp, i) => {
      const skills = Array.isArray(exp.skills)
        ? exp.skills.join(", ")
        : exp.skills || "Not specified";
      const tools = Array.isArray(exp.tools)
        ? exp.tools.join(", ")
        : exp.tools || undefined;

      // Rich metadata for filtering and context
      const meta = {
        type: "experience",
        source: "personal_info",
        company: exp.company,
        aliases: Array.isArray(exp.aliases) ? exp.aliases : undefined,
        title: exp.title,
        duration: exp.duration,
        start: exp.start || exp.dates?.start,
        end: exp.end || exp.dates?.end,
        location: exp.location,
        employment_type: exp.employment_type,
        skills_list: Array.isArray(exp.skills) ? exp.skills : undefined,
        tools_list: Array.isArray(exp.tools) ? exp.tools : undefined,
      };

      // Build comprehensive experience text
      const baseText = [
        `${exp.title} at ${exp.company}${exp.duration ? ` (${exp.duration})` : ""}.`,
        exp.description || "",
        `Skills: ${skills}`,
        tools ? `Tools: ${tools}` : "",
        exp.location ? `Location: ${exp.location}` : "",
        exp.employment_type ? `Employment Type: ${exp.employment_type}` : "",
      ]
        .filter(Boolean)
        .join(" ");

      // Split long experience descriptions into multiple chunks
      const split = chunkContent(baseText, 600);
      split.forEach((piece, j) => {
        chunks.push({
          ...meta,
          content: `Experience ${i + 1}${split.length > 1 ? ` (part ${j + 1})` : ""}: ${piece}`,
        });
      });
    });

    // Add a consolidated experience summary chunk for reliable retrieval
    if (personalInfo.experience.length) {
      const summary = personalInfo.experience
        .map((exp) => {
          const title = exp.title ? `${exp.title}` : "";
          const duration = exp.duration ? ` (${exp.duration})` : "";
          return `- ${exp.company}: ${title}${duration}`;
        })
        .join("\n");
      chunks.push({
        content: `Experience Summary:\n${summary}`,
        type: "experience_summary",
        source: "personal_info",
      });
    }
  }

  // Education - Enhanced for better discoverability
  if (Array.isArray(personalInfo.education)) {
    personalInfo.education.forEach((edu, i) => {
      const content = `Academic Background ${i + 1}: ${edu.degree} at ${edu.institution} (${edu.year}). Education: ${edu.degree}. Institution/College: ${edu.institution}. Graduation: ${edu.year}. Academic qualifications. Educational background. College degree.`;
      chunks.push({
        content,
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
            if (metricsParts.length)
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

  // Achievements (categorized schema: strings or rich objects)
  if (
    personalInfo.achievements &&
    typeof personalInfo.achievements === "object"
  ) {
    Object.entries(personalInfo.achievements).forEach(([category, list]) => {
      if (!Array.isArray(list)) return;

      list.forEach((ach, i) => {
        // Normalize achievement fields
        let title = "";
        let organization = ""; // institution | company | organization
        let year = "";
        let description = "";
        let impact = undefined; // string | array | object
        let skillsDeveloped = undefined; // array

        if (typeof ach === "string") {
          description = ach;
        } else if (ach && typeof ach === "object") {
          title = ach.title || "";
          organization =
            ach.institution || ach.company || ach.organization || "";
          year = ach.yearRange || ach.year || "";
          description = ach.description || "";
          impact = ach.impact;
          skillsDeveloped = Array.isArray(ach.skillsDeveloped)
            ? ach.skillsDeveloped
            : undefined;
        }

        // Build impact text from various shapes
        let impactText = "";
        if (impact) {
          if (typeof impact === "string") {
            impactText = `Impact: ${impact}`;
          } else if (Array.isArray(impact)) {
            impactText = `Impact: ${impact.join(", ")}`;
          } else if (typeof impact === "object") {
            const parts = [];
            if (impact.summary) parts.push(`Summary: ${impact.summary}`);
            if (impact.metrics && typeof impact.metrics === "object") {
              const pairs = Object.entries(impact.metrics).map(
                ([k, v]) => `${k}: ${v}`
              );
              if (pairs.length) parts.push(`Metrics: ${pairs.join(", ")}`);
            }
            if (Array.isArray(impact.highlights))
              parts.push(`Highlights: ${impact.highlights.join(", ")}`);
            impactText = parts.length
              ? `Impact: ${parts.join(". ")}`
              : `Impact: ${JSON.stringify(impact)}`;
          }
        }

        const header = [
          title ? `${title}` : "Achievement",
          organization ? `— ${organization}` : "",
          year ? `(${year})` : "",
        ]
          .filter(Boolean)
          .join(" ");

        const details = [
          description,
          impactText,
          skillsDeveloped && skillsDeveloped.length
            ? `Skills Developed: ${skillsDeveloped.join(", ")}`
            : "",
        ]
          .filter(Boolean)
          .join(". ");

        const longText = [header, details].filter(Boolean).join(". ");
        const split = chunkContent(longText, 700);

        split.forEach((piece, j) => {
          chunks.push({
            content: `Achievement (${category}) ${i + 1}${
              split.length > 1 ? ` (part ${j + 1})` : ""
            }: ${piece}`,
            type: "achievement",
            category,
            organization: organization || undefined,
            year: year || undefined,
            source: "personal_info",
          });
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

  // FAQ
  if (Array.isArray(personalInfo.faq)) {
    personalInfo.faq.forEach((item, i) => {
      if (!item || (!item.question && !item.answer)) return;
      const q = item.question ? `Q: ${item.question}` : "Q:";
      const a = item.answer ? `A: ${item.answer}` : "A:";
      const content = `${q}. ${a}`;
      const split = chunkContent(content, 600);
      split.forEach((piece, j) => {
        chunks.push({
          content: `FAQ ${i + 1}${split.length > 1 ? ` (part ${j + 1})` : ""}: ${piece}`,
          type: "faq",
          source: "personal_info",
        });
      });
    });
  }

  return chunks;
}
