import StatusBadge from "@/components/StatusBadge";

import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/helpers";
import StaggerAnimator from "../StaggerAnimator";

const HomeHero = ({ copy }: { copy: LexicalBlock }) => {
  return (
    <StaggerAnimator
      className="flex flex-col gap-24px w-[80%]"
      play={Boolean(copy.length)}
    >
      {copy ? renderLexicalContent(copy) : null}
      <StatusBadge />
    </StaggerAnimator>
  );
};

export default HomeHero;
