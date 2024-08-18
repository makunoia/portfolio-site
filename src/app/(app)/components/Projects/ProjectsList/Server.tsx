import React from "react";
import List from "./Client";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

import { Project } from "payload-types";
import { GroupByYear } from "@/helpers";
import { ProjectsByYear } from "@/types";

const payload = await getPayloadHMR({ config });

const getAllProjectsByYear = async () => {
  const req = await payload.find({
    collection: "projects",
    sort: "-year",
  });

  const projects: Project[] = req.docs;

  const AllProjectsByYear = GroupByYear(projects) as ProjectsByYear;

  return AllProjectsByYear;
};

const ProjectsList = async () => {
  const AllProjectsByYear = await getAllProjectsByYear();

  return AllProjectsByYear ? (
    <List projects={AllProjectsByYear} />
  ) : (
    <div className="text">No Projects found.</div>
  );
};

export default ProjectsList;
