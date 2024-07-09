import { Block } from "payload";

const BooleanData: Block = {
  slug: "boolean-data",
  interfaceName: "BooleanData",
  labels: {
    singular: "Boolean Data",
    plural: "Boolean Data",
  },
  fields: [
    {
      label: "Key",
      name: "key",
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

export default BooleanData;
