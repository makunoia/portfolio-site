export const fetchCache = "force-cache";
export const experimental_ppr = true;

import { getProject } from "@/lib/payload-actions";
import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";

import dynamic from "next/dynamic";
const Content = dynamic(() => import("@/components/Projects/Page/Content"), {
  loading: () => <ProjectPageSkeleton />,
});

const MixpanelTracker = dynamic(() => import("@/components/MixpanelTracker"));

const preloadData = (project: string) => {
  void getProject(project);
};

const Page = async ({ params }: { params: { project: string } }) => {
  preloadData(params.project);
  const projectData = await getProject(params.project);
  return (
    <>
      <MixpanelTracker event={`Viewed ${projectData.title}`} />
      {projectData && <Content project={projectData} />}
    </>
  );
};

export default Page;
