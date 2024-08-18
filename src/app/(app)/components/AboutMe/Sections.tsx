import Text from "../Text";
import { Page } from "payload-types";
import { renderSections } from "@/lib/helpers";
import { cva } from "class-variance-authority";

const LayoutCVA = cva("", {
  variants: {
    layout: {
      stack: "flex flex-col gap-12px",
      "two-col": "grid grid-cols-1 sm:grid-cols-[250px_250px] gap-18px w-full",
    },
  },
});

const Sections = ({ data }: { data: Page["sections"] }) => {
  return data ? (
    data.map((block) => (
      <section className="flex flex-col gap-12px" key={block.id}>
        <Text as="h3" size="body-large" weight="medium">
          {block.title as string}
        </Text>

        {block.layout ? (
          <ul className={LayoutCVA({ layout: block.layout })}>
            {renderSections(block)}
          </ul>
        ) : null}
      </section>
    ))
  ) : (
    <section>No sections</section>
  );
};

export default Sections;
