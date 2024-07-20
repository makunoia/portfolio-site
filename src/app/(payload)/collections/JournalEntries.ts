import type { CollectionConfig } from "payload";
import { BlockRowLabel } from "../components/RowLabel";
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
      label: "Content Blocks",
      name: "blocks",
      required: true,
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
          maxRows: 1,
        },
      ],
      admin: {
        components: {
          RowLabel: BlockRowLabel,
        },
      },
    },
  ],
  hooks: {
    beforeValidate: [({ data }) => console.log("before validate", data)],
    beforeChange: [({ data }) => console.log("before change", data)],
  },
};

export default JournalEntries;
