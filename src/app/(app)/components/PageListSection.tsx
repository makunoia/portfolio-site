import React from "react";
import Text from "./Text";
import SectionDivider from "./SectionDivider";
import Link from "next/link";

type ProjectSectionProps = {
  header: string;
  data: ListItemProps[];
};

type ListItemProps = {
  title: string;
  desc: string;
  tag: string;
  slug: string;
};

const ProjectSection = ({ header, data }: ProjectSectionProps) => {
  return (
    <div className="flex flex-col gap-16px">
      <SectionDivider header={header} />
      <div className="flex flex-col gap-16px">
        {data.map(({ title, desc, tag, slug }) => (
          <ListItem
            key={title}
            title={title}
            desc={desc}
            tag={tag}
            slug={slug}
          />
        ))}
      </div>
    </div>
  );
};

const ListItem = ({ title, desc, tag, slug }: ListItemProps) => {
  return (
    <Link href={`projects/${slug}`}>
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

export default ProjectSection;
