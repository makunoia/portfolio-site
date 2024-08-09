import React, { ReactNode } from "react";
import SectionDivider from "../SectionDivider";
import Text from "../Text";
import Showcase from "../Showcase";
import { Project } from "payload-types";

const ProjectContent = ({ sections }: { sections: Project["sections"] }) => {
  const isShowcaseType = (showcase: any): showcase is { showcase: object } => {
    return showcase.showcase;
  };

  return (
    <article
      id="page-content"
      className="md:col-start-2 md:col-end-3 flex flex-col gap-60px"
    >
      {sections?.length
        ? sections.map((section) => (
            <ContentSection
              key={section.id}
              header={section.title}
              htmlID={section.htmlID}
            >
              {section.blocks?.length
                ? section.blocks.map((block) => (
                    <div
                      key={block.id}
                      id={block.htmlID}
                      className="flex flex-col gap-40px scroll-mt-40px"
                    >
                      <ContentBlock lead={block.lead}>
                        {block.copy}
                      </ContentBlock>

                      <div className="flex flex-col gap-12px">
                        {isShowcaseType(block) && block.showcase?.length
                          ? block.showcase.map((showcase) => {
                              return (
                                <Showcase
                                  key={showcase.id}
                                  image={showcase.image}
                                  title={showcase.title}
                                  desc={showcase.desc}
                                  tag={showcase.tag as string}
                                  isRevealer={showcase.isRevealer}
                                  images={showcase.images}
                                />
                              );
                            })
                          : null}
                      </div>
                    </div>
                  ))
                : "No blocks found"}
            </ContentSection>
          ))
        : "No sections found."}
    </article>
  );
};

const ContentSection = ({
  header,
  htmlID,
  children,
}: {
  header: string;
  htmlID: string;
  children: ReactNode;
}) => {
  return (
    <section
      id={htmlID}
      className="content-block flex flex-col gap-40px scroll-mt-24px"
    >
      <SectionDivider header={header} />
      {children}
    </section>
  );
};

const ContentBlock = ({
  lead,
  children,
}: {
  lead: string;
  children: string;
}) => {
  return (
    <div className="flex flex-col gap-8px md:gap-24px md:justify-between md:flex-row">
      <Text as="h3" size="lead" weight="medium" className="min-w-[250px]">
        {lead}
      </Text>
      <Text
        as="p"
        size="body"
        className="text-subtle whitespace-pre-line"
        multiline
      >
        {children}
      </Text>
    </div>
  );
};

export default ProjectContent;
