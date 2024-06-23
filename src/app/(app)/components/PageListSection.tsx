import React from "react";
import Text from "./Text";
import SectionDivider from "./SectionDivider";

type PageListSectionProps = {
  header: string;
  data: { label: string; desc: string; tag: string }[];
};

type ListItemProps = {
  label: string;
  desc: string;
  tag: string;
};

const PageListSection = ({ header, data }: PageListSectionProps) => {
  return (
    <div className="flex flex-col gap-16px">
      <SectionDivider header={header} />
      <div className="flex flex-col gap-16px">
        {data.map(({ label, desc, tag }) => (
          <ListItem key={label} label={label} desc={desc} tag={tag} />
        ))}
      </div>
    </div>
  );
};

const ListItem = ({ label, desc, tag }: ListItemProps) => {
  return (
    <div className="flex flex-row justify-between cursor-pointer">
      <div className="flex flex-col gap-4px">
        <Text size="body">{label}</Text>
        <Text size="caption" className="text-subtle">
          {desc}
        </Text>
      </div>
      <div className="flex items-center rounded-10px bg-subtle/40 px-10px py-2px">
        <Text size="caption" className="text-subtle text-nowrap">
          {tag}
        </Text>
      </div>
    </div>
  );
};

export default PageListSection;
