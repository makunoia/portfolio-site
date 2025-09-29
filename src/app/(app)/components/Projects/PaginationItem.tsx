import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Text from "../Text";
import Link from "next/link";

const PaginationItem = ({
  label,
  link,
  desc,
  left,
  right,
}: {
  label: string;
  link: string;
  desc: string;
  left?: boolean;
  right?: boolean;
}) => {
  return (
    <Link
      prefetch
      href={link}
      className={`group flex gap-16px cursor-pointer ${right && "self-end"}`}
    >
      {left && <ChevronLeft className="text-fg-default" size={16} />}
      <div
        className={`${
          left ? "items-start" : "items-end"
        } flex flex-col gap-4px`}
      >
        <Text className={`text-fg-subtle/90 group-hover:text-fg-subtle`}>{desc}</Text>
        <Text
          className={`text-fg-default group-hover:underline ${right && "text-right"}`}
          weight="medium"
        >
          {label}
        </Text>
      </div>
      {right && <ChevronRight className="text-fg-default" size={16} />}
    </Link>
  );
};

export default PaginationItem;
