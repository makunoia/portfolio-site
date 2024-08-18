import React, { Suspense } from "react";
import ProjectsList from "@/components/Projects/ProjectsList/Server";
import ProjectsHero from "@/components/HeroSections/Projects";
import PageListSkeleton from "@/components/Skeletons/PageList";
import { MetadataSeed } from "@/lib/metadata";

export function generateMetadata() {
  return {
    title: `Projects | Mark Noya`,
    description:
      "Explore a curated selection of projects showcasing my expertise as a designer and developer. From innovative UI/UX designs to cutting-edge web solutions, discover how my work blends creativity with technical skill.",
    openGraph: {
      title: `Projects | Mark Noya`,
      description:
        "Explore my gallery of projects showcasing my expertise as a designer and developer. From UI/UX designs to web solutions, discover how my work combines creativity with technical skill.",
      url: "https://www.marknoya.me",
      siteName: "Mark Noya's Design Portfolio",
      publishedTime: "August 2024",
      authors: ["Mark Noya"],
    },
    ...MetadataSeed,
  };
}

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
