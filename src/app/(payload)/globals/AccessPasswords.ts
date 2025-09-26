import type {GlobalConfig} from "payload";
import {invalidateCacheTags} from "../lib/revalidateTags";

const AccessPasswords: GlobalConfig = {
  slug: "access-passwords",
  label: "Access Passwords",
  admin: {
    group: "Settings",
    description: "Manage passwords for locked content",
  },
  hooks: {
    afterChange: [
      async () => {
        invalidateCacheTags(["global", "global:access-passwords"]);
      },
    ],
  },
  fields: [
    {
      label: "Locked Project Password",
      name: "lockedProjectPassword",
      type: "text",
      required: true,
    },
    {
      label: "Locked Archives Password",
      name: "lockedArchivesPassword",
      type: "text",
      required: true,
    },
  ],
};

export default AccessPasswords;
