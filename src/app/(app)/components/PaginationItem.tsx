import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Text from "./Text";

const PaginationItem = ({
  label,
  desc,
  left,
  right,
}: {
  label: string;
  desc: string;
  left?: boolean;
  right?: boolean;
}) => {
  return (
    <div className="group flex gap-16px justify-between cursor-pointer">
      {left && <ChevronLeft className="text" size={16} />}
      <div
        className={`${
          left ? "items-start" : "items-end"
        } flex flex-col gap-4px`}
      >
        <Text className={`text-subtle/90 group-hover:text-subtle`}>{desc}</Text>
        <Text
          className={`text group-hover:underline ${right && "text-right"}`}
          weight="medium"
        >
          {label}
        </Text>
      </div>
      {right && <ChevronRight className="text" size={16} />}
    </div>
  );
};

export default PaginationItem;
