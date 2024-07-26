import React, { ReactNode, Suspense } from "react";
import JournalEntriesList from "@/components/Journal/EntriesList/Server";
import JournalHero from "@/components/HeroSections/Journal";
import PageListSkeleton from "../components/Skeletons/PageList";

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
