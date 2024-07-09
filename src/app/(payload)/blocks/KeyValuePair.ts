import { Block } from "payload";

const KeyValuePair: Block = {
  slug: "key-value-pair",
  interfaceName: "Key-Value",
  labels: {
    singular: "Key-Value Pair",
    plural: "Key-Value Pairs",
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
      type: "text",
      required: true,
    },
  ],
};

export default KeyValuePair;
