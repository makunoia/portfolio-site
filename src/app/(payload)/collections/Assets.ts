import type {CollectionConfig} from "payload";
import {
  handleCloudflareDelete,
  handleCloudflareUpload,
} from "./hooks/cloudflareStorage";

const Assets: CollectionConfig = {
  slug: "assets",
  admin: {
    group: "Collections",
    useAsTitle: "name",
    defaultColumns: ["name", "alt"],
  },
  upload: {
    crop: false,
    staticDir: `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/`,
    disableLocalStorage: true,
    mimeTypes: ["image/*", "application/pdf"],
    adminThumbnail: ({doc}) =>
      `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/${doc.filename}`,
  },
  fields: [
    {
      label: "Name",
      name: "name",
      type: "text",
      hooks: {
        beforeValidate: [
          ({value, siblingData}) => {
            if (!value) {
              return siblingData.filename;
            }
            return value;
          },
        ],
      },
    },
    {label: "Alt text", name: "alt", type: "text"},
    {
      name: "url",
      type: "text",
    },
  ],
  hooks: {
    beforeValidate: [handleCloudflareUpload],
    afterDelete: [handleCloudflareDelete],
  },
};

export default Assets;

