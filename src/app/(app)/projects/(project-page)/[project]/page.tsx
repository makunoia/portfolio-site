import { getProject } from "@/lib/payload-actions";
import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";

import dynamic from "next/dynamic";
const Content = dynamic(() => import("@/components/Projects/Page/Content"), {
  loading: () => <ProjectPageSkeleton />,
});

const Page = async ({ params }: { params: { project: string } }) => {
  const projectData = await getProject(params.project);
  return projectData && <Content project={projectData} />;
};

export default Page;
