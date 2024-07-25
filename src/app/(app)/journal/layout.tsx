export const dynamic = "force-dynamic";
export const revalidate = 3600;

import React, { ReactNode, Suspense } from "react";
import JournalEntriesList from "@/components/JournalEntriesList/Server";
import JournalHero from "@/components/HeroSections/Journal";

const Layout = ({ content }: { content: ReactNode }) => {
  return (
    <>
      <main className="max-w-[500px] mx-auto my-[80px] flex flex-col gap-40px">
        <JournalHero />

        <Suspense fallback={<div className="text">Loading...</div>}>
          <JournalEntriesList content={content} />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
