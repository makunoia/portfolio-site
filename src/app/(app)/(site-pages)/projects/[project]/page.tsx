import { Suspense } from "react";
import Content from "@/components/Projects/Page/Content";
import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";

const Page = async ({ params }: { params: { project: string } }) => {
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <Content projectSlug={params.project} />
    </Suspense>
  );
};

export default Page;
