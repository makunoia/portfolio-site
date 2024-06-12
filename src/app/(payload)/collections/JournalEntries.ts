import type { CollectionConfig } from "payload/types";
import ContentBlock from "../blocks/ContentBlock";
import Showcase from "../blocks/Showcase";

const JournalEntries: CollectionConfig = {
  slug: "journal-entries",
  labels: {
    singular: "Journal Entry",
    plural: "Journal Entries",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text",
    },
    {
      label: "Gist",
      name: "gist",
      type: "textarea",
    },
    {
      label: "Date",
      name: "date",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMM d, yyy",
        },
      },
    },
    {
      label: "Tag",
      name: "tag",
      type: "relationship",
      relationTo: "journal-entry-tags",
      admin: {
        position: "sidebar",
      },
    },
    {
      label: "Content",
      name: "content",
      type: "blocks",
      blocks: [ContentBlock, Showcase],
    },
  ],
};

export default JournalEntries;
