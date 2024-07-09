import type { CollectionConfig } from "payload";

const ProjectTags: CollectionConfig = {
  slug: "project-tags",
  labels: {
    singular: "Project Tag",
    plural: "Project Tags",
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

export default ProjectTags;
