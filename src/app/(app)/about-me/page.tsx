import Text from "@/components/Text";
import Image from "next/image";
import React from "react";
import LinkButton from "@/components/LinkButton";
import AboutMeHero from "@/components/HeroSections/AboutMe";
import Sections from "@/components/AboutMe/Sections";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { Asset } from "payload-types";
const payload = await getPayloadHMR({ config });

const Page = async () => {
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      name: {
        equals: "About Me",
      },
    },
  });

  const data = docs[0];
  const profilePhoto = data.pagePhotos?.portrait as Asset;
  const coverPhoto = data.pagePhotos?.cover as Asset;

  return (
    <>
      <div className="w-full relative min-h-[130px]">
        <Image
          src={coverPhoto.url as string}
          alt={coverPhoto.alt as string}
          className="h-full rounded-12px"
          style={{
            objectFit: "cover",
          }}
          fill
        />
        <Image
          src={profilePhoto.url as string}
          alt={profilePhoto.alt as string}
          className="absolute -left-8px -bottom-24px rounded-full border-inverse border-[4px]"
          style={{
            objectFit: "fill",
          }}
          width={100}
          height={100}
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

        {data ? <AboutMeHero data={data.intro} /> : <div>Loading...</div>}
      </div>

      {data ? <Sections data={data.sections} /> : <div>Loading...</div>}
    </>
  );
};

export default Page;
