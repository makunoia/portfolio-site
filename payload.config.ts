import path from "path";
import { fileURLToPath } from "url";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

import { s3Storage } from "@payloadcms/storage-s3";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import Pages from "@/app/(payload)/collections/Pages";
import Projects from "@/app/(payload)/collections/Projects";
import Users from "@/app/(payload)/collections/Users";
import Assets from "@/app/(payload)/collections/Assets";
import JournalEntries from "@/app/(payload)/collections/JournalEntries";
import ProjectTags from "@/app/(payload)/collections/tags/ProjectTags";
import MyRoles from "@/app/(payload)/collections/tags/MyRoles";
import JournalEntryTags from "@/app/(payload)/collections/tags/JournalEntryTags";
import Globals from "@/app/(payload)/collections/Globals";

import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

import {
  lexicalEditor,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  ItalicFeature,
  ParagraphFeature,
  UnderlineFeature,
} from "@payloadcms/richtext-lexical";

import sharp from "sharp";
import Showcase from "@/app/(payload)/blocks/Showcase";
import EntrySection from "@/app/(payload)/blocks/EntrySection";

import { OAuth2Client } from "google-auth-library";

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  EMAIL_USER,
  GMAIL_PASS,
} = process.env;

const transportOptions = {
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: GMAIL_PASS,
  },
};

export default buildConfig({
  editor: lexicalEditor({
    features: () => [
      HeadingFeature({ enabledHeadingSizes: ["h1", "h3"] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      ParagraphFeature(),
      BlockquoteFeature(),
      HorizontalRuleFeature(),
      InlineCodeFeature(),
      BlocksFeature({
        blocks: [Showcase, EntrySection],
      }),
    ],
  }),
  email: nodemailerAdapter({
    transportOptions,
    defaultFromName: "Mark Noya",
    defaultFromAddress: EMAIL_USER ? EMAIL_USER : "markbriannoya@gmail.com",
  }),
  collections: [
    Users,
    Projects,
    Pages,
    ProjectTags,
    MyRoles,
    JournalEntries,
    JournalEntryTags,
    Assets,
    Globals,
  ],
  plugins: [
    s3Storage({
      collections: {
        assets: {
          generateFileURL: ({ filename }) => {
            return `${process.env.CLOUDFLARE_BUCKET_PUBLIC_LINK}/${filename}`;
          },
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
        },
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
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  admin: {
    user: Users.slug,
  },
  cors: "*",
  async onInit(payload) {
    //test connections here
  },

  sharp,
});
