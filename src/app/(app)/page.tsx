import React, { useContext } from "react";
import Image from "next/image";
import Text from "@/components/Text";
import StatusBadge from "@/components/StatusBadge";
import FeaturedProjects from "@/components/FeaturedProjects";
import HomeListItem from "@/components/HomeListItem";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import Logo from "./assets/logo.svg";

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
        <section
          id="latestProjects"
          className="w-full flex flex-col gap-16px justify-between"
        >
          <FeaturedProjects />
        </section>

        <section
          id="latestProjects"
          className="w-full flex flex-col gap-16px md:flex-row md:gap-0px justify-between"
        >
          <div className="titleColumn w-full md:max-w-[250px] flex flex-col flex-1">
            <Text as="h2" size="lead">
              Archive
            </Text>
          </div>
          <div className="contentColumn w-full md:max-w-[400px] flex flex-col flex-grow flex-1 gap-24px">
            <div className="flex flex-col gap-16px">
              <HomeListItem
                title="Dingdong"
                type="Product Design"
                date="2023"
              />
              <HomeListItem
                title="AppendPay"
                type="Product Design"
                date="2023"
              />
              <HomeListItem
                title="Multiverse"
                type="Product Design"
                date="2024"
              />
            </div>
            <Button label="View all" />
          </div>
        </section>

        <section
          id="latestProjects"
          className="w-full flex flex-col gap-16px md:flex-row md:gap-0px justify-between"
        >
          <div className="titleColumn w-full md:max-w-[250px] flex flex-col flex-1">
            <Text as="h2" size="lead">
              Journal
            </Text>
          </div>
          <div className="contentColumn w-full md:max-w-[400px] flex flex-col flex-grow flex-1 gap-24px">
            <div className="flex flex-col gap-16px">
              <HomeListItem title="Reinventing myself" date="Mar 8, 2023" />
              <HomeListItem
                title="Road to Design Engineering"
                date="Feb 2, 2024"
              />
              <HomeListItem
                title="What I learned from design systems"
                date="Mar 5, 2024"
              />
            </div>
            <Button label="View all" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
