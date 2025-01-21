import StatusBadge from "@/components/StatusBadge";

import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/lib/helpers";

import { getPageData } from "@/lib/payload-actions";

const HomeHero = async () => {
  const data = await getPageData("Home");

  let copy: LexicalBlock = [];
  let status: React.ComponentProps<typeof StatusBadge>["status"];

  if (data) {
    copy = data?.intro?.root.children as LexicalBlock;
    status = data.status as "employed" | "open";
  }

  return (
    <div className="flex flex-col gap-24px w-[90%]">
      {copy.length ? renderLexicalContent(copy) : null}
      <StatusBadge status={status} />
    </div>
  );
};

export default HomeHero;
