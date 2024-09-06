"use server";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { unstable_cache } from "next/cache";
import { GroupByYear } from "@/lib/helpers";
import { JournalEntry, Project } from "payload-types";
import { FeaturedProject, LockedProject, ProjectsByYear } from "../types";
import { CollectionSlug } from "payload";
const payload = await getPayloadHMR({ config });

export const getPageData = async (slug: string) => {
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      name: {
        equals: slug,
      },
    },
  });

  const data = docs[0];

  return unstable_cache(async () => data, [slug], {
    tags: ["cachedPage"],
  })();
};

export const getEntryContent = async (slug: string) => {
  const { docs } = await payload.find({
    collection: "journal-entries",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const entry = docs[0];
  return unstable_cache(async () => entry.content, [entry.slug], {
    tags: [`entry:${entry.slug}`],
  })();
};

export const getProject = async (slug: string) => {
  const req = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const project = req.docs[0];

  return unstable_cache(async () => project, [project.slug], {
    tags: [`project:${project.slug}`],
  })();
};

export const getCollection = async ({
  collection,
  sort,
  limit,
  where,
}: {
  collection: CollectionSlug;
  sort: string;
  limit: number;
  where?: {};
}) => {
  const { docs } = await payload.find({
    collection,
    limit,
    sort,
    where,
  });

  return unstable_cache(
    async () => docs as Project[] | JournalEntry[],
    ["collection", collection],
    {
      tags: ["collection", `collection:${collection}`],
    }
  )();
};

export const getEntries = unstable_cache(async () => {
  const { docs } = await payload.find({
    collection: "journal-entries",
  });

  return GroupByYear(docs);
});

export const getProjects = unstable_cache(
  async () => {
    const { docs } = await payload.find({
      collection: "projects",
    });

    const projects = docs;
    return projects;
  },
  ["allProjects"],
  { tags: ["allProjects"] }
);

export const getAllProjectsByYear = unstable_cache(
  async () => {
    const req = await payload.find({
      collection: "projects",
      sort: "-year",
    });

    const projects: Project[] = req.docs;

    const AllProjectsByYear = GroupByYear(projects) as ProjectsByYear;

    return AllProjectsByYear;
  },
  ["projectsByYear"],
  { tags: ["projectsByYear"] }
);

export const getFeaturedProjects = unstable_cache(
  async () => {
    const { docs } = await payload.find({
      collection: "projects",
      where: {
        isFeatured: {
          equals: true,
        },
      },
    });

    return docs as FeaturedProject[];
  },
  ["featuredProjects"],
  {
    tags: ["featuredProjects"],
    revalidate: 3600,
  }
);

export const getLockedProjects = unstable_cache(
  async () => {
    const { docs } = await payload.find({
      collection: "projects",
      where: {
        isLocked: {
          equals: true,
        },
      },
    });

    return docs as LockedProject[];
  },
  ["lockedProjects"],
  {
    tags: ["lockedProjects"],
    revalidate: 3600,
  }
);
