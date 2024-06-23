import Text from "@/components/Text";
import React from "react";
import JournalSection from "@/components/PageListSection";

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

        <JournalSection header="2024" data={allEntries} />
      </main>
    </>
  );
};

export default Page;
