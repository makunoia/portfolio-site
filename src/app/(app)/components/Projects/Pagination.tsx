import config from "@payload-config";
import PaginationItem from "./PaginationItem";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { GroupByYear } from "@/helpers";
import { ProjectsByYear } from "@/types";
import { Project } from "payload-types";

const getPages = async (currSlug: string) => {
  const payload = await getPayloadHMR({ config });

  const req = await payload.find({
    collection: "projects",
    sort: "-year",
  });

  const projects: Project[] = req.docs;
  const AllProjectsByYear = GroupByYear(projects) as ProjectsByYear;
  const ProjectsInOrder = AllProjectsByYear?.flatMap((item) => item?.projects);

  const currIndex = ProjectsInOrder.findIndex(
    (project) => project.slug === currSlug
  );
  const lastIndex = ProjectsInOrder.length - 1;
  const arrLength = ProjectsInOrder.length;
  const hidePagination = arrLength <= 2;

  const prevProject = ProjectsInOrder[currIndex ? currIndex - 1 : lastIndex];
  const nextProject =
    ProjectsInOrder[currIndex + 1 === arrLength ? 0 : currIndex + 1];

  return {
    prevProject: currIndex === 0 && hidePagination ? null : prevProject,
    nextProject: currIndex === lastIndex && hidePagination ? null : nextProject,
  };
};

const Pagination = async ({ currSlug }: { currSlug: string }) => {
  const pages = await getPages(currSlug);

  const { prevProject, nextProject } = pages;

  return prevProject || nextProject ? (
    <div
      className={`flex gap-24px ${
        prevProject && nextProject
          ? "justify-between"
          : !prevProject
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {prevProject ? (
        <PaginationItem
          link={`/projects/${prevProject.slug}`}
          desc="Previous"
          label={
            prevProject.locked
              ? (prevProject.codename as string)
              : prevProject.title
          }
          left
        />
      ) : null}

      {nextProject ? (
        <PaginationItem
          link={`/projects/${nextProject.slug}`}
          desc="Next"
          label={
            nextProject.locked
              ? (nextProject.codename as string)
              : nextProject.title
          }
          right
        />
      ) : null}
    </div>
  ) : null;
};

export default Pagination;
