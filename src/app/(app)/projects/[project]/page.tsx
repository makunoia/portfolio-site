import ProjectPageSkeleton from "@/components/Skeletons/ProjectPage";
import Content from "@/components/Projects/Page/Content";
import React, { Suspense } from "react";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

import { MetadataSeed } from "@/lib/metadata";

const getProject = async (slug: string) => {
  const req = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const project = req.docs[0];

  return project;
};

export async function generateStaticParams() {
  const { docs } = await payload.find({
    collection: "projects",
  });

  const projects = docs;

  return projects.map((project) => ({
    project: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { project: string };
}) {
  const projectData = await getProject(params.project);

  return {
    title: `${projectData.title} | Mark Noya`,
    description: projectData.desc,

    openGraph: {
      title: `${projectData.title} | Mark Noya`,
      desciption: projectData.desc,
      url: `https://www.marknoya.me/projects/${projectData.slug}`,
      siteName: "Mark Noya's Design Portfolio",
      publishedTime: projectData.createdAt,
      authors: ["Mark Noya"],
      locale: "en_US",
      type: "website",
    },
    ...MetadataSeed,
  };
}

const Page = async ({ params }: { params: { project: string } }) => {
  return (
    <>
      <Suspense fallback={<ProjectPageSkeleton />}>
        <Content project={params.project} />
      </Suspense>
    </>
  );
};

export default Page;
