import { Block } from "payload";

const RichTextParagraph: Block = {
  slug: "rich-text-paragraph",
  interfaceName: "RichTextParagraph",
  labels: {
    singular: "Rich Text Paragraph",
    plural: "Rich Text Paragraphs",
  },
  fields: [
    {
      label: "content",
      name: "content",
      type: "richText",
    },
  ],
};

export default RichTextParagraph;
