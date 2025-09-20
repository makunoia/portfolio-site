import Text from "../Text";
import {LexicalBlock} from "@/app/(app)/types";
import {renderLexicalContent} from "@/lib/helpers";

import config from "@payload-config";
import {getPayload} from "payload";

const payload = await getPayload({config});

const GalleryHero = async () => {
  const {docs} = await payload.find({
    collection: "pages",
    where: {
      name: {
        equals: "Gallery",
      },
    },
  });

  const page = docs?.[0];
  const title = page?.name ?? "Gallery";
  const copy = (page?.intro?.root.children ?? []) as LexicalBlock;

  return (
    <div className="flex flex-col gap-4px">
      <Text as="h1" size="heading" weight="normal">
        {title}
      </Text>
      {copy.length ? renderLexicalContent(copy) : null}
    </div>
  );
};

export default GalleryHero;

