import { CollectionConfig } from "payload";
import InfoItem from "../blocks/InfoItem";
import BooleanItem from "../blocks/BooleanItem";
import URLItem from "../blocks/URLItem";
import MediaItem from "../blocks/MediaItem";

const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "id"],
  },
  fields: [
    {
      label: "Page Title",
      name: "title",
      type: "select",
      options: ["Home", "Projects", "Journal", "About Me"],
      defaultValue: "Select a page",
      required: true,
      unique: true,
    },
    {
      label: "Intro",
      name: "intro",
      type: "richText",
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
            },
            {
              label: "Portrait",
              name: "portrait",
              type: "relationship",
              relationTo: "assets",
            },
          ],
        },
      ],
      admin: {
        condition: (data) => (data?.title === "About Me" ? true : false),
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
          blocks: [InfoItem, BooleanItem, MediaItem, URLItem],
        },
      ],
      admin: {
        condition: (data) => (data?.title === "About Me" ? true : false),
      },
    },
  ],
};

// SETTINGS:
// PAGE: HOME, PROJECTS, JOURNAL, ABOUT ME
// HIDE / SHOW DEPENDING ON SELECTED

// A page can consist of:
// Intro Paragraph

// About us:
// - Cover Photo
// - Portrait

// - Work Experience: Section Name, Item: {Image, Title, Desc, Tag}
// - Checklist: Section Name, Item: {Boolean, Label}
// - My toolkit: Section Name, Item: {Image, Title, Desc, Tag}
// - Catchup on: Section Name, Item: {Image, Title, Progress: {Total Episodes, Episodes Watched}}
// - Piano Covers: Section Name, Item: {URL, Title, desc, tag}

export default Pages;
