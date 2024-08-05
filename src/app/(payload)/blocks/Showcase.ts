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
      label: "Reveal another image",
      name: "isRevealer",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Add a before and after image of the showcase",
      },
    },
    {
      label: "Image",
      name: "image",
      type: "upload",
      relationTo: "assets",
      required: true,
      admin: {
        condition: (data, siblingData) => {
          return !siblingData?.isRevealer;
        },
      },
    },

    {
      label: "Images",
      name: "images",
      type: "group",
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.isRevealer;
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              label: "Before Image",
              name: "beforeImage",
              type: "upload",
              relationTo: "assets",
              required: true,
              admin: {
                width: "50%",
              },
            },
            {
              label: "After Image",
              name: "afterImage",
              type: "upload",
              relationTo: "assets",
              required: true,
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
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
