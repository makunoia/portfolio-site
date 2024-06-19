import React from "react";
import Text from "./Text";
import { ArrowUpRight } from "lucide-react";

type ProjectItemProps = {
  title: string;
  type: string;
  year: string;
};

const ProjectItem = ({ title, type, year }: ProjectItemProps) => {
  return (
    <div className="relative group flex flex-row items-center gap-4 rounded-lg transition-all duration-200 ease-out cursor-pointer">
      <div className="flex flex-row items-center gap-2">
        <Text className="text text-nowrap" size="body-large" weight="medium">
          {title}
        </Text>
        <Text className="text-subtle text-nowrap" size="body" weight="normal">
          {type}
        </Text>
        <ArrowUpRight size={20} strokeWidth={1.5} color="var(--fg-default)" />
      </div>
      <hr className="border-dashed border w-full" />
      <Text
        className="text-subtle text-nowrap"
        size="body-large"
        weight="normal"
      >
        {year}
      </Text>
      <div className="absolute opacity-0 transition-opacity ease-in-out duration-600 -top-[8px] -left-[12px] -right-[12px] -bottom-[8px] bg-subtle group-hover:opacity-80 rounded-2xl -z-10" />
    </div>
  );
};

export default ProjectItem;
