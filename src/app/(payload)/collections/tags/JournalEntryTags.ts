import type { CollectionConfig } from "payload";

const JournalEntryTags: CollectionConfig = {
  slug: "journal-entry-tags",
  labels: {
    singular: "Journal Entry Tag",
    plural: "Journal Entry Tags",
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

export default JournalEntryTags;
