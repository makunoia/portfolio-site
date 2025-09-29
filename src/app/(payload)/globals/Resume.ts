import type {GlobalConfig} from "payload";
import {invalidateCacheTags} from "../lib/revalidateTags";

const Resume: GlobalConfig = {
  slug: "resume",
  label: "Resume",
  admin: {
    group: "Settings",
  },
  hooks: {
    afterChange: [
      async () => {
        invalidateCacheTags(["global", "global:resume"]);
      },
    ],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          label: "Resume",
          name: "resume",
          type: "upload",
          relationTo: "assets",
          admin: {
            width: "50%",
            description: "Upload a your latest resume",
          },
        },
      ],
    },
  ],
};

export default Resume;
