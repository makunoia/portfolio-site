import { Block } from "payload/types";
import Showcase from "./Showcase";

const ContentBlock: Block = {
  slug: "content-block",
  interfaceName: "ContentBlock",
  labels: {
    singular: "Content Block",
    plural: "Content Blocks",
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

export default ContentBlock;
