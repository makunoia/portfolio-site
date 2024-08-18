import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Navbar from "@/components/Navbar";
import Footer from "@/app/(app)/components/Footer/Index";
import { Toaster } from "@/app/(app)/components/Sonner";

import { NeueMontreal, NeueMontrealMono } from "@/fonts";
import "./styles/globals.css";
import { MetadataSeed } from "@/lib/metadata";

export function generateMetadata() {
  return {
    title: `Mark Noya | Product Designer`,
    description:
      "Discover Mark Noya's design portfolio showcasing over 5 years of expertise in product design and web development. Explore innovative UI/UX solutions, engaging interfaces crafted with Figma, React, and modern web technologies. Experience a blend of creativity and technical skill in each project, reflecting the best in digital design.",
    openGraph: {
      title: `Mark Noya | Product Designer`,
      description:
        "Explore Mark Noya's portfolio showcasing UI/UX designs and web development expertise. With over 5 years of experience, discover projects that combine creativity and technical skill using Figma, React, and modern web technologies.",
      url: "https://www.marknoya.me",
      siteName: "Mark Noya's Design Portfolio",
      publishedTime: "August 2024",
      authors: ["Mark Noya"],
      locale: "en_US",
      type: "website",
    },
    ...MetadataSeed,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${NeueMontreal.variable} ${NeueMontrealMono.variable} bg`}
      >
        <SpeedInsights />
        <Analytics />
        <div className="absolute overflow-hidden inset-0px -z-10">
          <div className="light-streak"></div>
        </div>

        {children}

        <Navbar />
        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}
