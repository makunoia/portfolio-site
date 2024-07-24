export const dynamic = "force-dynamic";
export const revalidate = 3600;

import React, { ReactNode, Suspense } from "react";
import JournalEntriesList from "@/components/JournalEntriesList/Server";
import JournalHero from "@/components/HeroSections/Journal";
import StaggerAnimator from "@/components/StaggerAnimator";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

import { LexicalBlock } from "@/types";

const Layout = async ({ content }: { content: ReactNode }) => {
  const { docs } = await payload.find({
    collection: "webpages",
    where: {
      name: {
        equals: "Journal",
      },
    },
  });

  const title = docs ? docs[0].name : "No title";
  const copy = docs[0].intro?.root.children as LexicalBlock;

  return (
    <>
      <main className="max-w-[500px] mx-auto my-[80px]">
        <StaggerAnimator className="flex flex-col gap-40px" play>
          <JournalHero title={title} copy={copy} />

          <Suspense fallback={<div className="text">Loading...</div>}>
            <JournalEntriesList content={content} />
          </Suspense>
        </StaggerAnimator>
      </main>
    </>
  );
};

export default Layout;
