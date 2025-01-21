import { Suspense } from "react";
import Content from "@/components/Projects/Page/Content";
import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";

const Page = async (props: { params: Promise<{ project: string }> }) => {
  const params = await props.params;
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <Content projectSlug={params.project} />
    </Suspense>
  );
};

export default Page;
