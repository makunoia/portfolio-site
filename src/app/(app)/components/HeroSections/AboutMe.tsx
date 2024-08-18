import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/lib/helpers";
import { Page } from "payload-types";

const AboutMeHero = ({ data }: { data: Page["intro"] }) => {
  const root = data?.root.children as LexicalBlock;

  return (
    <div className="flex flex-col gap-24px">
      {root ? renderLexicalContent(root) : null}
    </div>
  );
};

export default AboutMeHero;
