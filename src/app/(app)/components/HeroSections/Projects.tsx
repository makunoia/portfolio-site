import Text from "../Text";

import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/lib/helpers";

import config from "@payload-config";
import { getPayload } from "payload";
const payload = await getPayload({ config });

const ProjectsHero = async () => {
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      name: {
        equals: "Projects",
      },
    },
  });

  const title = docs ? docs[0].name : "No title";
  const copy = docs[0].intro?.root.children as LexicalBlock;

  return (
    <div className="flex flex-col gap-4px">
      <Text as="h1" size="heading" weight="normal">
        {title}
      </Text>

      {copy ? renderLexicalContent(copy) : null}
    </div>
  );
};

export default ProjectsHero;
