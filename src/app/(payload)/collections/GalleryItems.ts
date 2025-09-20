import type {CollectionBeforeValidateHook, CollectionConfig} from "payload";
import {invalidateCacheTags} from "../lib/revalidateTags";
import {
  handleCloudflareDelete,
  handleCloudflareUpload,
} from "./hooks/cloudflareStorage";

const autoCategorize: CollectionBeforeValidateHook = ({data}) => {
  if (!data?.category && data?.mimeType) {
    if (data.mimeType.startsWith("image/")) {
      data.category = "photo";
    } else if (data.mimeType.startsWith("video/")) {
      data.category = "video";
    }
  }

  return data;
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
        {label: "Reel", value: "reel"},
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
      type: "row",
      fields: [
        {
          label: "Poster Image",
          name: "poster",
          type: "relationship",
          relationTo: "assets",
          admin: {
            condition: (data) =>
              data?.category === "reel" || data?.category === "video",
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
      async () => {
        invalidateCacheTags([
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
