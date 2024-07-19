import { Block } from "payload";

const URLItem: Block = {
  slug: "url-item",
  interfaceName: "URLItem",
  labels: {
    singular: "URL Item",
    plural: "URL Items",
  },
  fields: [
    {
      label: "URL",
      name: "url",
      type: "text",
      required: true,
    },
    {
      label: "Label",
      name: "label",
      type: "text",
      required: true,
    },
    {
      label: "Description",
      name: "desc",
      type: "text",
      required: true,
    },
    {
      label: "Tag",
      name: "tag",
      type: "text",
    },
  ],
};

export default URLItem;
