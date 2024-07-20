import Text from "@/components/Text";
import Image, { StaticImageData } from "next/image";
import React from "react";
import PlaceholderImage from "../assets/placeholder_img.png";
import Portrait from "../assets/portrait.jpg";
import Banner from "../assets/profile_banner.png";
import LinkButton from "@/components/LinkButton";
import { Check } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import AboutMeHero from "../components/HeroSections/AboutMe";

const Page = () => {
  return (
    <>
      <main className="max-w-[500px] mx-auto flex flex-col gap-60px mt-[40px] mb-[80px]">
        <div className="w-full relative min-h-[130px]">
          <Image
            src={Banner}
            alt="Profile Banner"
            className="h-full rounded-12px"
            fill
          />
          <Image
            src={Portrait}
            width={100}
            alt="profile_image"
            className="absolute -left-8px -bottom-24px rounded-full border-inverse border-[4px]"
          />
        </div>

        {/* Intro Section */}
        <div className="flex flex-col gap-12px">
          <div className="flex flex-col gap-0px">
            <Text as="h1" size="heading" weight="medium">
              Hi, I'm Mark
            </Text>
            <Text
              as="span"
              size="body"
              weight="normal"
              multiline
              className="text-subtle"
            >
              Nice to meet me
            </Text>
          </div>

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

          <AboutMeHero />
        </div>

        {/* Work Section */}
        <section className="flex flex-col gap-12px">
          <Text as="h3" size="body-large" weight="medium">
            I worked at
          </Text>
          <ul className="flex flex-col gap-12px">
            <GenericListItem
              // img={PlaceholderImage}
              label="Multisys Technologies Corporation"
              desc="UI/UX Designer"
              time="Present"
            />
            <GenericListItem
              // img={PlaceholderImage}
              label="Innoxcell Philippines"
              desc="Web Developer and Marketing Designer"
              time="2018 - 2019"
            />
            <GenericListItem
              // img={PlaceholderImage}
              label="Tanda"
              desc="Front-end Developer"
              time="2019"
            />
          </ul>
        </section>

        {/* Life Checklist Section */}
        <section className="flex flex-col gap-12px">
          <Text as="h3" size="body-large" weight="medium">
            Life checklist
          </Text>
          <div className="grid grid-cols-[250px_250px] gap-18px w-full">
            <CheckboxItem label="Watch Hamilton on Broadway" />
            <CheckboxItem label="Own a Tesla" />
            <CheckboxItem label="Live abroad" done />
            <CheckboxItem label="Go to Disneyland" />
            <CheckboxItem label="Meet an OG Star Wars cast" />
            <CheckboxItem label="Learn to play the piano" done />
          </div>
        </section>

        {/* Toolkit Section */}
        <section className="flex flex-col gap-12px">
          <Text as="h3" size="body-large" weight="medium">
            My Toolkit
          </Text>
          <ul className="grid grid-cols-2 gap-24px w-full">
            <ToolkitItem label="Figma" desc="UI Design and Prototyping" />
            <ToolkitItem label="Jira" desc="Work Management" />
            <ToolkitItem label="Github" desc="Version Control" />
            <ToolkitItem label="VS Code" desc="IDE" />
            <ToolkitItem label="Notion" desc="Second Brain" />
          </ul>
        </section>

        {/* Catching Up On Section */}
        <section className="flex flex-col gap-12px">
          <Text as="h3" size="body-large" weight="medium">
            Catching up on...
          </Text>
          <ul className="flex flex-col gap-12px">
            <GenericListItem
              poster
              label="One Piece"
              desc="Anime"
              time="2020"
            />
            <GenericListItem
              poster
              label="Daredevil"
              desc="Action"
              time="2018"
            />
            <GenericListItem
              poster
              label="The Acolyte"
              desc="Sci-fi"
              time="2024"
            />
          </ul>
        </section>
      </main>
    </>
  );
};

const GenericListItem = ({
  label,
  desc,
  time,
  img,
  poster,
}: {
  label: string;
  desc: string;
  time: string;
  img?: StaticImageData;
  poster?: boolean;
}) => {
  return (
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-12px">
        <div
          className={`${
            poster ? "w-[55px] h-80px" : "w-40px h-40px"
          } relative overflow-clip bg-subtle rounded-8px`}
        >
          <Image
            src={img ? img : PlaceholderImage}
            alt="Profile Banner"
            className="h-full"
            fill
            style={{
              objectFit: "cover",
            }}
            objectPosition="center"
          />
        </div>
        <div className="flex flex-col gap-4px">
          <Text as="span" size="body" weight="medium">
            {label}
          </Text>
          <Text as="span" size="caption" className="text-subtle">
            {desc}
          </Text>
        </div>
      </div>

      <Text as="span" size="caption" className="text-subtle text-nowrap">
        {time}
      </Text>
    </li>
  );
};

const CheckboxItem = ({ label, done }: { label: string; done?: boolean }) => {
  return (
    <div className="flex items-center gap-8px">
      <div className="flex items-center justify-center w-18px h-18px bg-subtle border-subtle rounded-4px">
        {done && (
          <Slot className="text-caption text">
            <Check size={12} strokeWidth={4} />
          </Slot>
        )}
      </div>
      <Text className={done ? "opacity-70 text-subtle line-through" : "text"}>
        {label}
      </Text>
    </div>
  );
};

const ToolkitItem = ({
  label,
  desc,
  img,
  poster,
}: {
  label: string;
  desc: string;
  img?: StaticImageData;
  poster?: boolean;
}) => {
  return (
    <li className="flex items-center gap-12px">
      <div
        className={`${
          poster ? "w-[55px] h-80px" : "w-40px h-40px"
        } relative overflow-clip bg-subtle rounded-8px`}
      >
        <Image
          src={img ? img : PlaceholderImage}
          alt="Profile Banner"
          className="h-full"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col gap-4px">
        <Text as="span" size="body" weight="medium">
          {label}
        </Text>
        <Text as="span" size="caption" className="text-subtle">
          {desc}
        </Text>
      </div>
    </li>
  );
};

export default Page;
