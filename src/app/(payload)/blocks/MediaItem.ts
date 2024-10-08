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
      label: "Genre",
      name: "genre",
      type: "text",
      required: true,
    },
    {
      label: "Tag",
      name: "tag",
      type: "text",
    },
    {
      label: "Poster",
      name: "poster",
      type: "relationship",
      relationTo: "assets",
    },
  ],
};

export default MediaItem;
