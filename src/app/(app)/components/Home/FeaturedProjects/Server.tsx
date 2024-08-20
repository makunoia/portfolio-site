import FeaturedProjectsClient from "./Client";
import { getFeaturedProjects } from "@/app/(app)/lib/actions";

const FeaturedProjects = async () => {
  const projects = await getFeaturedProjects();

  return <FeaturedProjectsClient projects={projects} />;
};

export default FeaturedProjects;
