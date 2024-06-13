import type { CollectionConfig } from "payload/types";

const RolesOnProjects: CollectionConfig = {
  slug: "roles-on-projects",
  labels: {
    singular: "Role on Project",
    plural: "Roles on Projects",
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
    },
  ],
};

export default RolesOnProjects;
