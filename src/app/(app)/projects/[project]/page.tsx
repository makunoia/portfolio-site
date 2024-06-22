import Text from "@/components/Text";
import React, { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import Showcase from "@/components/Showcase";
import { cva } from "class-variance-authority";

const Page = () => {
  const pageSections = [
    { label: "Introduction", id: "introduction", active: true },
    { label: "Research", id: "research", active: false },
    { label: "Prototyping", id: "prototyping", active: false },
  ];

  return (
    <>
      <main className="project-page-grid mx-auto my-[80px]">
        <div className="flex flex-col md:col-start-2 md:col-end-3 gap-40px">
          <BackButton />
          <div className="flex flex-col md:flex-row gap-24px justify-between">
            <div className="flex flex-col gap-24px min-w-[350px]">
              <div className="flex flex-col gap-4px">
                <Text
                  as="h1"
                  size="display"
                  weight="normal"
                  className="text-nowrap"
                >
                  Multiverse UI
                </Text>

                <Text
                  as="h3"
                  size="lead"
                  weight="normal"
                  multiline
                  className="text inline-flex md:hidden"
                >
                  Multisys' first organization-wide design system made possible
                  with a group of talented designers.
                </Text>
              </div>
              <div className="flex flex-row gap-8px">
                <ProjectBadge label="2022" />
                <ProjectBadge label="Design System" />
              </div>

              <div className="flex flex-row gap-40px">
                <ProjectOverline label="Role" value="Product Designer" />
                <ProjectOverline label="Status" value="Ongoing Project" />
              </div>
            </div>
            <Text
              as="h3"
              size="lead"
              weight="normal"
              multiline
              className="text hidden md:inline-flex"
            >
              Multisys' first organization-wide design system made possible with
              a group of talented designers.
            </Text>
          </div>
        </div>
        <div className="hidden md:inline-block md:col-start-1">
          <ProjectScrollSpy sections={pageSections} />
        </div>
        <article className="md:col-start-2 flex flex-col gap-60px">
          <ContentSection header="Introduction">
            <ContentBlock subtitle="Research">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, quidem corrupti. Inventore autem iste, mollitia ad
              ducimus quia consectetur quasi fugiat aut dolore hic iure cumque
              debitis animi tempore dolor temporibus. Harum exercitationem
              corrupti tempora esse qui consequatur itaque, nisi minus
              dignissimos illo eaque ratione corporis veritatis architecto est
              provident.
            </ContentBlock>
            <ContentBlock subtitle="Surveys">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus voluptatem est quisquam facere rem nemo nisi a,
              laboriosam dolores dolorem!
            </ContentBlock>
            <Showcase
              lead="Photo Description"
              tag="cool"
              content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem quaerat perspiciatis, necessitatibus modi magni deserunt delectus. Quo tenetur cupiditate culpa."
            />
          </ContentSection>

          <ContentSection header="Research">
            <ContentBlock subtitle="Research">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, quidem corrupti. Inventore autem iste, mollitia ad
              ducimus quia consectetur quasi fugiat aut dolore hic iure cumque
              debitis animi tempore dolor temporibus. Harum exercitationem
              corrupti tempora esse qui consequatur itaque, nisi minus
              dignissimos illo eaque ratione corporis veritatis architecto est
              provident.
            </ContentBlock>
            <ContentBlock subtitle="Surveys">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus voluptatem est quisquam facere rem nemo nisi a,
              laboriosam dolores dolorem!
            </ContentBlock>
            <Showcase
              lead="Photo Description"
              tag="cool"
              content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem quaerat perspiciatis, necessitatibus modi magni deserunt delectus. Quo tenetur cupiditate culpa."
            />
          </ContentSection>
        </article>
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

const ProjectScrollSpy = ({
  sections,
}: {
  sections: { label: string; id: string; active?: boolean }[];
}) => {
  return (
    <div className="sticky pl-24px top-24px min-w-[150px] ml-auto flex flex-col gap-4px">
      <Text size="body" className="text-subtle mb-12px">
        Content
      </Text>
      {sections.map(({ id, label, active }) => (
        <ProjectScrollSpyItem key={id} label={label} id={id} active={active} />
      ))}
    </div>
  );
};

const ProjectScrollSpyItem = ({
  label,
  id,
  active,
}: {
  label: string;
  id: string;
  active?: boolean;
}) => {
  const ProjectScrollSpyCVA = cva(
    [
      "w-full cursor-pointer",
      "pr-12px py-8px rounded-8px",
      "transition-all ease-in-out duration-300",
    ],
    {
      variants: {
        active: {
          true: "bg-subtle pl-12px",
          false: "hover:bg-subtle/40 hover:pl-12px",
        },
      },
    }
  );

  return (
    <div className={ProjectScrollSpyCVA({ active })}>
      <Text>{label}</Text>
    </div>
  );
};

const ContentSection = ({
  header,
  children,
}: {
  header: string;
  children: ReactNode;
}) => {
  return (
    <div className="content-block flex flex-col gap-40px">
      <SectionDivider header={header} />
      {children}
    </div>
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

export default Page;
