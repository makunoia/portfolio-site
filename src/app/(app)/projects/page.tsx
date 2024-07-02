"use client";
import Text from "@/components/Text";
import React from "react";
import ProjectSection from "@/components/PageListSection";
import ProjectPayload from "../sample-payload/project";
import { useState, useEffect } from "react";

// TO DO
// REVERT TO SERVER COMPONENT ONCE CMS IS INTEGRATED

const Page = () => {
  const [allProjects, setAllProjects] = useState<
    | {
        year: string;
        projects: {
          title: string;
          desc: string;
          tag: string;
          slug: string;
        }[];
      }[]
    | null
  >(null);

  useEffect(() => {
    const allYearPublished = ProjectPayload.reduce<string[]>((arr, project) => {
      const year = new Date(project.year).getFullYear().toString();
      if (!arr.includes(year)) {
        arr.push(year);
      }

      return arr;
    }, []);

    const projects = allYearPublished.map((year) => ({
      year: year,
      projects: ProjectPayload.filter((project) => {
        const yearPublished = new Date(project.year).getFullYear().toString();

        if (year === yearPublished) {
          return {
            title: project.title,
            desc: project.desc,
            tag: project.tag,
            slug: project.slug,
          };
        }
      }),
    }));

    console.log(projects);
    setAllProjects(projects);
  }, []);

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

        {allProjects?.map((project) => (
          <ProjectSection header={project.year} data={project.projects} />
        ))}
      </main>
    </>
  );
};

export default Page;
