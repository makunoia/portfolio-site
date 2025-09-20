import React from "react";
import List from "./Client";
import { getAllProjectsByYear } from "@/lib/payload-actions";

const ProjectsList = async () => {
  const AllProjectsByYear = await getAllProjectsByYear();

  return AllProjectsByYear ? (
    <List projects={AllProjectsByYear} />
  ) : (
    <div className="text-fg-default">No Projects found.</div>
  );
};

export default ProjectsList;
