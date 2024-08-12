"use client";
import { handleMouseEvents } from "@/helpers";
import Text from "../Text";
import Link from "next/link";
import { Lock } from "lucide-react";

const ProjectItem = ({
  title,
  desc,
  tag,
  slug,
  locked,
  codename,
}: {
  title: string;
  desc: string;
  tag: string;
  slug: string;
  locked: boolean;
} & (
  | { locked: true; codename: string }
  | { locked: false; codename?: undefined }
)) => {
  return (
    <Link
      href={`projects/${slug}`}
      as={`projects/${slug}`}
      className="page-list-item transition-opacity duration-300 ease-in-out"
      onMouseEnter={handleMouseEvents}
      onMouseLeave={handleMouseEvents}
    >
      <div className="flex flex-row gap-24px justify-between items-center cursor-pointer">
        <div className="flex flex-col gap-4px">
          <div className="flex gap-4px">
            <Text size="body">{locked ? codename : title}</Text>
            {locked && <Lock size={14} className="text" />}
          </div>
          <Text size="caption" className="text-subtle" multiline>
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
