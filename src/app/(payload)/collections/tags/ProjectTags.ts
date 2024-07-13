import type { CollectionConfig } from "payload";

const ProjectTags: CollectionConfig = {
  slug: "project-tags",
  labels: {
    singular: "Project Tag",
    plural: "Project Tags",
  },
  admin: {
    useAsTitle: "name",
    group: "All Tags",
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

export default ProjectTags;
