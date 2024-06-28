import React, { ReactNode } from "react";
import SectionDivider from "./SectionDivider";
import Text from "./Text";
import Showcase from "./Showcase";
import { ProjectType } from "../sample-payload/project";

const ProjectContent = ({ content }: { content: ProjectType }) => {
  const isShowcaseType = (showcase: any): showcase is { showcase: object } => {
    return showcase.showcase;
  };

  return (
    <article
      id="page-content"
      className="md:col-start-2 md:col-end-3 flex flex-col gap-60px"
    >
      {content.sections.map((section) => (
        <ContentSection key={section.id} header={section.title} id={section.id}>
          {section.parts.map((part) => (
            <div
              key={part.id}
              id={part.id}
              className="flex flex-col gap-40px scroll-mt-40px"
            >
              <ContentBlock subtitle={part.lead}>{part.content}</ContentBlock>
              {isShowcaseType(part) && (
                <Showcase
                  src={part.showcase.src}
                  lead={part.showcase.lead}
                  tag={part.showcase.tag as string}
                  content={part.showcase.desc}
                />
              )}
            </div>
          ))}
        </ContentSection>
      ))}
    </article>
  );
};

const ContentSection = ({
  header,
  id,
  children,
}: {
  header: string;
  id: string;
  children: ReactNode;
}) => {
  return (
    <section
      id={id}
      className="content-block flex flex-col gap-40px scroll-mt-24px"
    >
      <SectionDivider header={header} />
      {children}
    </section>
  );
};

const ContentBlock = ({
  subtitle,
  children,
}: {
  subtitle: string;
  children: string;
}) => {
  return (
    <div className="flex flex-col gap-8px md:justify-between md:flex-row">
      <Text as="h3" size="lead" weight="medium" className="min-w-[200px]">
        {subtitle}
      </Text>
      <Text as="p" size="body" className="text-subtle" multiline>
        {children}
      </Text>
    </div>
  );
};

export default ProjectContent;
