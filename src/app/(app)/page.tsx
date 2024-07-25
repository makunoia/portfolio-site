export const dynamic = "force-dynamic";
export const revalidate = 3600;

import React, { Suspense } from "react";
import Image from "next/image";
import FeaturedProjects from "@/components/Home/FeaturedProjects/Server";
import LinkButton from "@/components/LinkButton";
import Logo from "./assets/logo.svg";
import Section from "./components/Home/Section";
import HeroSection from "./components/HeroSections/Home";
import Text from "./components/Text";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TimerContextProvider } from "./contexts/TimerContext";

// FINAL SET OF TO DO
// Finish Statuses: Open to Work, Activity
// Automate Last Updated text
// About Me: Cover Photo and Photo
// Migrate to 'Page' from 'Webpage'
// Locked Projects: Codename and Password
// Projects and Journal Page: List Items Hover Interaction
// Archived Project Design

// Create Content
// Featured Project: AppendPay
// Featured Project: Multiverse
// Featured Project: NBI Clearance
// Archived Project: Multistore
// Archived Project: Dingdong
// Archived Project: New World Carpets
// Archived Project: Eventful
// Journal Entry: Reinventing Myself
// Journal Entry: Thoughts (Notion, Jira, Atlas)
// Journal Entry: Road to Design Engineer
// Journal Entry: PayloadCMS + NextJS = Portfolio

// About Me: Intro
// About Me: Work History
// About Me: Checklist
// About Me: Tools
// About Me: Catching up on

// Project page: 404 redirect
// Project page: Scroll spy fix

// Light/Dark Mode trigger with icon animation
// Resume button
// Email Setup: hi@marknoya.me
// Pages Metadata
// Website favicon
// Optimize Speed (Should have RND on this)
// Memozation of data to increase speed

// Nice to haves
// Project page: Contributors with links
// Color picker for Featured Projects
// About Me: Piano Cover
// Loading Lotte for Journal Content
// Journal Full Screen
// Rotate to location - Footer Globe Interaction

const Page = () => {
  return (
    <main className="max-w-[700px] mx-auto py-[80px] flex flex-col gap-[60px]">
      <div className="flex flex-col gap-30px transition-all ease-in-out">
        <div className="flex justify-between">
          <Image alt="Logo" src={Logo} style={{ width: 45, height: "auto" }} />

          <div className="flex flex-row gap-12px">
            <LinkButton
              label="LinkedIn"
              href="https://www.linkedin.com/in/mark-noya/"
            />
            <LinkButton
              label="Resume"
              href="https://www.linkedin.com/in/mark-noya/"
            />
          </div>
        </div>

        <HeroSection />
      </div>

      <hr />

      <TimerContextProvider>
        <Suspense fallback={<FeaturedProjectsSkeleton />}>
          <FeaturedProjects />
        </Suspense>
      </TimerContextProvider>

      <Suspense fallback={<SectionSkeletion />}>
        <Section title="Archive" collection="projects" link="/projects" />
      </Suspense>

      <Suspense fallback={<SectionSkeletion />}>
        <Section title="Journal" collection="journal-entries" link="/journal" />
      </Suspense>
    </main>
  );
};

const FeaturedProjectsSkeleton = () => {
  return (
    <section
      id="latestProjects"
      className="w-full flex flex-col gap-16px justify-between"
    >
      <div className="flex flex-row w-full justify-between">
        <Text as="h2" size="lead">
          Featured Projects
        </Text>

        <div className="flex flex-row gap-4px rounded-4px sm:rounded-12px">
          <ChevronLeft className="text-subtle/40 opacity-40" />
          <ChevronRight className="text-subtle/40 opacity-40" />
        </div>
      </div>

      <div className="animate-pulse bg-subtle/60 w-full h-[240px] sm:h-[290px] rounded-4px sm:rounded-12px" />
    </section>
  );
};

const SectionSkeletion = () => {
  return (
    <section className="w-full mt-40px flex flex-col gap-16px md:flex-row md:gap-0px justify-between">
      <div className="w-full md:max-w-[250px] flex flex-col flex-1">
        <div className="h-24px bg-subtle/40 animate-pulse w-[120px]" />
      </div>
      <div className="w-full md:max-w-[400px] flex flex-col flex-grow flex-1 gap-24px">
        <div className="flex flex-col gap-16px h-fit w-full">
          <div className="h-20px bg-subtle/40 animate-pulse" />
          <div className="h-20px bg-subtle/40 animate-pulse" />
          <div className="h-20px bg-subtle/40 animate-pulse" />
          <div className="h-40px bg-subtle/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Page;
