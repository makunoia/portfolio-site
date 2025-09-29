import React, {lazy, Suspense} from "react";

import GalleryPage from "@/components/Gallery/GalleryPage";
import {getGalleryItems} from "@/lib/payload-actions";
import {MetadataSeed} from "@/lib/metadata";

const AnalyticsTracker = lazy(() => import("@/components/AnalyticsTracker"));

export function generateMetadata() {
  return {
    title: `Gallery | Mark Noya`,
    description:
      "Explore a curated gallery of photos, reels, and videos documenting Mark Noya's creative process and visual experiments.",
    openGraph: {
      title: `Gallery | Mark Noya`,
      description:
        "Dive into a living gallery of photography, reels, and videos created by Mark Noya.",
      url: "https://www.marknoya.me/gallery",
      siteName: "Mark Noya",
      type: "website",
    },
    ...MetadataSeed,
  };
}

const Page = async () => {
  const items = await getGalleryItems();

  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
        <AnalyticsTracker page="Gallery" />
      </Suspense>
      <GalleryPage items={items} />
    </main>
  );
};

export default Page;
