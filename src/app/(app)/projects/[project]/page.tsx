import React from "react";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import Text from "@/components/Text";
import Pagination from "@/components/Projects/Pagination";
import ProjectContent from "@/components/Projects/ProjectContent";
import ContentObserver from "@/components/Journal/ContentObserver";
import ScrollSpy, { ScrollSpyType } from "@/components/Projects/ScrollSpy";
const LockedProject = dynamic(
  () => import("@/components/Projects/LockedProject/Server")
);
import BackButton from "@/components/Projects/BackButton";

import { MyRole, ProjectTag } from "payload-types";
import { InViewProvider } from "@/contexts/InViewContext";
import { Archive } from "lucide-react";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { MetadataSeed } from "@/lib/metadata";

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

export async function generateMetadata({
  params,
}: {
  params: { project: string };
}) {
  const projectData = await getProject(params.project);

  return {
    title: `${projectData.title} | Mark Noya`,
    description: projectData.desc,

    openGraph: {
      title: `${projectData.title} | Mark Noya`,
      desciption: projectData.desc,
      url: `https://www.marknoya.me/projects/${projectData.slug}`,
      siteName: "Mark Noya's Design Portfolio",
      publishedTime: projectData.createdAt,
      authors: ["Mark Noya"],
    },
    ...MetadataSeed,
  };
}

const Page = async ({ params }: { params: { project: string } }) => {
  const projectData = await getProject(params.project);
  const authCookie = cookies().get("auth");
  const authorized = authCookie ? Boolean(authCookie.value) : false;

  if (!projectData) {
    notFound();
  }

  const { sections } = projectData;
  // There's a bug in Payload 3.0 relations that affect type setting
  // This is a temporary measure to enforce proper type
  const tag = projectData.tag as ProjectTag;
  const role: MyRole = projectData.role as MyRole;
  const archived = projectData.isArchived;
  const locked = projectData.isLocked;
  const codename = projectData.lockedData
    ? projectData.lockedData?.codename
    : "";

  const status = {
    ONGOING: "Ongoing",
    DONE: "Done",
    SUNSET: "Sunset",
  };

  return (
    <>
      {locked && !authorized ? (
        <LockedProject codename={codename} desc={projectData.desc} />
      ) : (
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
                      className="lg:text-nowrap"
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
                    {locked && (
                      <ProjectOverline
                        label="Codename"
                        value={projectData.lockedData?.codename as string}
                      />
                    )}
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

            <div className="hidden lg:inline-block lg:col-start-1 min-w-[120px]">
              {sections?.length ? (
                <ScrollSpy sections={sections as ScrollSpyType[]} />
              ) : null}
            </div>

            {sections?.length ? <ProjectContent sections={sections} /> : null}

            {archived ? (
              <div className="flex flex-col gap-16px md:col-start-2 md:col-end-3 w-full items-center">
                <div className="p-12px bg-subtle shadow-lg shadow-neutral-200 w-fit h-fit rounded-12px bg-gradient-to-b from-neutral-200 to-neutral-100">
                  <Archive size={40} className="text" />
                </div>
                <div className="flex flex-col gap-12px items-center">
                  <div className="flex flex-col gap-4px">
                    <Text
                      size="caption"
                      className="text-subtle text-center uppercase tracking-[.1em]"
                    >
                      {`${status[projectData.status]} in ${
                        projectData.yearDone
                      }`}
                    </Text>
                    <Text size="lead" className="text">
                      This project is archived
                    </Text>
                  </div>

                  <Text size="body" className="text-subtle">
                    You can learn more about this project by reaching out.
                  </Text>
                </div>
              </div>
            ) : null}

            <section className="md:col-start-2 md:col-end-3 flex flex-col gap-30px">
              <hr />
              <Pagination currSlug={projectData.slug} />
            </section>
          </main>
        </InViewProvider>
      )}
    </>
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
