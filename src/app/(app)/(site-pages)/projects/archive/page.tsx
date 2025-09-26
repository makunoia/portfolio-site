import React, {lazy, Suspense} from "react";
import ProjectsHero from "@/components/HeroSections/Projects";
import ProjectsList from "@/components/Projects/ProjectsList/Server";
import PageListSkeleton from "@/components/Skeletons/PageList";
import {MetadataSeed} from "@/lib/metadata";
import {getArchivedProjectsByYear} from "@/lib/payload-actions";

const AnalyticsTracker = lazy(() => import("@/components/AnalyticsTracker"));

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return {
    title: `Archived Projects | Mark Noya`,
    description:
      "Browse archived projects retained for historical context. These case studies capture prior explorations and shipped experiences that are no longer part of the primary portfolio.",
    openGraph: {
      title: `Archived Projects | Mark Noya`,
      description:
        "Explore archived case studies and previously featured collaborations. These projects remain available for context and reference.",
      url: "https://www.marknoya.me/projects/archive",
      siteName: "Mark Noya's Design Portfolio",
      publishedTime: "August 2024",
      authors: ["Mark Noya"],
      locale: "en_US",
      type: "website",
    },
    ...MetadataSeed,
  };
}

const ArchivedProjectsPage = async () => {
  const archivedProjects = await getArchivedProjectsByYear();

  return (
    <main className="max-w-[500px] mx-auto my-[80px] flex flex-col gap-40px">
      <AnalyticsTracker page="Archived Projects" />
      <ProjectsHero
        titleOverride="Archived Projects"
        descriptionOverride="A password-gated library of previous engagements and historical case studies."
      />

      <Suspense fallback={<PageListSkeleton />}>
        <ProjectsList projects={archivedProjects} />
      </Suspense>
    </main>
  );
};

export default ArchivedProjectsPage;
