import { BlocksField, BlocksFieldValidation, CollectionConfig } from "payload";
import InfoItem from "../blocks/InfoItem";
import BooleanItem from "../blocks/BooleanItem";
import MediaItem from "../blocks/MediaItem";
import { invalidateCacheTags } from "../lib/revalidateTags";

const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  hooks: {
    afterChange: [
      async () => {
        invalidateCacheTags(["pageData", "collection", "collection:pages"]);
      },
    ],
    afterDelete: [
      async () => {
        invalidateCacheTags(["pageData", "collection", "collection:pages"]);
      },
    ],
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "id"],
  },
  fields: [
    {
      label: "Page Name",
      name: "name",
      type: "select",
      options: ["Home", "Projects", "Journal", "About Me"],
      required: true,
      unique: true,
    },
    {
      label: "Intro",
      name: "intro",
      type: "richText",
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      required: true,
      defaultValue: "employed",
      options: [
        { label: "Employed", value: "employed" },
        { label: "Open for Work", value: "open" },
      ],
      admin: {
        description:
          "Your status will be displayed as a badge on the home page hero section",
        condition: (data) => (data?.name === "Home" ? true : false),
      },
    },
    {
      label: "Cover and Portrait Photo",
      name: "pagePhotos",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              label: "Portrait",
              name: "portrait",
              type: "upload",
              required: true,
              relationTo: "assets",
              admin: {
                width: "50%",
              },
            },
            {
              label: "Cover Photo",
              name: "cover",
              type: "upload",
              required: true,
              relationTo: "assets",
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
      admin: {
        condition: (data) => (data?.name === "About Me" ? true : false),
      },
    },
    {
      label: "Sections",
      name: "sections",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              label: "Title",
              name: "title",
              type: "text",
              required: true,
              admin: {
                width: "50%",
              },
            },
            {
              label: "Layout",
              name: "layout",
              type: "select",
              required: true,
              options: [
                { label: "Stack", value: "stack" },
                { label: "Two-Column Grid", value: "two-col" },
              ],
              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          label: "Content",
          name: "content",
          type: "blocks",
          required: true,
          blocks: [InfoItem, BooleanItem, MediaItem],
          validate: (value) => {
            const content = value;
            if (
              Array.isArray(content) &&
              content.every(
                (item) => typeof item === "object" && "blockType" in item
              )
            ) {
              if (content.length === 0) {
                return true;
              } else {
                const firstValue = content[0]["blockType"];
                for (let i = 1; i < content.length; i++) {
                  if (content[i]["blockType"] !== firstValue) {
                    return "All blocks must be the same in a section.";
                  }
                }
              }
            }

            return true;
          },
        },
      ],
      admin: {
        components: {
          RowLabel: "@/app/(payload)/components/RowLabel.tsx#SectionRowLabel",
        },
        condition: (data) => (data?.name === "About Me" ? true : false),
      },
    },
  ],
};

export default Pages;
