import Text from "@/components/Text";
import React, { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import Showcase from "@/components/Showcase";
import PaginationItem from "@/components/PaginationItem";
import ScrollSpy from "@/components/ScrollSpy";
import ProjectPayload from "../../sample-payload/project";

const Page = () => {
  const isShowcaseType = (showcase: any): showcase is { showcase: object } => {
    return showcase.showcase;
  };

  return (
    <>
      <main className="project-page-grid mx-auto my-[80px]">
        <div className="flex flex-col mb-20px md:mb-60px md:col-start-2 md:col-end-3 gap-40px">
          <BackButton />
          <div className="flex flex-col md:flex-row gap-24px justify-between">
            <div className="flex flex-col gap-24px w-full sm:min-w-[350px]">
              <div className="flex flex-col gap-4px">
                <Text
                  as="h1"
                  size="display"
                  weight="normal"
                  className="text-nowrap"
                >
                  {ProjectPayload.title}
                </Text>

                <Text
                  as="h3"
                  size="lead"
                  weight="normal"
                  multiline
                  className="text inline-flex md:hidden"
                >
                  {ProjectPayload.shortDesc}
                </Text>
              </div>
              <div className="flex flex-row gap-8px">
                <ProjectBadge label={ProjectPayload.year} />
                <ProjectBadge label={ProjectPayload.tag} />
              </div>

              <div className="flex flex-row gap-40px">
                <ProjectOverline label="Role" value={ProjectPayload.role} />
                <ProjectOverline label="Status" value={ProjectPayload.status} />
              </div>
            </div>
            <Text
              as="h3"
              size="lead"
              weight="normal"
              multiline
              className="text hidden md:inline-flex"
            >
              {ProjectPayload.shortDesc}
            </Text>
          </div>
        </div>

        <div className="hidden md:inline-block md:col-start-1">
          <ScrollSpy sections={ProjectPayload.sections} />
        </div>

        <article className="md:col-start-2 md:col-end-3 flex flex-col gap-60px">
          {ProjectPayload.sections.map((section) => (
            <ContentSection header={section.title} id={section.id}>
              {section.subsections.map((sub) => (
                <>
                  <ContentBlock id={sub.id} subtitle={sub.lead}>
                    {sub.content}
                  </ContentBlock>
                  {isShowcaseType(sub) && (
                    <Showcase
                      src={sub.showcase.src}
                      lead={sub.showcase.lead}
                      tag={sub.showcase.tag}
                      content={sub.showcase.desc}
                    />
                  )}
                </>
              ))}
            </ContentSection>
          ))}
        </article>

        <section className="md:col-start-2 md:col-end-3 flex flex-col gap-30px">
          <hr />
          <div className="flex gap-24px justify-between">
            <PaginationItem
              desc="Previous"
              label="An app for Filipino citizens"
              left
            />
            <PaginationItem
              desc="Next"
              label="An small business online store app"
              right
            />
          </div>
        </section>
      </main>
    </>
  );
};

const BackButton = () => {
  return (
    <Link href="/projects">
      <div className="flex flex-row items-center gap-8px group hover:-translate-x-8px transition-transform ease-in-out duration-200">
        <ArrowLeft size={16} className="text" />
        <Text
          size="body"
          className="opacity-40 group-hover:opacity-100 transition-opacity ease-in-out duration-500"
        >
          Back to all projects
        </Text>
      </div>
    </Link>
  );
};

const ProjectBadge = ({ label }: { label: string }) => {
  return (
    <div className="px-16px py-12px rounded-24px border-inverse border w-fit">
      <Text as="h1" size="body-large" weight="medium" className="text-nowrap">
        {label}
      </Text>
    </div>
  );
};

const ProjectOverline = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col gap-4px w-fit">
      <Text
        as="span"
        size="caption"
        weight="medium"
        className="text-subtle text-nowrap"
      >
        {label}
      </Text>
      <Text as="span" size="body" className="text text-nowrap">
        {value}
      </Text>
    </div>
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
    <div className="content-block flex flex-col gap-40px">
      <SectionDivider header={header} id={id} />
      {children}
    </div>
  );
};

const ContentBlock = ({
  id,
  subtitle,
  children,
}: {
  id: string;
  subtitle: string;
  children: string;
}) => {
  return (
    <div
      id={id}
      className="flex flex-col gap-8px md:justify-between md:flex-row"
    >
      <Text as="h3" size="lead" weight="medium" className="min-w-[200px]">
        {subtitle}
      </Text>
      <Text as="p" size="body" className="text-subtle" multiline>
        {children}
      </Text>
    </div>
  );
};

export default Page;
