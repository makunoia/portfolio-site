import type {CollectionBeforeValidateHook, CollectionConfig} from "payload";
import {invalidateCacheTags} from "../lib/revalidateTags";
import {
  handleCloudflareDelete,
  handleCloudflareUpload,
} from "./hooks/cloudflareStorage";

const detectCategoryFromFile = (
  mimeType?: string | null,
  filename?: string | null
) => {
  const mt = (mimeType || "").toLowerCase();
  if (mt.startsWith("image/")) return "photo" as const;
  if (mt.startsWith("video/")) return "video" as const;

  const ext = (filename || "").split(".").pop()?.toLowerCase();
  if (!ext) return undefined;

  const imageExts = new Set([
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "avif",
    "heic",
    "heif",
    "tiff",
    "bmp",
  ]);
  const videoExts = new Set(["mp4", "m4v", "webm", "mov", "avi", "mkv"]);

  if (imageExts.has(ext)) return "photo" as const;
  if (videoExts.has(ext)) return "video" as const;
  return undefined;
};

const autoCategorize: CollectionBeforeValidateHook = ({data}) => {
  const draft: any = data ?? {};
  const inferred = detectCategoryFromFile(draft?.mimeType, draft?.filename);
  if (inferred) {
    draft.category = inferred;
  }

  return draft;
};

const prefillDateTakenFromExif: CollectionBeforeValidateHook = async ({
  data,
}) => {
  const draft: any = data ?? {};
  try {
    if (!draft?.dateTaken) {
      const mimeType = draft?.mimeType as string | undefined;
      const filename = draft?.filename as string | undefined;
      if (mimeType?.startsWith("image/") && filename) {
        const url = `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/${filename}`;
        try {
          const res = await fetch(url);
          if (res.ok) {
            const buf = await res.arrayBuffer();
            const exifr = await import("exifr");
            const meta: any = await exifr.parse(buf, {
              tiff: true,
              ifd0: true,
              xmp: true,
              pick: ["CreateDate"],
            });
            const dt = meta?.CreateDate;
            if (dt) {
              draft.dateTaken = new Date(dt).toISOString();
            }
          }
        } catch {}
      }
    }
  } finally {
    // no-op
  }
  return draft;
};

const getAdminThumbnail = ({doc}: {doc: any}) => {
  const publicLink = process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK;
  if (doc?.mimeType?.startsWith("image/")) {
    return `${publicLink}/${doc.filename}`;
  }

  if (publicLink) {
    return `${publicLink}/${doc.filename}`;
  }

  return null;
};

const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  admin: {
    group: "Collections",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt"],
  },
  upload: {
    crop: false,
    staticDir: `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/`,
    disableLocalStorage: true,
    mimeTypes: ["image/*", "video/*"],
    adminThumbnail: getAdminThumbnail,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      required: true,
      options: [
        {label: "Photo", value: "photo"},
        {label: "Video", value: "video"},
      ],
      defaultValue: "photo",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
    {
      label: "Date Taken",
      name: "dateTaken",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    // Removed Poster Image, External URL, Sort Order, and Published At fields
  ],
  hooks: {
    beforeValidate: [
      handleCloudflareUpload,
      prefillDateTakenFromExif,
      autoCategorize,
    ],
    afterChange: [
      async () => {
        await invalidateCacheTags([
          "gallery-items",
          "collection:gallery-items",
          "gallery",
        ]);
      },
    ],
    afterDelete: [
      async () => {
        invalidateCacheTags([
          "gallery-items",
          "collection:gallery-items",
          "gallery",
        ]);
      },
      handleCloudflareDelete,
    ],
  },
};

export default GalleryItems;
