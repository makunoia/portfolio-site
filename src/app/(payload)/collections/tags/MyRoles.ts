import type { CollectionConfig } from "payload";

const MyRoles: CollectionConfig = {
  slug: "my-roles",
  labels: {
    singular: "My Role",
    plural: "My Roles",
  },
  admin: {
    useAsTitle: "name",
    group: "Settings",
    defaultColumns: ["name", "id"],
  },
  fields: [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export default MyRoles;
