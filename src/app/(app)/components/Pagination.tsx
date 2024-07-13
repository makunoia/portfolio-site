import PaginationItem from "./PaginationItem";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

const getPages = async (currID: string) => {
  const payload = await getPayloadHMR({ config });

  const projects = await payload.find({
    collection: "projects",
    sort: "createdAt",
  });
  const currIndex = projects.docs.findIndex((doc) => doc.id === currID);
  const lastIndex = projects.docs.length - 1;
  const arrLength = projects.docs.length;
  const hasTwoDocs = arrLength === 2;

  const prevProject = projects.docs[currIndex ? currIndex - 1 : lastIndex];
  const nextProject =
    projects.docs[currIndex + 1 === arrLength ? 0 : currIndex + 1];

  return {
    prevProject: currIndex === 0 && hasTwoDocs ? null : prevProject,
    nextProject: currIndex === lastIndex && hasTwoDocs ? null : nextProject,
  };
};

const Pagination = async ({ currID }: { currID: string }) => {
  const pages = await getPages(currID);

  const { prevProject, nextProject } = pages;

  return (
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
          label={prevProject.title}
          left
        />
      ) : null}

      {nextProject ? (
        <PaginationItem
          link={`/projects/${nextProject.slug}`}
          desc="Next"
          label={nextProject.title}
          right
        />
      ) : null}
    </div>
  );
};

export default Pagination;
