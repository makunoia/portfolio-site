import React, { Suspense } from "react";
import Image from "next/image";
import Text from "@/components/Text";
import StatusBadge from "@/components/StatusBadge";
import FeaturedProjects from "@/components/Home/FeaturedProjects/Server";
import LinkButton from "@/components/LinkButton";
import Logo from "./assets/logo.svg";
import Section from "./components/Home/Section";

// TODO
// Finish Footer Design
// Code component
// Modify Status Indicator Ping
// Add Project Page pagination
// Page transitions
// Home Page Featured Projects component
// Journal Item on view animation
// Use Payload to retrieve data

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
        <div className="flex flex-col gap-24px">
          <Text as="h1" size="heading" weight="normal" className="w-4/5">
            Product Designer with four years of working on enterprise apps.
            Passionate about design systems and loves building just for the fun
            of it
          </Text>
          <StatusBadge />
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-[6.25rem]">
        <FeaturedProjects />
        <Section title="Archive" collection="projects" link="/projects" />
        <Section title="Journal" collection="journal-entries" link="/journal" />
      </div>
    </main>
  );
};

export default Page;
