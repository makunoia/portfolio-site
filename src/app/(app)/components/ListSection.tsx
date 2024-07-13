import React from "react";
import Text from "./Text";
import Link from "next/link";
import SectionDivider from "./SectionDivider";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { ProjectTag } from "payload-types";

const payload = await getPayloadHMR({ config });

const getAllProjectsByYear = async () => {
  const req = await payload.find({
    collection: "projects",
    sort: "year",
  });

  const projects = req.docs;

  const allYearPublished = projects.reduce<string[]>((arr, project) => {
    const year = project.year;
    if (!arr.includes(year)) {
      arr.push(year);
    }
    return arr;
  }, []);

  return allYearPublished.map((year) => ({
    year: year,
    projects: projects.map((project) => {
      const tag: ProjectTag = project.tag.value as ProjectTag;
      if (year === project.year) {
        return {
          title: project.title,
          desc: project.desc,
          tag: tag.name,
          slug: project.slug,
        };
      }
    }),
  }));
};

type ListSectionProps = {
  header: string;
  data?: ListItemProps[];
};

type ListItemProps = {
  title: string;
  desc: string;
  tag: string;
  slug: string;
};

const ListSection = async () => {
  const AllProjects = await getAllProjectsByYear();

  return AllProjects.map((item) => {
    return (
      <div className="flex flex-col gap-16px">
        <SectionDivider header={item.year} />
        <div className="flex flex-col gap-16px">
          {item.projects.length
            ? item.projects.map(
                (project) =>
                  project && (
                    <ListItem
                      key={project.title}
                      title={project.title}
                      desc={project.desc}
                      tag={project.tag}
                      slug={project.slug}
                    />
                  )
              )
            : "No projects found"}
        </div>
      </div>
    );
  });
};

const ListItem = ({ title, desc, tag, slug }: ListItemProps) => {
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

export default ListSection;
