export const dynamic = "force-dynamic";
export const revalidate = 0;

import React, { ReactNode, Suspense } from "react";

import Text from "@/components/Text";
import JournalEntriesList from "@/components/JournalEntriesList/Server";
import JournalHero from "../components/HeroSections/Journal";

const Layout = async ({ content }: { content: ReactNode }) => {
  return (
    <>
      <main className="max-w-[500px] mx-auto flex flex-col gap-40px my-[80px]">
        <JournalHero />

        <Suspense fallback={<div className="text">Loading...</div>}>
          <JournalEntriesList content={content} />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
