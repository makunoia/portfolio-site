import React from "react";
import Text from "./Text";
import Link from "next/link";
import SectionDivider from "./SectionDivider";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

import { Project } from "payload-types";
import { GroupByYear } from "@/helpers";
import { ProjectsByYear } from "@/types";

const payload = await getPayloadHMR({ config });

const getAllProjectsByYear = async () => {
  const req = await payload.find({
    collection: "projects",
    sort: "year",
  });

  const projects: Project[] = req.docs;

  const AllProjectsByYear = GroupByYear(projects, "projects") as ProjectsByYear;

  return AllProjectsByYear;
};

const ProjectsList = async () => {
  const AllProjectsByYear = await getAllProjectsByYear();

  return AllProjectsByYear.map((item) => {
    return (
      <div className="flex flex-col gap-16px">
        <SectionDivider header={item.year} />
        <div className="flex flex-col gap-16px">
          {item.projects.length
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
        </div>
      </div>
    );
  });
};

const ProjectItem = ({
  title,
  desc,
  tag,
  slug,
}: {
  title: string;
  desc: string;
  tag: string;
  slug: string;
}) => {
  return (
    <Link href={`projects/${slug}`} prefetch>
      <div className="flex flex-row justify-between cursor-pointer">
        <div className="flex flex-col gap-4px">
          <Text size="body">{title}</Text>
          <Text size="caption" className="text-subtle">
            {desc}
          </Text>
        </div>
        <div className="flex h-fit items-center rounded-10px bg-subtle/40 px-10px py-8px">
          <Text size="caption" className="text-subtle text-nowrap">
            {tag}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default ProjectsList;
