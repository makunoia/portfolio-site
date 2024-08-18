import React, { ReactNode, Suspense } from "react";
import JournalEntriesList from "@/components/Journal/EntriesList/Server";
import JournalHero from "@/components/HeroSections/Journal";
import PageListSkeleton from "../components/Skeletons/PageList";
import { MetadataSeed } from "@/lib/metadata";

export function generateMetadata() {
  return {
    title: `Journal | Mark Noya`,
    description:
      "Explore my journal where I share thoughts, ideas, and reflections on design, development, and more.",
    openGraph: {
      title: `Journal | Mark Noya`,
      description:
        "Explore my journal where I share thoughts, ideas, and reflections on design, development, and more.",
      url: "https://www.marknoya.me",
      siteName: "Mark Noya's Design Portfolio",
      publishedTime: "August 2024",
      authors: ["Mark Noya"],
    },
    ...MetadataSeed,
  };
}

const Layout = ({ content }: { content: ReactNode }) => {
  return (
    <>
      <main className="max-w-[500px] mx-auto my-[80px] flex flex-col gap-40px">
        <JournalHero />

        <Suspense fallback={<PageListSkeleton />}>
          <JournalEntriesList content={content} />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
