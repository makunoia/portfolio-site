import StatusBadge from "@/components/StatusBadge";

import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/helpers";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
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

  const copy = docs[0].intro?.root.children as LexicalBlock;
  const status = docs[0].status as "employed" | "open";

  return (
    <div className="flex flex-col gap-24px w-[80%]">
      {copy.length ? renderLexicalContent(copy) : null}
      <StatusBadge status={status} />
    </div>
  );
};

export default HomeHero;
