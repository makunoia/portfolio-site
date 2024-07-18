import React from "react";
import Text from "../Text";
import { cva } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ListItemCVA = cva([
  "relative group",
  "flex flex-row justify-between items-center gap-12px",
  "transition-all duration-200 ease-out cursor-pointer",
]);

const BackgroundCVA = cva([
  "bg-subtle rounded-16px",
  "absolute -z-10 ",
  "-inset-y-[8px] -inset-x-12px",
  "opacity-0 group-hover:opacity-40",
  "transition-opacity ease-in-out duration-300 ",
]);

const ListItem = ({
  title,
  tag,
  date,
  url,
}: {
  title: string;
  tag?: string;
  date: string;
  url: string;
}) => {
  const ListItemStyle = ListItemCVA();
  const BackgroundStyle = BackgroundCVA();

  return (
    <Link href={url} className={ListItemStyle}>
      <div className="flex flex-row items-center gap-4px">
        <Text
          className="text text-nowrap overflow-hidden"
          size="body"
          multiline
          weight="medium"
        >
          {title}
        </Text>
        {tag && (
          <Text className="text-subtle text-nowrap" size="body" weight="normal">
            {tag}
          </Text>
        )}
        <ArrowUpRight
          size={18}
          strokeWidth={1}
          className="min-w-18px transition-colors ease-in-out duration-150 stroke-neutral-700 group-hover:stroke-neutral-1100"
        />
      </div>
      <hr className="" />
      <Text
        className="hidden sm:inline-block text-subtle text-nowrap"
        size="body"
        weight="normal"
      >
        {date}
      </Text>
      <div className={BackgroundStyle} />
    </Link>
  );
};

export default ListItem;
