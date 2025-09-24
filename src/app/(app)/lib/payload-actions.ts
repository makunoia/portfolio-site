"use server";

import config from "@payload-config";
import Users from "@/app/(payload)/collections/Users";
import {getPayload} from "payload";
import {unstable_cache} from "next/cache";
import {GroupByYear} from "@/lib/helpers";
import {GalleryItem, JournalEntry, Project} from "payload-types";
import {
  FeaturedProject,
  GalleryEntry,
  LockedProject,
  ProjectsByYear,
} from "../types";
import {CollectionSlug} from "payload";
const payload = await getPayload({config});

export const getPageData = unstable_cache(
  async (slug: string) => {
    const {docs} = await payload.find({
      collection: "pages",
      where: {
        name: {
          equals: slug,
        },
      },
    });

    return docs[0];
  },
  ["pageData"],
  {
    tags: ["pageData", "collection:pages"],
    revalidate: 3600,
  }
);

export const getEntryContent = unstable_cache(
  async (slug: string) => {
    const {docs} = await payload.find({
      collection: "journal-entries",
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return docs[0].content;
  },
  ["entryContent"],
  {
    tags: ["entryContent", "journalEntries", "collection:journal-entries"],
  }
);

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

    return req.docs[0];
  },
  ["project"],
  {
    tags: ["project", "collection:projects"],
  }
);

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
  const {docs} = await payload.find({
    collection,
    limit,
    sort,
    where,
  });

  return unstable_cache(
    async () => docs as Project[] | JournalEntry[],
    [
      "collection",
      `collection:${collection}`,
      `collectionLimit:${limit}`,
      `collectionSort:${sort}`,
    ],
    {
      tags: ["collection", `collection:${collection}`],
    }
  )();
};

export const getEntries = unstable_cache(
  async () => {
    const {docs} = await payload.find({
      collection: "journal-entries",
    });

    return GroupByYear(docs);
  },
  ["journalEntries"],
  {
    tags: ["journalEntries", "collection:journal-entries"],
  }
);

export const getProjects = unstable_cache(
  async () => {
    const {docs} = await payload.find({
      collection: "projects",
    });

    const projects = docs;
    return projects;
  },
  ["allProjects"],
  {tags: ["allProjects", "collection:projects"]}
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
  {tags: ["projectsByYear", "collection:projects"]}
);

export const getFeaturedProjects = unstable_cache(
  async () => {
    const {docs} = await payload.find({
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
    tags: ["featuredProjects", "collection:projects"],
    revalidate: 3600,
  }
);

export const getLockedProjects = unstable_cache(
  async () => {
    const {docs} = await payload.find({
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
    tags: ["lockedProjects", "collection:projects"],
    revalidate: 3600,
  }
);

export const getGalleryItems = unstable_cache(
  async () => {
    const {docs} = await payload.find({
      collection: "gallery-items",
      depth: 1,
      limit: 200,
      sort: "-createdAt",
    });

    const publicLink = process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK;

    const items = (docs as GalleryItem[]).map((item) => {
      const url =
        item.url ||
        (item.filename && publicLink ? `${publicLink}/${item.filename}` : "");

      const mapped: GalleryEntry = {
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        renderHint: item.renderHint ?? null,
        url,
        mimeType:
          item.mimeType ||
          (item.category === "photo" ? "image/jpeg" : "video/mp4"),
        width: item.width,
        height: item.height,
        poster: null,
        createdAt: item.createdAt,
      };

      return mapped;
    });

    return items;
  },
  ["gallery-items"],
  {
    tags: ["gallery", "gallery-items", "collection:gallery-items"],
    revalidate: 3600,
  }
);

// Currently unused by middleware
export const getLockedPages = unstable_cache(
  async (host: string) => {
    const res = await fetch(
      `${host}/api/projects?where[isLocked][equals]=true`,
      {
        headers: {
          Authorization: `${Users.slug} API-Key ${process.env.PAYLOAD_API_KEY}`,
        },
      }
    );
    const response = await res.json();

    const lockedPages = response.docs
      .filter((doc: any) => doc.isLocked === true)
      .map((doc: any) => doc.slug);

    return lockedPages;
  },
  ["lockedPages"],
  {
    tags: ["lockedPages", "collection:projects"],
  }
);
