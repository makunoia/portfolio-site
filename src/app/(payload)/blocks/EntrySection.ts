import type { Block } from "payload";

const EntrySection: Block = {
  slug: "entry-section",
  interfaceName: "EntrySection",
  labels: {
    singular: "Entry Section",
    plural: "Entry Sections",
  },
  fields: [
    {
      label: "Lead",
      name: "lead",
      type: "text",
      required: true,
    },
    {
      label: "Content",
      name: "content",
      type: "textarea",
      required: true,
    },
  ],
};

export default EntrySection;
