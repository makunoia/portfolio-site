import Text from "../Text";

import {LexicalBlock} from "@/app/(app)/types";
import {extractLexicalHeading, renderLexicalContent} from "@/lib/helpers";
import {getPageData} from "@/lib/payload-actions";

const ProjectsHero = async ({
  titleOverride,
  descriptionOverride,
}: {
  titleOverride?: string;
  descriptionOverride?: string;
} = {}) => {
  const page = await getPageData("Projects");

  const blocks = (page?.intro?.root.children ?? []) as LexicalBlock;
  const {heading, rest} = extractLexicalHeading(blocks);
  const title = titleOverride || heading || page?.name || "Projects";

  const description = descriptionOverride
    ? [
        {
          type: "paragraph",
          children: [{type: "text", text: descriptionOverride}],
        },
      ]
    : rest;

  return (
    <div className="flex flex-col gap-4px">
      <Text as="h1" size="heading" weight="normal">
        {title}
      </Text>

      {description?.length
        ? renderLexicalContent(description as LexicalBlock)
        : null}
    </div>
  );
};

export default ProjectsHero;
