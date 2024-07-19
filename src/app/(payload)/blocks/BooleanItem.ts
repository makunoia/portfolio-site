import { Block } from "payload";

const BooleanItem: Block = {
  slug: "boolean-item",
  interfaceName: "BooleanItem",
  labels: {
    singular: "Boolean Item",
    plural: "Boolean Items",
  },
  fields: [
    {
      label: "Label",
      name: "label",
      type: "text",
      required: true,
    },
    {
      label: "Value",
      name: "value",
      type: "checkbox",
      required: true,
    },
  ],
};

export default BooleanItem;
