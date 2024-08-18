import React, { Suspense } from "react";
import Image from "next/image";
import FeaturedProjects from "@/components/Home/FeaturedProjects/Server";
import LinksRow from "@/components/LinksRow";
import Logo from "./assets/logo.svg";
import Section from "@/components/Home/Section";
import HeroSection from "@/components/HeroSections/Home";

import { TimerContextProvider } from "./contexts/TimerContext";
import HomeListSkeleton from "@/components/Skeletons/HomeList";
import FeatuedProjectsSkeleton from "@/components/Skeletons/FeaturedProjects";
import LinksRowSkeleton from "@/components/Skeletons/LinksRow";

// FINAL SET OF TO DO
// ✅ Home page hero: Status
// ✅ Automate Last Updated text
// ✅ About Me: Cover Photo and Photo
// ✅ Migrate to 'Page' from 'Webpage'
// ✅ Stored components in proper folders
// ✅ Locked Projects: Codename and Password
// ✅ Projects and Journal Page: List Items Hover Interaction
// ✅ Removed `force-dynamic` and `revalidate`
// ✅ Enter animation Projects Item
// ✅ Archived Project Design
// ✅ Locked Project Page Screen
// ✅ Resume button
// ✅ Website favicon
// ✅ Project page: Scroll spy responsiveness fix
// ✅ Showcase multiple images
// ✅ Image reveal slider
// ✅ Project Page loader
// ✅ Duplicate HTML ID
// ✅ Margin top spy-item

// Create Content
// ✅ Featured Project: AppendPay
// ✅ Featured Project: Multiverse
// ✅ Featured Project: NBI Clearance
// ✅ Archived Project: Multistore
// ✅ Archived Project: Dingdong
// ✅ Archived Project: New World Carpets
// ✅ Archived Project: Eventful

// ✅ About Me: Intro
// ✅ About Me: Work History
// ✅ About Me: Checklist
// ✅ About Me: Tools
// ✅ About Me: Catching up on

// RELEASE FIXES:
// ✅ Email Setup: hi@marknoya.me
// 🛑 Project page: 404 redirect (there's an issue with grouped routes preventing not-found.tsx to work properly)
// ✅ Project page pagination order
// ✅ This site uses cookies
// ✅ Journal loading
// ✅ Pages Metadata
// OG Image

// Weekly entries
// Journal Entry: Reinventing Myself
// Journal Entry: Thoughts (Notion, Jira, Atlas)
// Journal Entry: Road to Design Engineer
// Journal Entry: PayloadCMS + NextJS = Portfolio
// Journal Entry: Carlos Yulo Gold (Preparation and Success)
// Building Performant apps

// RND
// Optimize Speed (Should have RND on this)
// Optimization: useTransition and useOptimistic RND
// Memozation of data to increase speed

// Nice to haves
// Project page: Contributors with links to their linkedIn or portfolio
// Light/Dark Mode trigger with icon animation
// Color picker for Featured Projects
// About Me: Piano Cover
// Loading Lottie for Journal Content
// Journal Full Screen
// Rotate to location - Footer Globe Interaction
// Animated lock opening
// Enhance image reveal slider

const Page = () => {
  return (
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

      <TimerContextProvider>
        <Suspense fallback={<FeatuedProjectsSkeleton />}>
          <FeaturedProjects />
        </Suspense>
      </TimerContextProvider>

      <Suspense fallback={<HomeListSkeleton />}>
        <Section
          title="Archive"
          collection="projects"
          link="/projects"
          sort="-year"
          where={{
            isFeatured: {
              not_equals: true,
            },
          }}
        />
      </Suspense>

      <Suspense fallback={<HomeListSkeleton />}>
        <Section
          title="Journal"
          collection="journal-entries"
          link="/journal"
          sort="-createdAt"
        />
      </Suspense>
    </main>
  );
};

export default Page;
