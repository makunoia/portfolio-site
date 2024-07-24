export const dynamic = "force-dynamic";
export const revalidate = 3600;

import React, { Suspense } from "react";
import ProjectsList from "@/components/ProjectsList";
import ProjectsHero from "../components/HeroSections/Projects";
import StaggerAnimator from "../components/StaggerAnimator";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

import { LexicalBlock } from "@/types";

const Page = async () => {
  const { docs } = await payload.find({
    collection: "webpages",
    where: {
      name: {
        equals: "Projects",
      },
    },
  });

  const title = docs ? docs[0].name : "No title";
  const copy = docs[0].intro?.root.children as LexicalBlock;
  return (
    <main className="max-w-[500px] mx-auto my-[80px]">
      <StaggerAnimator className="flex flex-col gap-40px" play>
        <ProjectsHero title={title} copy={copy} />

        <Suspense fallback={<SectionSkeletion />}>
          <ProjectsList />
        </Suspense>
      </StaggerAnimator>
    </main>
  );
};

const SectionSkeletion = () => {
  return (
    <div className=" w-full h-fit flex flex-col gap-40px">
      <section className="w-full flex flex-col gap-16px">
        <div className="h-16px bg-subtle/50 animate-pulse w-[120px]" />

        <div className="flex flex-col gap-16px h-fit w-full">
          <div className="w-full h-[34px] flex justify-between">
            <div className="flex flex-col gap-4px">
              <div className="w-[120px] h-16px bg-subtle/40 animate-pulse" />
              <div className="w-[150px] h-14px bg-subtle/40 animate-pulse" />
            </div>

            <div className="w-[60px] h-[30px] rounded-8px bg-subtle/40 animate-pulse" />
          </div>

          <div className="w-full h-[34px] flex justify-between">
            <div className="flex flex-col gap-4px">
              <div className="h-16px bg-subtle/40 animate-pulse" />
              <div className="h-14px bg-subtle/40 animate-pulse" />
            </div>

            <div className="h-[30px] bg-subtle/40 animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
