import React from "react";
import Text from "../Text";
import {cva} from "class-variance-authority";
import {ArrowUpRight, Lock} from "lucide-react";
import Link from "next/link";
import AccessGateButton from "@/components/AccessGateButton";

const ListItemCVA = cva([
  "w-full relative group",
  "flex flex-row justify-between items-center gap-12px",
  "transition-all duration-200 ease-out cursor-pointer",
]);

const BackgroundCVA = cva([
  "bg-bg-subtle rounded-16px",
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
  locked,
  codename,
}: {
  title: string;
  tag?: string;
  date: string;
  url: string;
} & (
  | {locked: true; codename: string}
  | {locked: false; codename?: undefined}
)) => {
  const ListItemStyle = ListItemCVA();
  const BackgroundStyle = BackgroundCVA();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  const content = (
    <>
      <div className="flex flex-row items-center gap-4px">
        <Text
          className="text-fg-default text-nowrap overflow-hidden text-ellipsis max-w-[200px]"
          weight="medium"
          size="body"
        >
          {locked ? codename : title}
        </Text>
        {locked && <Lock size={14} className="text-fg-default" />}
        {tag && (
          <Text
            className="text-fg-subtle text-nowrap"
            size="body"
            weight="normal"
          >
            {tag}
          </Text>
        )}
        <ArrowUpRight
          size={18}
          strokeWidth={1}
          className="min-w-18px transition-colors ease-in-out duration-150 stroke-neutral-700 group-hover:stroke-neutral-1100"
        />
      </div>
      <hr />
      <Text
        className="hidden sm:inline-block text-fg-subtle text-nowrap"
        size="body"
        weight="normal"
      >
        {date}
      </Text>
      <div className={BackgroundStyle} />
    </>
  );

  if (locked) {
    return (
      <AccessGateButton
        title={codename || title}
        description="Enter the shared password to view this project."
        redirectPath={url}
        trigger={
          <div
            className={ListItemStyle}
            role="button"
            tabIndex={0}
            aria-label={`Unlock ${title}`}
            onKeyDown={handleKeyDown}
          >
            {content}
          </div>
        }
      />
    );
  }

  return (
    <Link prefetch href={url} className={ListItemStyle}>
      {content}
    </Link>
  );
};

export default ListItem;
