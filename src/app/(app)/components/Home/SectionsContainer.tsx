import FeatuedProjectsSkeleton from "@/components/Skeletons/FeaturedProjects";
import HomeListSkeleton from "@/components/Skeletons/HomeList";
import FeaturedProjects from "./FeaturedProjects";
import PageSection from "./Section";

import { getCollection, getFeaturedProjects } from "@/lib/payload-actions";
import { Suspense } from "react";

//Homepage sections parallel fetching
export default async () => {
  const featuredProjects = getFeaturedProjects();
  const cachedArchivedProjects = await getCollection({
    collection: "projects",
    sort: "-year",
    limit: 3,
    where: {
      isFeatured: {
        not_equals: true,
      },
    },
  });

  const cachedJournalItems = await getCollection({
    collection: "journal-entries",
    sort: "-createdAt",
    limit: 3,
  });

  const [featProjects, projects, journalEntries] = await Promise.all([
    featuredProjects,
    cachedArchivedProjects,
    cachedJournalItems,
  ]);

  return (
    <>
      <Suspense fallback={<FeatuedProjectsSkeleton />}>
        <FeaturedProjects projects={featProjects} />
      </Suspense>

      <Suspense fallback={<HomeListSkeleton />}>
        <PageSection title="Projects" link="/projects" items={projects} />
      </Suspense>

      <Suspense fallback={<HomeListSkeleton />}>
        <PageSection title="Journal" link="/journal" items={journalEntries} />
      </Suspense>
    </>
  );
};
