import { Block } from "payload";

const InfoItem: Block = {
  slug: "info-item",
  interfaceName: "InfoItem",
  labels: {
    singular: "Info Item",
    plural: "Info Items",
  },
  fields: [
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
    {
      label: "Image",
      name: "image",
      type: "relationship",
      relationTo: "assets",
    },
  ],
};

export default InfoItem;
