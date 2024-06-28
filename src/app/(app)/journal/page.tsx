import Text from "@/components/Text";
import React from "react";
import JournalSection from "@/components/PageListSection";
import SectionDivider from "@/components/SectionDivider";
SectionDivider;

const Page = () => {
  const allEntries = [
    {
      label: "I built my own UI library",
      desc: "Design Engineering",
      tag: "May 2, 2024",
    },
    {
      label: "Self-Accountability",
      desc: "Project Management",
      tag: "June 29, 2024",
    },
    {
      label: "How I made a check-in system for a retreat",
      desc: "Web Design and Development",
      tag: "December 2, 2023",
    },
  ];

  return (
    <>
      <main className="max-w-[500px] mx-auto flex flex-col gap-40px my-[80px]">
        <div className="flex flex-col gap-4px">
          <Text as="h1" size="heading" weight="normal">
            Journal
          </Text>
          <Text
            as="h3"
            size="body-large"
            weight="normal"
            multiline
            className="text-subtle mr-40px"
          >
            Space to share my thoughts, rants, ephiphanies and comments about
            certain things in life.
          </Text>
        </div>

        <div className="flex flex-col gap-16px">
          <SectionDivider header="2024" />
          <div className="flex flex-col gap-16px">
            {allEntries.map(({ label, desc, tag }) => (
              <JournalListItem
                key={label}
                label={label}
                desc={desc}
                tag={tag}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

type JournalListItemProps = {
  label: string;
  desc: string;
  tag: string;
};

const JournalListItem = ({ label, desc, tag }: JournalListItemProps) => {
  return (
    <div className="flex flex-row justify-between cursor-pointer">
      <div>
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
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
        recusandae repellendus harum doloribus placeat necessitatibus veritatis
        cumque odit, illum, quis deleniti id dicta assumenda qui tenetur optio
        cum voluptatem similique!
      </div>
    </div>
  );
};

export default Page;
