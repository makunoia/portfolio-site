export const dynamic = "force-dynamic";
export const revalidate = 3600;

import React, { Suspense } from "react";
import ProjectsList from "@/components/ProjectsList";
import ProjectsHero from "../components/HeroSections/Projects";

const Page = () => {
  return (
    <main className="max-w-[500px] mx-auto flex flex-col gap-40px my-[80px]">
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsHero />
      </Suspense>

      <Suspense fallback={<div className="text">Loading...</div>}>
        <ProjectsList />
      </Suspense>
    </main>
  );
};

export default Page;
