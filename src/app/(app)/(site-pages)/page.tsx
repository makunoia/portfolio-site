import React, { lazy, Suspense } from "react";
import Image from "next/image";
import LinksRow from "@/components/LinksRow";
import Logo from "../assets/logo.svg";
import HeroSection from "@/components/HeroSections/Home";

import LinksRowSkeleton from "@/components/Skeletons/LinksRow";

import { MetadataSeed } from "@/lib/metadata";
import SectionsContainer from "../components/Home/SectionsContainer";

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

const Page = () => {
  return (
    <>
      <AnalyticsTracker page="Homepage" />
      <main className="max-w-[700px] mx-auto py-[80px] flex flex-col gap-[60px]">
        <div className="flex flex-col gap-30px transition-all ease-in-out">
          <div className="flex justify-between">
            <Image
              alt="Logo"
              src={Logo}
              style={{ width: 45, height: "auto" }}
              priority
            />

            <Suspense fallback={<LinksRowSkeleton />}>
              <LinksRow />
            </Suspense>
          </div>

          <HeroSection />
        </div>

        <hr />

        <SectionsContainer />
      </main>
    </>
  );
};

export default Page;
