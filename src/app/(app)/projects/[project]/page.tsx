export const dynamic = "force-dynamic";
export const revalidate = 3600;

import React from "react";
import Link from "next/link";

import Text from "@/components/Text";
import ProjectContent from "@/components/ProjectContent";
import ContentObserver from "@/components/ContentObserver";
import ScrollSpy, { ScrollSpyType } from "@/components/ScrollSpy";
import Pagination from "@/components/Pagination";

import { MyRole, ProjectTag } from "payload-types";
import { InViewProvider } from "@/contexts/InViewContext";
import { ArrowLeft } from "lucide-react";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

const getProject = async (slug: string) => {
  const payload = await getPayloadHMR({ config });
  const req = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const project = req.docs[0];

  return project;
};

const Page = async ({ params }: { params: { project: string } }) => {
  const projectData = await getProject(params.project);

  const { sections } = projectData;
  // There's a bug in Payload 3.0 relations that affect type setting
  // This is a temporary measure to enforce proper type
  const tag: ProjectTag = projectData.tag as ProjectTag;
  const role: MyRole = projectData.role as MyRole;

  const status = {
    ONGOING: "Ongoing",
    DONE: "Done",
  };

  return (
    <>
      <InViewProvider>
        {sections?.length ? (
          <ContentObserver content={projectData.sections} />
        ) : null}

        <main className="project-page-grid mx-auto my-[80px]">
          <div className="flex flex-col mb-20px md:mb-60px md:col-start-2 md:col-end-3 gap-40px">
            <BackButton />
            <div
              id="page-title"
              className="flex flex-col md:flex-row gap-24px justify-between"
            >
              <div className="flex flex-col gap-24px w-full sm:min-w-[350px]">
                <div className="flex flex-col gap-4px">
                  <Text
                    as="h1"
                    size="display"
                    weight="normal"
                    className="text-nowrap"
                  >
                    {projectData.title}
                  </Text>

                  <Text
                    as="h3"
                    size="lead"
                    weight="normal"
                    multiline
                    className="text inline-flex md:hidden"
                  >
                    {projectData.desc}
                  </Text>
                </div>
                <div className="flex flex-row gap-8px">
                  <ProjectBadge label={projectData.year} />
                  <ProjectBadge label={tag.name} />
                </div>

                <div className="flex flex-row gap-40px">
                  <ProjectOverline label="Role" value={role.name} />
                  <ProjectOverline
                    label="Status"
                    value={status[projectData.status]}
                  />
                </div>
              </div>
              <Text
                as="h3"
                size="lead"
                weight="normal"
                multiline
                className="text hidden md:inline-flex"
              >
                {projectData.desc}
              </Text>
            </div>
          </div>

          <div className="hidden md:inline-block md:col-start-1">
            {sections?.length ? (
              <ScrollSpy sections={sections as ScrollSpyType[]} />
            ) : null}
          </div>

          {sections?.length ? (
            <ProjectContent sections={sections} />
          ) : (
            <div>No content</div>
          )}

          <section className="md:col-start-2 md:col-end-3 flex flex-col gap-30px">
            <hr />
            <Pagination currID={projectData.id} />
          </section>
        </main>
      </InViewProvider>
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

export default Page;
