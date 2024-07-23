import StatusBadge from "@/components/StatusBadge";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/helpers";

const payload = await getPayloadHMR({ config });

const HomeHero = async () => {
  const { docs } = await payload.find({
    collection: "webpages",
    where: {
      name: {
        equals: "Home",
      },
    },
  });

  const root = docs[0].intro?.root.children as LexicalBlock;

  return (
    <div className="flex flex-col gap-24px w-3/4">
      {root ? renderLexicalContent(root) : null}
      <StatusBadge />
    </div>
  );
};

export default HomeHero;
