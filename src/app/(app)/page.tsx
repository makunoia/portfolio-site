import Text from "./components/Text";
import React from "react";
import Badge from "./components/Badge";
import LatestProjectItem from "./components/LatestProjectItem";
import FeaturedProject from "./components/FeaturedProject";
import ProjectItem from "./components/ProjectItem";
import JournalEntryItem from "./components/JournalEntryItem";
import Button from "./components/Button";

const Page = () => {
  return (
    <>
      <main className="max-w-[700px] mx-auto flex flex-col gap-[60px] my-[80px]">
        <div className="flex flex-col gap-14">
          <div className="flex justify-between">
            <Text as="span" weight="bold">
              Logo
            </Text>
            <div className="flex flex-row gap-6">
              <Text as="span">LinkedIn</Text>
              <Text as="span">Resume</Text>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Text as="h1" size="heading" weight="normal">
              Product Designer with four years of working on enterprise apps.
              Passionate about design systems and loves building just for the
              fun of it
            </Text>
            <Badge label="Currently employed at Multisys" />
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-20">
          <section
            id="latestProjects"
            className="flex flex-row gap-8 w-full justify-between"
          >
            <div className="titleColumn max-w-[250px] flex flex-col gap-4 flex-1">
              <Text as="h2" size="lead">
                Latest Projects
              </Text>
              <ul className="flex flex-col">
                <LatestProjectItem
                  title="Multiverse UI"
                  type="Design System"
                  active
                />
                <LatestProjectItem title="Multistore" type="Product Design" />
                <LatestProjectItem title="Appendpay" type="Product Design" />
              </ul>
            </div>

            <div className="contentColumn max-w-[400px] flex flex-col flex-grow flex-1 gap-4">
              <FeaturedProject
                title="Multistore"
                shortDesc="An ecommerce do-it-your-self platform in the Philippines"
                category="E-Commerce"
              />
            </div>
          </section>

          <section
            id="latestProjects"
            className="flex flex-row gap-8 w-full justify-between"
          >
            <div className="titleColumn max-w-[250px] flex flex-col gap-4 flex-1">
              <Text as="h2" size="lead">
                Archive
              </Text>
            </div>
            <div className="contentColumn max-w-[400px] flex flex-col flex-grow flex-1 gap-5">
              <ProjectItem title="Dingdong" type="Product Design" year="2023" />
              <ProjectItem
                title="AppendPay"
                type="Product Design"
                year="2023"
              />
              <ProjectItem
                title="Multiverse"
                type="Product Design"
                year="2024"
              />
              <Button label="View all" />
            </div>
          </section>

          <section
            id="latestProjects"
            className="flex flex-row gap-8 w-full justify-between"
          >
            <div className="titleColumn max-w-[250px] flex flex-col gap-4 flex-1">
              <Text as="h2" size="lead">
                Journal
              </Text>
            </div>
            <div className="contentColumn max-w-[400px] flex flex-col flex-grow flex-1 gap-5">
              <JournalEntryItem title="Reinventing myself" date="Mar 8, 2023" />
              <JournalEntryItem
                title="Road to Design Engineering"
                date="Feb 2, 2024"
              />
              <JournalEntryItem
                title="What I learned from design systems"
                date="Mar 5, 2024"
              />
              <Button label="View all" />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Page;
