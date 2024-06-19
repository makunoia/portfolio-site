import React from "react";
import Text from "./Text";

type FeaturedProjectType = {
  title: string;
  shortDesc: string;
  category: string;
};

const FeaturedProject = ({
  title,
  shortDesc,
  category,
}: FeaturedProjectType) => {
  return (
    <>
      {" "}
      <div className="w-full h-[230px] rounded-xl bg-inverse"></div>
      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="flex flex-col gap-1">
          <Text as="h3" size="body-large" weight="medium">
            {title}
          </Text>
          <Text className="text-subtle" as="p" size="caption">
            {shortDesc}
          </Text>
        </div>
        <div className="rounded-full h-fit border border-solid border-inverse px-3 py-2 inline-flex box-border">
          <Text className="text text-nowrap" size="body" weight="medium">
            {category}
          </Text>
        </div>
      </div>
    </>
  );
};

export default FeaturedProject;
