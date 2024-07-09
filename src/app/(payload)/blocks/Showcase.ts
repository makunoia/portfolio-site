import type { Block } from "payload";
const Showcase: Block = {
  slug: "showcase",
  interfaceName: "Showcase",
  labels: {
    singular: "Showcase",
    plural: "Showcases",
  },
  fields: [
    {
      label: "Image",
      name: "image",
      type: "upload",
      relationTo: "assets",
    },
    {
      label: "Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
  ],
};

export default Showcase;
