import React from "react";
import List from "./Client";
import {ProjectsByYear} from "@/app/(app)/types";

const ProjectsList = async ({projects}: {projects: ProjectsByYear}) => {
  return projects?.length ? (
    <List projects={projects} />
  ) : (
    <div className="text-fg-default">No Projects found.</div>
  );
};

export default ProjectsList;
