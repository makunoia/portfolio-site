import { LexicalBlock } from "@/app/(app)/types";
import { renderLexicalContent } from "@/helpers";
import { Webpage } from "payload-types";

const AboutMeHero = ({ data }: { data: Webpage["intro"] }) => {
  const root = data?.root.children as LexicalBlock;

  return (
    <div className="flex flex-col gap-24px">
      {root ? renderLexicalContent(root) : null}
    </div>
  );
};

export default AboutMeHero;
