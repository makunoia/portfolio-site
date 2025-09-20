import type { CollectionConfig } from "payload";
import { invalidateCacheTags } from "../lib/revalidateTags";

const JournalEntries: CollectionConfig = {
  slug: "journal-entries",
  versions: {
    drafts: true,
  },
  labels: {
    singular: "Journal Entry",
    plural: "Journal Entries",
  },
  hooks: {
    afterChange: [
      async () => {
        invalidateCacheTags([
          "journalEntries",
          "entryContent",
          "collection",
          "collection:journal-entries",
        ]);
      },
    ],
    afterDelete: [
      async () => {
        invalidateCacheTags([
          "journalEntries",
          "entryContent",
          "collection",
          "collection:journal-entries",
        ]);
      },
    ],
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "type",
      name: "type",
      type: "text",
      defaultValue: "journal-entry",
      required: true,
      admin: {
        hidden: true,
        readOnly: true,
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
        beforeValidate: [
          ({ siblingData, value }) => {
            //Create a slug from the first Project Title entered.
            if (!value) {
              return siblingData.title.replaceAll(" ", "-").toLowerCase();
            } else return value;
          },
        ],
      },
    },
    {
      label: "Date",
      name: "date",
      type: "date",
      required: true,
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
      required: true,
      relationTo: "journal-entry-tags",
      admin: {
        position: "sidebar",
      },
    },
    {
      label: "Content",
      name: "content",
      required: true,
      type: "richText",
    },
  ],
};

export default JournalEntries;
