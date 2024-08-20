"use server";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
// import { cache } from "react";
import { unstable_cache } from "next/cache";
import { GroupByYear } from "@/lib/helpers";
import { JournalEntry, Project } from "payload-types";
import { FeaturedProject, ProjectsByYear } from "../types";
import { CollectionSlug } from "payload";
const payload = await getPayloadHMR({ config });

export const validatePassword = async (
  formData: FormData
): Promise<boolean> => {
  const enteredPassword = formData.get("password");
  const response = await payload.find({
    collection: "globals",
    where: {
      name: {
        equals: "lockedProjectPassword",
      },
    },
  });

  const data = response.docs[0];
  cookies().set("auth", "");

  if (enteredPassword === data.value) {
    cookies().set("auth", "true");
    revalidatePath("/projects/[project]/page", "page");
    return true;
  } else return false;
};

export const getUserUUID = async () => {
  const cookieStore = cookies();
  let userUUID = cookieStore.get("userUUID");
  return userUUID;
};

export const getPageData = unstable_cache(async (slug: string) => {
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
});

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

export const getProject = unstable_cache(async (slug: string) => {
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
});

export const getProjects = unstable_cache(async () => {
  const { docs } = await payload.find({
    collection: "projects",
  });

  const projects = docs;
  return projects;
});

export const getAllProjectsByYear = unstable_cache(async () => {
  const req = await payload.find({
    collection: "projects",
    sort: "-year",
  });

  const projects: Project[] = req.docs;

  const AllProjectsByYear = GroupByYear(projects) as ProjectsByYear;

  return AllProjectsByYear;
});

export const getFeaturedProjects = unstable_cache(async () => {
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      isFeatured: {
        equals: true,
      },
    },
  });

  return docs as FeaturedProject[];
});

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
  }
);
