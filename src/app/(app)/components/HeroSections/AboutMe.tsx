import Text from "../Text";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/helpers";

const payload = await getPayloadHMR({ config });

const AboutMeHero = async () => {
  const { docs } = await payload.find({
    collection: "webpages",
    where: {
      name: {
        equals: "About Me",
      },
    },
  });

  const root = docs[0].intro
    ? (docs[0].intro?.root.children as LexicalBlock)
    : [];

  return (
    <div className="flex flex-col gap-24px">{renderLexicalContent(root)}</div>
  );
};

export default AboutMeHero;
