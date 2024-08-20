export const fetchCache = "force-cache";
export const dynamicParams = true;

import dynamic from "next/dynamic";
import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";

const Content = dynamic(() => import("@/components/Projects/Page/Content"), {
  loading: () => <ProjectPageSkeleton />,
});

const Page = async ({ params }: { params: { project: string } }) => {
  return <Content project={params.project} />;
};

export default Page;
