import React from "react";
import Text from "./Text";
import SectionDivider from "./SectionDivider";

type ProjectSectionProps = {
  header: string;
  projects: { title: string; category: string; role: string }[];
};

type ProjectItemProps = {
  title: string;
  category: string;
  role: string;
};

const ProjectSection = ({ header, projects }: ProjectSectionProps) => {
  return (
    <div className="flex flex-col gap-16px">
      <SectionDivider header={header} />
      <div className="flex flex-col gap-16px">
        {projects.map((project) => (
          <ProjectItem
            title={project.title}
            category={project.category}
            role={project.role}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectItem = ({ title, category, role }: ProjectItemProps) => {
  return (
    <div className="flex flex-row justify-between cursor-pointer">
      <div className="flex flex-col gap-4px">
        <Text size="body">{title}</Text>
        <Text size="caption" className="text-subtle">
          {category}
        </Text>
      </div>
      <div className="flex items-center rounded-10px bg-subtle/40 px-10px py-2px">
        <Text size="caption" className="text-subtle">
          {role}
        </Text>
      </div>
    </div>
  );
};

export default ProjectSection;
