import type { CollectionConfig } from "payload/types";

const JournalEntryTags: CollectionConfig = {
  slug: "journal-entry-tags",
  labels: {
    singular: "Journal Entry Tag",
    plural: "Journal Entry Tags",
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

export default JournalEntryTags;
