import React from "react";

import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/helpers";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

const Content = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const { docs } = await payload.find({
    collection: "journal-entries",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const content = docs[0].content;
  const root = content?.root.children as LexicalBlock;
  return <>{content ? renderLexicalContent(root) : <div>No content.</div>}</>;
};

export default Content;
