import path from "path";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Pages from "./collections/Pages";
import Projects from "./collections/Projects";
import Users from "./collections/Users";
import Assets from "./collections/Assets";
import JournalEntries from "./collections/JournalEntries";
import ProjectTags from "./collections/tags/ProjectTags";
import RolesOnProjects from "./collections/tags/RolesOnProjects";
import JournalEntryTags from "./collections/tags/JournalEntryTags";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Projects,
    JournalEntries,
    Pages,
    Users,
    ProjectTags,
    RolesOnProjects,
    JournalEntryTags,
    Assets,
  ],

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
