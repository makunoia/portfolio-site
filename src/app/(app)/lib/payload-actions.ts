"use server";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { unstable_cache } from "next/cache";
import { GroupByYear } from "@/lib/helpers";
import { JournalEntry, Project } from "payload-types";
import { FeaturedProject, ProjectsByYear } from "../types";
import { CollectionSlug } from "payload";
const payload = await getPayloadHMR({ config });

export const getPageData = unstable_cache(
  async (slug: string) => {
    const { docs } = await payload.find({
      collection: "pages",
      where: {
        name: {
          equals: slug,
        },
      },
    });

    const data = docs[0];
    return data;
  },
  ["slug"],
  {
    tags: ["cached-page"],
    revalidate: 3600,
  }
);

export const getEntries = unstable_cache(async () => {
  const { docs } = await payload.find({
    collection: "journal-entries",
  });

  return GroupByYear(docs);
});

export const getEntryContent = unstable_cache(async (slug: string) => {
  const { docs } = await payload.find({
    collection: "journal-entries",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return docs[0].content;
});

export const getProject = unstable_cache(
  async (slug: string) => {
    const req = await payload.find({
      collection: "projects",
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const project = req.docs[0];

    return project;
  },
  ["slug"],
  {
    tags: ["cached-project-slug"],
    revalidate: 3600,
  }
);

export const getProjects = unstable_cache(
  async () => {
    const { docs } = await payload.find({
      collection: "projects",
    });

    const projects = docs;
    return projects;
  },
  [],
  { tags: ["projects"], revalidate: 3600 }
);

export const getAllProjectsByYear = unstable_cache(async () => {
  const req = await payload.find({
    collection: "projects",
    sort: "-year",
  });

  const projects: Project[] = req.docs;

  const AllProjectsByYear = GroupByYear(projects) as ProjectsByYear;

  return AllProjectsByYear;
});

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
  [],
  {
    tags: ["cached-featured-projects"],
    revalidate: 3600,
  }
);

export const getCollection = unstable_cache(
  async ({
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

    return docs as Project[] | JournalEntry[];
  },
  ["collection"],
  {
    tags: ["cached-collections"],
    revalidate: 3600,
  }
);
