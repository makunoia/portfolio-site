import path from "path";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import Pages from "./src/app/(payload)/collections/Pages";
import Projects from "./src/app/(payload)/collections/Projects";
import Users from "./src/app/(payload)/collections/Users";
import Assets from "./src/app/(payload)/collections/Assets";
import JournalEntries from "./src/app/(payload)/collections/JournalEntries";
import ProjectTags from "./src/app/(payload)/collections/tags/ProjectTags";
import MyRoles from "./src/app/(payload)/collections/tags/MyRoles";
import JournalEntryTags from "./src/app/(payload)/collections/tags/JournalEntryTags";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { fileURLToPath } from "url";
import { s3Storage } from "@payloadcms/storage-s3";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
import sharp from "sharp";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    Users,
    Projects,
    ProjectTags,
    MyRoles,
    Pages,
    JournalEntries,
    JournalEntryTags,
    Assets,
  ],
  plugins: [
    s3Storage({
      disableLocalStorage: true,
      collections: {
        assets: true,
      },
      bucket: process.env.CLOUDFLARE_BUCKET_NAME || "",
      config: {
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY || "",
        },
        region: process.env.CLOUDFLARE_REGION,
        endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      },
    }),
  ],
  upload: {
    staticDir: `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/`,
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  admin: {
    autoLogin: {
      email: "markbriannoya@gmail.com",
      password: "cmsdev",
      prefillOnly: true,
    },
  },

  sharp,
});
