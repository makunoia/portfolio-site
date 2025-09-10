import React, {lazy, Suspense} from "react";
import Image from "next/image";
import LinksRow from "@/components/LinksRow";
import Logo from "@/assets/logo.svg";

import {
  getPageData,
  getCollection,
  getFeaturedProjects,
} from "@/lib/payload-actions";
import {LexicalBlock} from "@/app/(app)/types";
import {Project} from "payload-types";

import LinksRowSkeleton from "@/components/Skeletons/LinksRow";

import {MetadataSeed} from "@/lib/metadata";
import MainLayout from "@/app/(app)/components/MainLayout";

const AnalyticsTracker = lazy(() => import("@/components/AnalyticsTracker"));

export function generateMetadata() {
  return {
    title: `Mark Noya | Product Designer`,
    description:
      "Discover Mark Noya's design portfolio showcasing over 5 years of expertise in product design and web development. Explore innovative UI/UX solutions, engaging interfaces crafted with Figma, React, and modern web technologies. Experience a blend of creativity and technical skill in each project, reflecting the best in digital design.",
    openGraph: {
      siteName: "Mark Noya",
      title: `Mark Noya | Product Designer`,
      description:
        "Explore Mark Noya's portfolio showcasing UI/UX designs and web development expertise. With over 5 years of experience, discover projects that combine creativity and technical skill using Figma, React, and modern web technologies.",
      url: "https://www.marknoya.me",
      publishedTime: "August 2024",
      authors: ["Mark Noya"],
      locale: "en_US",
      type: "website",
    },
    ...MetadataSeed,
  };
}

const Page = async () => {
  let copy: LexicalBlock = [];
  let status: "employed" | "open" | undefined = "employed";

  // Fetch all data in parallel
  const pageData = getPageData("Home");
  const featuredProjects = getFeaturedProjects();
  const archivedProjects = getCollection({
    collection: "projects",
    sort: "-year",
    limit: 3,
    where: {
      isFeatured: {
        not_equals: true,
      },
    },
  }) as Promise<Project[]>;

  const [data, featProjects, projects] = await Promise.all([
    pageData,
    featuredProjects,
    archivedProjects,
  ]);

  if (data) {
    copy = data?.intro?.root.children as LexicalBlock;
    status = data.status as "employed" | "open";
  }

  return (
    <>
      <AnalyticsTracker page="Homepage" />

      <div className="flex justify-between px-[5%] pt-[2%]">
        <Image
          alt="Logo"
          src={Logo}
          style={{width: 45, height: "auto"}}
          priority
        />

        <Suspense fallback={<LinksRowSkeleton />}>
          <LinksRow />
        </Suspense>
      </div>

      <MainLayout
        copy={copy}
        status={status}
        featuredProjects={featProjects}
        archivedProjects={projects}
      />
    </>
  );
};

export default Page;
