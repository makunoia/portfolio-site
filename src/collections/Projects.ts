import { CollectionConfig } from "payload/types";
import ContentBlock from "../blocks/ContentBlock";
import Showcase from "../blocks/Showcase";

const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  admin: {
    useAsTitle: "title",
    description: "Manage your projects",
    disableDuplicate: true,
  },
  fields: [
    {
      label: "Project Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "Short Description",
      name: "shortDesc",
      type: "text",
      required: true,
      admin: {
        description:
          "This description appears on the front page if this project is featured",
      },
    },
    {
      label: "Long Description",
      name: "longDesc",
      type: "textarea",
      required: true,
      admin: {
        description: "This description appears on the project page header",
      },
    },
    {
      label: "Year",
      name: "year",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      label: "Project Tag",
      name: "tag",
      type: "relationship",
      relationTo: ["project-tags"],
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      label: "My Role",
      name: "roleOnProject",
      type: "relationship",
      relationTo: ["roles-on-projects"],
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      label: "Project Status",
      name: "projectStatus",
      type: "select",
      options: [
        { label: "Ongoing Project", value: "ongoingProject" },
        { label: "Delivered", value: "delivered" },
      ],
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      label: "Year delivered",
      name: "yearDelivered",
      type: "text",
      admin: {
        position: "sidebar",
        condition: (data) =>
          data.projectStatus === "delivered" ? true : false,
      },
    },
    {
      label: "Archive",
      name: "isArchived",
      type: "checkbox",
      admin: {
        position: "sidebar",
        description:
          "Archived projects are displayed as a list on the homepage",
        condition: (data) =>
          data.projectStatus === "delivered" ? true : false,
      },
    },
    {
      label: "Sections",
      name: "sections",
      type: "array",
      fields: [
        {
          label: "Name",
          name: "name",
          type: "text",
        },
        {
          label: "Content",
          name: "content",
          type: "blocks",
          blocks: [ContentBlock, Showcase],
        },
      ],
      admin: {
        components: { RowLabel: ({ data }) => data.name },
      },
    },
  ],
};

export default Projects;
