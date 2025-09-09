"use client";
import {ProjectsByYear} from "@/app/(app)/types";
import SectionDivider from "../../SectionDivider";
import ProjectItem from "../ListItem";
import {m, LazyMotion, domAnimation} from "framer-motion";
import {AnimationVariants} from "@/lib/helpers";

const ProjectsList = ({projects}: {projects: ProjectsByYear}) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={AnimationVariants.section}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-40px"
      >
        {projects.map((item) => {
          return (
            <m.div
              variants={AnimationVariants.container}
              className="flex flex-col gap-16px"
              key={item.year}
            >
              <SectionDivider header={item.year} />
              <m.div className="flex flex-col gap-16px">
                {item.projects
                  ? item.projects.map((project) => {
                      const {id, title, desc, tag, slug, locked, codename} =
                        project;

                      return locked ? (
                        <ProjectItem
                          key={id}
                          title={title}
                          desc={desc}
                          tag={tag}
                          slug={slug}
                          locked={locked}
                          codename={codename}
                        />
                      ) : (
                        <ProjectItem
                          key={title}
                          title={title}
                          desc={desc}
                          tag={tag}
                          slug={slug}
                          locked={false}
                        />
                      );
                    })
                  : "No projects found"}
              </m.div>
            </m.div>
          );
        })}
      </m.div>
    </LazyMotion>
  );
};

export default ProjectsList;
