export const dynamic = "auto";
export const experimental_ppr = true;

import { Suspense } from "react";
import { getProject } from "@/lib/payload-actions";

import lazy from "next/dynamic";
import Content from "@/components/Projects/Page/Content";
import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";

const MixpanelTracker = lazy(() => import("@/components/MixpanelTracker"));

const Page = async ({ params }: { params: { project: string } }) => {
  const projectData = await getProject(params.project);
  return (
    <>
      <MixpanelTracker event={`Viewed ${projectData.title}`} />
      <Suspense fallback={<ProjectPageSkeleton />}>
        <Content projectSlug={params.project} />
      </Suspense>
    </>
  );
};

export default Page;
