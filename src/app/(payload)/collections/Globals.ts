import { CollectionConfig } from "payload";

const Globals: CollectionConfig = {
  slug: "globals",
  labels: {
    singular: "Global",
    plural: "Globals",
  },
  admin: {
    group: "Settings",
    useAsTitle: "name",
  },
  fields: [
    {
      label: "Name",
      type: "text",
      name: "name",
      required: true,
    },
    {
      label: "Value",
      type: "text",
      name: "value",
      required: true,
    },
  ],
};

export default Globals;
