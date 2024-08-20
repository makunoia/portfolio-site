export const fetchCache = "force-cache";
export const dynamic = "force-static";

import FeaturedProjectsClient from "./Client";
import { getFeaturedProjects } from "@/lib/payload-actions";

const FeaturedProjects = async () => {
  const projects = await getFeaturedProjects();

  return <FeaturedProjectsClient projects={projects} />;
};

export default FeaturedProjects;
