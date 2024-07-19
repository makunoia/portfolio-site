import { Block } from "payload";

const MediaItem: Block = {
  slug: "media-item",
  interfaceName: "MediaItem",
  labels: {
    singular: "Media Item",
    plural: "Media Items",
  },
  fields: [
    {
      label: "Label",
      name: "label",
      type: "text",
      required: true,
    },
    {
      label: "Description",
      name: "desc",
      type: "text",
      required: true,
    },
    {
      label: "Tag",
      name: "tag",
      type: "text",
    },
    {
      label: "Image",
      name: "image",
      type: "relationship",
      relationTo: "assets",
    },
    {
      label: "progress",
      name: "progress",
      type: "group",
      fields: [
        {
          label: "Episode Count",
          name: "episodeCount",
          type: "number",
        },
        {
          label: "Episodes Watched",
          name: "watchedCount",
          type: "number",
        },
      ],
    },
  ],
};

export default MediaItem;
