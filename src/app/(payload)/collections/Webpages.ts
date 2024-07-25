import { CollectionConfig } from "payload";
import { SectionRowLabel } from "../components/RowLabel";
import InfoItem from "../blocks/InfoItem";
import BooleanItem from "../blocks/BooleanItem";
import MediaItem from "../blocks/MediaItem";
import URLItem from "../blocks/URLItem";

const Site: CollectionConfig = {
  slug: "webpages",
  labels: {
    singular: "Webpage",
    plural: "Webpages",
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
              label: "Cover Photo",
              name: "cover",
              type: "relationship",
              relationTo: "assets",
              admin: {
                width: "50%",
              },
            },
            {
              label: "Portrait",
              name: "portrait",
              type: "relationship",
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
          blocks: [InfoItem, BooleanItem, MediaItem, URLItem],
          validate: (data, { siblingData }) => {
            const content = siblingData.content;

            if (content.length === 0) {
              return true;
            }

            const firstValue = content[0]["blockType"];
            for (let i = 1; i < content.length; i++) {
              if (content[i]["blockType"] !== firstValue) {
                return "All blocks must be the same in a section.";
              }
            }

            return true;
          },
        },
      ],
      admin: {
        components: {
          RowLabel: SectionRowLabel,
        },
        condition: (data) => (data?.name === "About Me" ? true : false),
      },
    },
  ],
};

export default Site;
