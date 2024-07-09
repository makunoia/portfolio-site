import { CollectionConfig } from "payload";
import KeyValuePair from "../blocks/KeyValuePair";
import BooleanData from "../blocks/BooleanData";

const Pages: CollectionConfig = {
  slug: "page",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "id"],
  },
  fields: [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: "Hero",
      type: "collapsible",
      fields: [
        {
          label: "Header",
          name: "header",
          type: "text",
          required: true,
        },
        {
          label: "Copy",
          name: "copy",
          type: "text",
        },
      ],
    },
    {
      label: "Content",
      name: "content",
      type: "blocks",
      blocks: [KeyValuePair, BooleanData],
    },
  ],
};

export default Pages;
