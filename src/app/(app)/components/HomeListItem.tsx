import React from "react";
import Text from "./Text";
import { ArrowUpRight } from "lucide-react";
import { cva } from "class-variance-authority";

type HomeListItemProps = {
  title: string;
  type?: string;
  date: string;
};

const HomeListItemStyle = cva([
  "relative group",
  "flex flex-row justify-between items-center gap-12px",
  "transition-all duration-200 ease-out cursor-pointer",
]);

const BackgroundStyle = cva([
  "absolute opacity-0 transition-opacity ease-in-out duration-300 -top-[8px] -left-[12px] -right-[12px] -bottom-[8px] bg-subtle rounded-16px -z-10 group-hover:opacity-40",
]);

const HomeListItem = ({ title, type, date }: HomeListItemProps) => {
  const HomeListItem = HomeListItemStyle();
  const backgroundStyle = BackgroundStyle();

  return (
    <div className={HomeListItem}>
      <div className="flex flex-row items-center gap-4px">
        <Text className="text text-nowrap" size="body" weight="medium">
          {title}
        </Text>
        {type && (
          <Text className="text-subtle text-nowrap" size="body" weight="normal">
            {type}
          </Text>
        )}
        <ArrowUpRight
          size={24}
          strokeWidth={1.5}
          className="stroke-neutral-1100"
        />
      </div>
      <hr />
      <Text className="text-subtle text-nowrap" size="body" weight="normal">
        {date}
      </Text>
      <div className={backgroundStyle} />
    </div>
  );
};

export default HomeListItem;
