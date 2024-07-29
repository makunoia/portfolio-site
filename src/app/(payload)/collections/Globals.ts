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
      type: "row",
      fields: [
        {
          label: "Name",
          type: "select",
          options: [
            { label: "Resume", value: "resume" },
            {
              label: "Locked Project Password",
              value: "lockedProjectPassword",
            },
          ],
          name: "name",
          required: true,
          admin: {
            width: "70%",
          },
        },
        {
          label: "Type",
          name: "type",
          type: "select",
          options: ["Text", "File"],
          required: true,
          admin: {
            width: "30%",
          },
        },
      ],
    },

    {
      label: "Value",
      type: "text",
      name: "value",
      required: true,
      admin: {
        condition: (data) => (data?.type === "Text" ? true : false),
      },
    },
    {
      label: "File",
      type: "upload",
      name: "document",
      required: true,
      relationTo: "assets",
      admin: {
        condition: (data) => (data?.type === "File" ? true : false),
      },
    },
  ],
};

export default Globals;
