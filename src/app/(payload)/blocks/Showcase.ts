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
      required: true,
    },
    {
      label: "Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "Description",
      name: "desc",
      type: "textarea",
    },
    {
      label: "Tag",
      name: "tag",
      type: "text",
      admin: {
        description: "A small badge at the opposite end of the title",
      },
    },
  ],
};

export default Showcase;
