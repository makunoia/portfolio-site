import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/lib/helpers";
import { getEntryContent } from "@/lib/payload-actions";

const Content = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const content = await getEntryContent(params.slug);

  const root = content?.root.children as LexicalBlock;
  return renderLexicalContent(root);
};

export default Content;
