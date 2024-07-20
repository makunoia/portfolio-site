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
          label: "Title",
          name: "title",
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
        components: {
          RowLabel: SectionRowLabel,
        },
        condition: (data) => (data?.name === "About Me" ? true : false),
      },
    },
  ],
};

export default Site;
