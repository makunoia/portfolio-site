import React from "react";
import List from "./Client";
import { getAllProjectsByYear } from "@/app/(app)/lib/actions";

const ProjectsList = async () => {
  const AllProjectsByYear = await getAllProjectsByYear();

  return AllProjectsByYear ? (
    <List projects={AllProjectsByYear} />
  ) : (
    <div className="text">No Projects found.</div>
  );
};

export default ProjectsList;
