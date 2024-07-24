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
import StaggerAnimator from "./components/StaggerAnimator";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

import { LexicalBlock } from "@/types";
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

const Page = async () => {
  const { docs } = await payload.find({
    collection: "webpages",
    where: {
      name: {
        equals: "Home",
      },
    },
  });

  const copy = docs[0].intro?.root.children as LexicalBlock;

  return (
    <main className="max-w-[700px] mx-auto py-[80px]">
      <StaggerAnimator
        className="flex flex-col gap-[60px]"
        play={copy ? true : false}
      >
        <div className="flex flex-col gap-24px transition-all ease-in-out">
          <div className="flex justify-between">
            <Image
              alt="Logo"
              src={Logo}
              style={{ width: 45, height: "auto" }}
            />

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

          <HeroSection copy={copy} />
        </div>

        <hr />

        <Suspense fallback={<FeaturedProjectsSkeleton />}>
          <FeaturedProjects />
        </Suspense>

        <Suspense fallback={<SectionSkeletion />}>
          <Section title="Archive" collection="projects" link="/projects" />
        </Suspense>

        <Suspense fallback={<SectionSkeletion />}>
          <Section
            title="Journal"
            collection="journal-entries"
            link="/journal"
          />
        </Suspense>
      </StaggerAnimator>
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
