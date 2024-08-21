import FeatuedProjectsSkeleton from "@/components/Skeletons/FeaturedProjects";
import HomeListSkeleton from "@/components/Skeletons/HomeList";
import FeaturedProjects from "./FeaturedProjects";
import PageSection from "./Section";

import { getCollection, getFeaturedProjects } from "@/lib/payload-actions";

//Homepage sections parallel fetching
export default async () => {
  const featuredProjects = getFeaturedProjects();
  const archivedProjects = getCollection({
    collection: "projects",
    sort: "-year",
    limit: 3,
    where: {
      isFeatured: {
        not_equals: true,
      },
    },
  });
  const journalItems = getCollection({
    collection: "projects",
    sort: "-year",
    limit: 3,
    where: {
      isFeatured: {
        not_equals: true,
      },
    },
  });

  const [featProjects, projects, journalEntries] = await Promise.all([
    featuredProjects,
    archivedProjects,
    journalItems,
  ]);

  return (
    <>
      {featProjects ? (
        <FeaturedProjects projects={featProjects} />
      ) : (
        <FeatuedProjectsSkeleton />
      )}

      {projects ? (
        <PageSection title="Projects" link="/projects" items={projects} />
      ) : (
        <HomeListSkeleton />
      )}

      {journalEntries ? (
        <PageSection title="Journal" link="/journal" items={journalEntries} />
      ) : (
        <HomeListSkeleton />
      )}
    </>
  );
};
