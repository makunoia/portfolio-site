import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { MetadataSeed } from "@/lib/metadata";
const AnalyticsTracker = dynamic(() => import("@/components/AnalyticsTracker"));

export function generateMetadata() {
  return {
    title: `About Me | Mark Noya`,
    description:
      "Explore my journey as a product designer and web developer. I'm Mark Noya, and I share insights into my work, skills, and the passion driving my projects in UI/UX design and web development.",
    openGraph: {
      title: `About Me | Mark Noya`,
      description:
        "Get to know Mark Noya, a dedicated product designer and web developer. Discover my professional background, my life's bucketlist, and personal interests",
      url: "https://www.marknoya.me/about-me",
      siteName: "Mark Noya's Design Portfolio",
      publishedTime: "August 2024",
      authors: ["Mark Noya"],
      locale: "en_US",
      type: "website",
    },
    ...MetadataSeed,
  };
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-[500px] mx-auto mt-[40px] mb-[80px] flex flex-col gap-60px">
      <AnalyticsTracker page="About Me" />
      {children}
    </main>
  );
};

export default Layout;
