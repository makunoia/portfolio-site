import { CollectionConfig } from "payload";
import Showcase from "../blocks/Showcase";
import { BlockRowLabel, SectionRowLabel } from "../components/RowLabel";

const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  admin: {
    useAsTitle: "title",
    description: "Manage your projects",
    defaultColumns: [
      "title",
      "year",
      "isFeatured",
      "isArchived",
      "isLocked",
      "slug",
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Data",
          description: "Specify information about this project",
          fields: [
            {
              type: "row",
              fields: [
                {
                  label: "Project Title",
                  name: "title",
                  type: "text",
                  required: true,
                  admin: {
                    width: "80%",
                  },
                },
                {
                  label: "type",
                  name: "type",
                  type: "text",
                  defaultValue: "project",
                  required: true,
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                },
                {
                  label: "Year",
                  name: "year",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              label: "Description",
              name: "desc",
              type: "text",
              required: true,
              admin: {
                description:
                  "This description appears on the front page if this project is featured",
              },
            },
            {
              label: "Slug",
              name: "slug",
              type: "text",
              required: true,
              admin: {
                hidden: true,
                readOnly: true,
              },
              hooks: {
                beforeDuplicate: [
                  () => {
                    // Reset value, give placeholder value
                    return "duplicated";
                  },
                ],
                beforeValidate: [
                  ({ siblingData, value }) => {
                    // Create a slug from the first Project Title entered.
                    if (
                      !value ||
                      value === "duplicated" ||
                      siblingData.isLocked
                    ) {
                      if (siblingData.isLocked) {
                        return siblingData.lockedData.codename
                          .replaceAll(" ", "-")
                          .toLowerCase();
                      } else {
                        return siblingData.title
                          .replaceAll(" ", "-")
                          .toLowerCase();
                      }
                    } else return value;
                  },
                ],
              },
            },
            {
              type: "row",
              fields: [
                {
                  label: "Project Status",
                  name: "status",
                  type: "select",
                  options: [
                    { label: "Ongoing Project", value: "ONGOING" },
                    { label: "Done", value: "DONE" },
                  ],
                  admin: {
                    width: "50%",
                  },
                  required: true,
                },
                {
                  label: "Year done",
                  name: "yearDone",
                  type: "text",
                  admin: {
                    width: "50%",
                    condition: (data) =>
                      data.status === "DONE" ? true : false,
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  label: "My Role",
                  name: "role",
                  type: "relationship",
                  relationTo: "my-roles",
                  required: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  label: "Project Tags",
                  name: "tag",
                  type: "relationship",
                  relationTo: "project-tags",
                  required: true,
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Content",
          description: "Edit this project's content",
          fields: [
            {
              labels: {
                singular: "Section",
                plural: "Sections",
              },
              name: "sections",
              type: "array",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "htmlID",
                  type: "text",
                  required: true,
                  admin: {
                    hidden: true,
                    readOnly: true,
                  },
                  hooks: {
                    beforeValidate: [
                      ({ siblingData, value }) => {
                        if (!value) {
                          return `html-${siblingData.title
                            .replaceAll(" ", "-")
                            .toLowerCase()}`;
                        } else return value;
                      },
                    ],
                  },
                },
                {
                  label: "Blocks",
                  name: "blocks",
                  type: "array",
                  fields: [
                    {
                      label: "Lead",
                      name: "lead",
                      type: "text",
                      required: true,
                    },
                    {
                      label: "Copy",
                      name: "copy",
                      type: "textarea",
                      required: true,
                    },
                    {
                      name: "htmlID",
                      type: "text",
                      required: true,
                      admin: {
                        hidden: true,
                        readOnly: true,
                      },
                      hooks: {
                        beforeValidate: [
                          ({ siblingData, value }) => {
                            if (!value) {
                              return `html-${siblingData.lead
                                .replaceAll(" ", "-")
                                .toLowerCase()}`;
                            } else return value;
                          },
                        ],
                      },
                    },
                    {
                      label: "Showcase",
                      name: "showcase",
                      type: "blocks",
                      blocks: [Showcase],
                    },
                  ],
                  admin: {
                    components: {
                      RowLabel: BlockRowLabel,
                    },
                  },
                },
              ],
              admin: {
                components: {
                  RowLabel: SectionRowLabel,
                },
              },
            },
          ],
        },
        {
          label: "Settings",
          description: "Miscellenous options for this project",
          fields: [
            {
              label: "Locked",
              name: "isLocked",
              defaultValue: false,
              type: "checkbox",
              admin: {
                description:
                  "Users won't be able to access this project unless they provide a password",
              },
            },
            {
              label: "Locked project settings",
              name: "lockedData",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      label: "Codename",
                      name: "codename",
                      type: "text",
                      required: true,
                    },
                  ],
                },
              ],
              admin: {
                description:
                  "Provide a codename and a password for this locked project",
                condition: (data) => (data.isLocked ? true : false),
              },
            },
            {
              label: "Featured Project",
              name: "isFeatured",
              defaultValue: false,
              type: "checkbox",
              admin: {
                description:
                  "Add this project to the Featured Projects carousel displayed on the homepage",
              },
            },
            {
              type: "group",
              name: "featuredData",
              label: "Featured project settings",
              admin: {
                condition: (data) => {
                  return data.isFeatured ? true : false;
                },
              },
              fields: [
                {
                  type: "upload",
                  label: "Featured Image",
                  name: "image",
                  required: true,
                  relationTo: "assets",
                },
                {
                  type: "row",
                  fields: [
                    {
                      type: "text",
                      label: "Start Color",
                      name: "gradientStart",
                      required: true,
                      admin: {
                        description: "Enter a valid HEX code",
                      },
                    },
                    {
                      type: "text",
                      label: "End Color",
                      name: "gradientEnd",
                      required: true,
                      admin: {
                        description: "Enter a valid HEX code",
                      },
                    },
                  ],
                },
              ],
            },
            {
              label: "Archived",
              name: "isArchived",
              defaultValue: false,
              type: "checkbox",
              admin: {
                description:
                  "Archived projects adds a section on the project page",
                condition: (data) => (data.status === "DONE" ? true : false),
              },
            },
          ],
        },
      ],
    },
  ],
};

export default Projects;
