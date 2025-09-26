import React, {lazy, Suspense} from "react";
import ProjectsList from "@/components/Projects/ProjectsList/Server";
import ProjectsHero from "@/components/HeroSections/Projects";
import PageListSkeleton from "@/components/Skeletons/PageList";
import Text from "@/components/Text";
import AccessGateButton from "@/components/AccessGateButton";
import {MetadataSeed} from "@/lib/metadata";
import {getAllProjectsByYear} from "@/lib/payload-actions";
const AnalyticsTracker = lazy(() => import("@/components/AnalyticsTracker"));

export function generateMetadata() {
  return {
    title: `Projects | Mark Noya`,
    description:
      "Explore a curated selection of projects showcasing my expertise as a designer and developer. From innovative UI/UX designs to cutting-edge web solutions, discover how my work blends creativity with technical skill.",
    openGraph: {
      title: `Projects | Mark Noya`,
      description:
        "Explore my gallery of projects showcasing my expertise as a designer and developer. From UI/UX designs to web solutions, discover how my work combines creativity with technical skill.",
      url: "https://www.marknoya.me/projects",
      siteName: "Mark Noya's Design Portfolio",
      publishedTime: "August 2024",
      authors: ["Mark Noya"],
      locale: "en_US",
      type: "website",
    },
    ...MetadataSeed,
  };
}

const Page = async () => {
  const projects = await getAllProjectsByYear();

  return (
    <main className="max-w-[500px] mx-auto my-[80px] flex flex-col gap-40px">
      <AnalyticsTracker page="All Projects" />
      <ProjectsHero />

      <Suspense fallback={<PageListSkeleton />}>
        <ProjectsList projects={projects} />
      </Suspense>

      <section className="flex flex-col gap-16px rounded-12px border border-border-subtle bg-bg-subtle/60 p-20px">
        <div className="flex flex-col gap-8px">
          <Text size="body-large" weight="medium">
            Need an older case study?
          </Text>
          <Text size="body" className="text-fg-subtle">
            Unlock a separate archive of prior collaborations using the password
            prompt.
          </Text>
        </div>
        <AccessGateButton />
      </section>
    </main>
  );
};

export default Page;
