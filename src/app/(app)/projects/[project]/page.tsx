export const dynamic = "force-static";
export const fetchCache = "default-cache";

import React, { Suspense } from "react";
import Content from "@/components/Projects/Page/Content";
import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";

const Page = async ({ params }: { params: { project: string } }) => {
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <Content project={params.project} />
    </Suspense>
  );
};

export default Page;
