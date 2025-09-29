import FeatuedProjectsSkeleton from "@/components/Skeletons/FeaturedProjects";
import HomeListSkeleton from "@/components/Skeletons/HomeList";
import FeaturedProjects from "./FeaturedProjects";
import PageSection from "./Section";
import {Suspense} from "react";
import {FeaturedProject} from "@/types";
import {Project} from "payload-types";
import {motion, LayoutGroup} from "motion/react";

type SectionsContainerProps = {
  featuredProjects: FeaturedProject[];
  archivedProjects: Project[];
};

//Homepage sections with data passed as props
export default ({
  featuredProjects,
  archivedProjects,
}: SectionsContainerProps) => {
  return (
    <LayoutGroup>
      <div className="flex flex-col gap-[60px]">
        <motion.div
          key="featured-projects"
          layout
          transition={{duration: 0.3, ease: "easeInOut"}}
        >
          <Suspense fallback={<FeatuedProjectsSkeleton />}>
            <FeaturedProjects projects={featuredProjects} />
          </Suspense>
        </motion.div>

        <motion.div
          key="projects-section"
          layout
          transition={{duration: 0.3, ease: "easeInOut"}}
        >
          <Suspense fallback={<HomeListSkeleton />}>
            <PageSection
              title="Projects"
              link="/projects"
              items={archivedProjects}
            />
          </Suspense>
        </motion.div>
      </div>
    </LayoutGroup>
  );
};
