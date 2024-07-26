import React, { Suspense } from "react";
import ProjectsList from "@/components/Projects/ProjectsList/Server";
import ProjectsHero from "../components/HeroSections/Projects";
import PageListSkeleton from "@/components/Skeletons/PageList";

const Page = () => {
  return (
    <main className="max-w-[500px] mx-auto my-[80px] flex flex-col gap-40px">
      <ProjectsHero />

      <Suspense fallback={<PageListSkeleton />}>
        <ProjectsList />
      </Suspense>
    </main>
  );
};

export default Page;
