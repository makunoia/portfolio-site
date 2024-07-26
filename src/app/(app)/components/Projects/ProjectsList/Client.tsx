"use client";
import { ProjectsByYear } from "@/app/(app)/types";
import SectionDivider from "../../SectionDivider";
import ProjectItem from "../ListItem";
import { motion } from "framer-motion";
import { AnimationVariants } from "@/helpers";

const ProjectsList = ({ projects }: { projects: ProjectsByYear }) => {
  return (
    <motion.div
      variants={AnimationVariants.section}
      initial="hidden"
      animate="shown"
      className="flex flex-col gap-40px"
    >
      {projects.map((item) => {
        return (
          <motion.div
            variants={AnimationVariants.container}
            className="flex flex-col gap-16px"
            key={item.year}
          >
            <SectionDivider header={item.year} />
            <motion.div className="flex flex-col gap-16px">
              {item.projects
                ? item.projects.map((project) => {
                    return (
                      <ProjectItem
                        key={project.title}
                        title={project.title}
                        desc={project.desc}
                        tag={project.tag}
                        slug={project.slug}
                      />
                    );
                  })
                : "No projects found"}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProjectsList;
