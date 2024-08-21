import React from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import Text from "@/components/Text";
import Pagination from "@/components/Projects/Pagination";
import HeroBadge from "@/components/Projects/Page/HeroBadge";
import HeroOverline from "@/components/Projects/Page/HeroOverline";
import ProjectContent from "@/components/Projects/ProjectContent";
import ContentObserver from "@/components/Journal/ContentObserver";
import ScrollSpy, { ScrollSpyType } from "@/components/Projects/ScrollSpy";
import BackButton from "@/components/Projects/BackButton";

const LockedProject = dynamic(
  () => import("@/components/Projects/LockedProject/Server")
);

import { InViewProvider } from "@/contexts/InViewContext";
import { Archive } from "lucide-react";

import { MyRole, ProjectTag } from "payload-types";
import { getProject } from "@/lib/payload-actions";

const Page = async ({ projectSlug }: { projectSlug: string }) => {
  const project = await getProject(projectSlug);

  const authCookie = cookies().get("auth");
  const authorized = authCookie ? Boolean(authCookie.value) : false;

  if (!project) {
    notFound();
  }

  const { sections } = project;
  // There's a bug in Payload 3.0 relations that affect type setting
  // This is a temporary measure to enforce proper type
  const tag = project.tag as ProjectTag;
  const role: MyRole = project.role as MyRole;
  const archived = project.isArchived;
  const locked = project.isLocked;
  const codename = project.lockedData ? project.lockedData?.codename : "";

  const status = {
    ONGOING: "Ongoing",
    DONE: "Done",
    SUNSET: "Sunset",
  };

  return (
    <>
      {locked && !authorized ? (
        <LockedProject codename={codename} desc={project.desc} />
      ) : (
        <InViewProvider>
          {sections?.length ? (
            <ContentObserver content={project.sections} />
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
                      {project.title}
                    </Text>

                    <Text
                      as="h3"
                      size="lead"
                      weight="normal"
                      multiline
                      className="text inline-flex md:hidden"
                    >
                      {project.desc}
                    </Text>
                  </div>
                  <div className="flex flex-row gap-8px">
                    <HeroBadge label={project.year} />
                    <HeroBadge label={tag.name} />
                  </div>

                  <div className="flex flex-row gap-40px">
                    <HeroOverline label="Role" value={role.name} />
                    <HeroOverline
                      label="Status"
                      value={status[project.status]}
                    />
                    {locked && (
                      <HeroOverline
                        label="Codename"
                        value={project.lockedData?.codename as string}
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
                  {project.desc}
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
                      {`${status[project.status]} in ${project.yearDone}`}
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
              <Pagination currSlug={project.slug} />
            </section>
          </main>
        </InViewProvider>
      )}
    </>
  );
};

export default Page;
