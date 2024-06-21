import Text from "@/components/Text";
import React from "react";
import ProjectSection from "@/components/ProjectSection";

const Page = () => {
  const allProjects = [
    {
      title: "Dingdong",
      category: "ECommerce",
      role: "Product Designer",
    },
    {
      title: "Multiverse",
      category: "Design System",
      role: "Lead",
    },
    {
      title: "Another Project",
      category: "E Governemnt",
      role: "Lead",
    },
  ];

  return (
    <>
      <main className="max-w-[500px] mx-auto flex flex-col gap-40px my-[80px]">
        <div className="flex flex-col gap-4px">
          <Text as="h1" size="heading" weight="normal">
            Projects
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

        <ProjectSection header="2024" projects={allProjects} />
        <ProjectSection header="2023" projects={allProjects} />
      </main>
    </>
  );
};

export default Page;
