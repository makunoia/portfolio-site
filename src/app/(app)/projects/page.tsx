import Text from "@/components/Text";
import React from "react";
import ProjectSection from "@/components/PageListSection";

const Page = () => {
  const allProjects = [
    {
      label: "Dingdong",
      desc: "ECommerce",
      tag: "Product Designer",
    },
    {
      label: "Multiverse",
      desc: "Design System",
      tag: "Lead",
    },
    {
      label: "Another Project",
      desc: "E Government",
      tag: "Lead",
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
            A compilation of my creation through out my career as a designer and
            developer
          </Text>
        </div>

        <ProjectSection header="2024" data={allProjects} />
        <ProjectSection header="2023" data={allProjects} />
      </main>
    </>
  );
};

export default Page;
