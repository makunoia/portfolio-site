import { ReactNode } from "react";
import { getProject, getProjects } from "@/lib/actions";
import { MetadataSeed } from "@/lib/metadata";

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => {
    if (!project.isLocked) {
      return {
        project: project.slug,
      };
    }
  });
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

export default ({ children }: { children: ReactNode }) => {
  return children;
};
