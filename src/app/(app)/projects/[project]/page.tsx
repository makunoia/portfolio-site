import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";
import Content from "@/components/Projects/Page/Content";
import { Suspense } from "react";

const Page = async ({ params }: { params: { project: string } }) => {
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <Content project={params.project} />;
    </Suspense>
  );
};

export default Page;
