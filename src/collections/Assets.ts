import create from "payload/dist/collections/operations/create";
import type { CollectionConfig } from "payload/types";

const Assets: CollectionConfig = {
  slug: "assets",
  upload: {
    staticURL: "/assets",
    staticDir: "assets",
  },
  admin: {
    group: "Settings",
    useAsTitle: "Upload Assets",
    disableDuplicate: true,
  },
  fields: [{ name: "alt", type: "text" }],
};

export default Assets;
