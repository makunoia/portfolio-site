"use client";
import { handleMouseEvents } from "@/helpers";
import Text from "../Text";
import Link from "next/link";

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
    <Link
      href={`projects/${slug}`}
      as={`projects/${slug}`}
      className="page-list-item transition-opacity duration-300 ease-in-out"
      onMouseEnter={handleMouseEvents}
      onMouseLeave={handleMouseEvents}
      prefetch
    >
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

export default ProjectItem;
