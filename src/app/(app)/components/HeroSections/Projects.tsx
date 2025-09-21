import Text from "../Text";

import {LexicalBlock} from "@/app/(app)/types";
import {extractLexicalHeading, renderLexicalContent} from "@/lib/helpers";
import {getPageData} from "@/lib/payload-actions";

const ProjectsHero = async () => {
  const page = await getPageData("Projects");

  const blocks = (page?.intro?.root.children ?? []) as LexicalBlock;
  const {heading, rest} = extractLexicalHeading(blocks);
  const title = heading || page?.name || "Projects";

  return (
    <div className="flex flex-col gap-4px">
      <Text as="h1" size="heading" weight="normal">
        {title}
      </Text>

      {rest.length ? renderLexicalContent(rest) : null}
    </div>
  );
};

export default ProjectsHero;
