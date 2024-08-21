export const fetchCache = "force-cache";
export const revalidate = 3600;
export const experimental_ppr = true;

import { getProject } from "@/lib/payload-actions";

import dynamic from "next/dynamic";
import Content from "@/components/Projects/Page/Content";

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
