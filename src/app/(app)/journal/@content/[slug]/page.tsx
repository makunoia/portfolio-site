export const fetchCache = "force-cache";
export const dynamic = "force-static";

import React from "react";

import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/lib/helpers";
import { getEntryContent } from "@/lib/payload-actions";

const Content = async ({ params }: { params: { slug: string } }) => {
  const content = await getEntryContent(params.slug);

  const root = content?.root.children as LexicalBlock;
  return <>{content ? renderLexicalContent(root) : <div>No content.</div>}</>;
};

export default Content;
