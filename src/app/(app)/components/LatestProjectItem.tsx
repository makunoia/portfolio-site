import React from "react";
import Text from "./Text";
type LatestProjectItemType = {
  title: string;
  type: string;
  active?: boolean;
};

const LatestProjectItem = ({ title, type, active }: LatestProjectItemType) => {
  return (
    <div
      className={`${
        active
          ? "opacity-100"
          : "opacity-20 hover:pl-4 hover:bg-subtle hover:opacity-100"
      } flex flex-row items-center gap-3 rounded-lg p-4 pl-0 transition-all duration-200 ease-out cursor-pointer`}
    >
      <Text className="text" size="body-large" weight="medium">
        {title}
      </Text>
      <Text className="text-subtle" size="body" weight="normal">
        {type}
      </Text>
    </div>
  );
};

export default LatestProjectItem;
