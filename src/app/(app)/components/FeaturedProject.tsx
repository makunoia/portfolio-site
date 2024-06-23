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
      <div className="w-full h-[230px] rounded-12px bg-subtle/20 p-24px">
        <div className="flex gap-12px sm:gap-30px flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex flex-col gap-4px">
            <Text as="h3" size="body-large" weight="medium">
              {title}
            </Text>
            <Text className="text-subtle" as="p" size="caption">
              {shortDesc}
            </Text>
          </div>
          <div className="rounded-16px h-fit border border-inverse border-solid py-8px px-12px inline-flex box-border">
            <Text className="text text-nowrap" size="caption" weight="medium">
              {category}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProject;
