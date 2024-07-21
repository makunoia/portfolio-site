export const dynamic = "force-dynamic";
export const revalidate = 3600;

import React, { Suspense } from "react";
import Image from "next/image";
import FeaturedProjects from "@/components/Home/FeaturedProjects/Server";
import LinkButton from "@/components/LinkButton";
import Logo from "./assets/logo.svg";
import Section from "./components/Home/Section";
import HeroSection from "./components/HeroSections/Home";

// TODO
// Finish Footer Design
// Code component
// Modify Status Indicator Ping
// Add Project Page pagination
// Page transitions
// Home Page Featured Projects component
// Journal Item on view animation
// Use Payload to retrieve data
// Memozation of data to increase speed

const Page = () => {
  return (
    <main className="max-w-[700px] mx-auto flex flex-col gap-[60px] my-[80px]">
      <div className="flex flex-col gap-24px">
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
        <Suspense fallback={<div>Loading Skeleton</div>}>
          <HeroSection />
        </Suspense>
      </div>
      <hr />
      <div className="flex flex-col gap-[6.25rem]">
        <Suspense fallback={<div>Loading Skeleton</div>}>
          <FeaturedProjects />
        </Suspense>
        <Section title="Archive" collection="projects" link="/projects" />
        <Section title="Journal" collection="journal-entries" link="/journal" />
      </div>
    </main>
  );
};

export default Page;
