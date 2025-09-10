"use client";

import {domAnimation, LazyMotion, motion, LayoutGroup} from "motion/react";
import SectionsContainer from "@/components/Home/SectionsContainer";
import HomeHero from "@/components/HeroSections/Home";
import {LexicalBlock, FeaturedProject} from "../types";
import {Project} from "payload-types";

// Homepage Main Container, Motion Layout enabled.

const MainLayout = ({
  copy,
  status,
  featuredProjects,
  archivedProjects,
}: {
  copy: LexicalBlock;
  status: "employed" | "open";
  featuredProjects: FeaturedProject[];
  archivedProjects: Project[];
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <LayoutGroup>
        <motion.main
          className="max-w-[700px] mx-auto py-[80px] flex flex-col gap-[60px]"
          layout
          transition={{duration: 0.3, ease: "easeInOut"}}
        >
          <motion.div
            key="hero-section"
            className="flex flex-col gap-30px"
            layout
            transition={{duration: 0.3, ease: "easeInOut"}}
          >
            <HomeHero copy={copy} status={status} />
          </motion.div>

          <motion.div
            key="sections-container"
            layout
            transition={{duration: 0.3, ease: "easeInOut"}}
          >
            <SectionsContainer
              featuredProjects={featuredProjects}
              archivedProjects={archivedProjects}
            />
          </motion.div>
        </motion.main>
      </LayoutGroup>
    </LazyMotion>
  );
};

export default MainLayout;
