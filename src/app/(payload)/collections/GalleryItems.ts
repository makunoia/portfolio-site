import type {CollectionBeforeValidateHook, CollectionConfig} from "payload";
import payload from "payload";
import {HeadObjectCommand, S3Client} from "@aws-sdk/client-s3";
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

const getAdminThumbnail = ({doc}: {doc: any}) => {
  const publicLink = process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK;
  if (doc?.mimeType?.startsWith("image/")) {
    return `${publicLink}/${doc.filename}`;
  }

  const poster = doc?.poster;
  if (poster && typeof poster === "object" && poster.url) {
    return poster.url;
  }

  if (publicLink) {
    return `${publicLink}/${doc.filename}`;
  }

  return undefined;
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
    {
      type: "row",
      fields: [
        {
          label: "Poster Image",
          name: "poster",
          type: "relationship",
          relationTo: "assets",
          admin: {
            condition: (data) => data?.category === "video",
          },
        },
        {
          label: "External URL",
          name: "externalUrl",
          type: "text",
        },
      ],
    },
    {
      label: "Sort Order",
      name: "sortOrder",
      type: "number",
    },
    {
      label: "Published At",
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
      defaultValue: () => new Date().toISOString(),
    },
  ],
  hooks: {
    beforeValidate: [handleCloudflareUpload, autoCategorize],
    afterChange: [
      async ({doc, operation}) => {
        // Fill dateTaken automatically if missing
        try {
          if (
            !doc?.dateTaken &&
            (operation === "create" || operation === "update")
          ) {
            const filename = doc?.filename as string | undefined;
            const mimeType = doc?.mimeType as string | undefined;
            let extracted: string | undefined;

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
                    pick: ["DateTimeOriginal", "CreateDate", "ModifyDate"],
                  });
                  const dt =
                    meta?.DateTimeOriginal ||
                    meta?.CreateDate ||
                    meta?.ModifyDate;
                  if (dt) extracted = new Date(dt).toISOString();
                }
              } catch {}
            }

            // Fallback for videos or if EXIF not available: use object LastModified
            if (!extracted && filename) {
              try {
                const s3 = new S3Client({
                  region: process.env.CLOUDFLARE_REGION,
                  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
                  credentials: {
                    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
                    secretAccessKey: process.env
                      .CLOUDFLARE_SECRET_ACCESS_KEY as string,
                  },
                });
                const head = await s3.send(
                  new HeadObjectCommand({
                    Bucket: process.env.CLOUDFLARE_BUCKET_NAME as string,
                    Key: filename,
                  })
                );
                if (head?.LastModified) {
                  extracted = new Date(head.LastModified).toISOString();
                }
              } catch {}
            }

            if (extracted) {
              await (payload.update as any)({
                collection: "gallery-items",
                id: doc.id,
                data: {dateTaken: extracted},
              });
            }
          }
        } finally {
          // Invalidate caches regardless
          await invalidateCacheTags([
            "gallery-items",
            "collection:gallery-items",
            "gallery",
          ]);
        }
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
