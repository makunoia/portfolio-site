import type {CollectionBeforeValidateHook, CollectionConfig} from "payload";
import {invalidateCacheTags} from "../lib/revalidateTags";
import {
  handleCloudflareDelete,
  handleCloudflareUpload,
} from "./hooks/cloudflareStorage";

const detectCategoryFromFile = (
  mimeType?: string | null,
  filename?: string | null,
  externalUrl?: string | null
) => {
  const mt = (mimeType || "").toLowerCase();
  if (mt.startsWith("image/")) return "photo" as const;
  if (mt.startsWith("video/")) return "video" as const;

  const srcForExt = filename || externalUrl || "";
  const ext = srcForExt.split(".").pop()?.toLowerCase();
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
  const inferred = detectCategoryFromFile(
    draft?.mimeType,
    draft?.filename,
    draft?.externalUrl
  );
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

  // Fallback to externalUrl if it points to an image
  const ext = (doc?.externalUrl || "").split(".").pop()?.toLowerCase();
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
  if (doc?.externalUrl && ext && imageExts.has(ext)) return doc.externalUrl;

  if (publicLink && doc?.filename) return `${publicLink}/${doc.filename}`;

  return null;
};

const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  admin: {
    group: "Collections",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "dateTaken"],
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
      label: "Render Hint",
      name: "renderHint",
      type: "select",
      required: false,
      admin: {
        position: "sidebar",
        description:
          "Optional: Guides how this asset should occupy the grid layout.",
      },
      options: [
        {label: "Auto (let grid decide)", value: "auto"},
        {label: "Square (1x1)", value: "square"},
        {label: "Landscape (span 2 columns)", value: "landscape"},
        {label: "Portrait 4:5 (tall in one column)", value: "portrait_4_5"},
        {
          label: "Portrait 9:16 (taller, span more rows)",
          value: "portrait_9_16",
        },
      ],
      defaultValue: "auto",
    },
    {
      label: "External URL",
      name: "externalUrl",
      type: "text",
      admin: {
        description:
          "Optional external link to display when no file is uploaded or to link out.",
      },
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
