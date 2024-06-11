import { CollectionConfig } from "payload/types";

const Pages: CollectionConfig = {
  slug: "page",
  auth: true,
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export default Pages;
