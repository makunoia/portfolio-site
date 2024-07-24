import Text from "../Text";
import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/helpers";
import StaggerAnimator from "../StaggerAnimator";

const JournalHero = async ({
  title,
  copy,
}: {
  title: string;
  copy: LexicalBlock;
}) => {
  return (
    <StaggerAnimator
      className="flex flex-col gap-4px"
      play={Boolean(copy.length)}
    >
      <Text as="h1" size="heading" weight="normal">
        {title}
      </Text>

      {copy ? renderLexicalContent(copy) : null}
    </StaggerAnimator>
  );
};

export default JournalHero;
