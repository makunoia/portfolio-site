import type { CollectionConfig } from "payload/types";

const Assets: CollectionConfig = {
  slug: "assets",
  upload: {
    staticDir: "../../assets",
  },
  admin: {
    group: "Settings",
    useAsTitle: "Upload Assets",
  },
  fields: [{ name: "alt", type: "text" }],
};

export default Assets;
