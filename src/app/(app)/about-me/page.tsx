export const dynamic = "force-static";

import Text from "@/components/Text";
import Image from "next/image";
import React, { Suspense } from "react";
import AboutMeHero from "@/components/HeroSections/AboutMe";
import Sections from "@/components/AboutMe/Sections";
import LinksRowSkeleton from "@/components/Skeletons/LinksRow";

import { Asset } from "payload-types";
import LinksRow from "../components/LinksRow";
import { getPageData } from "@/lib/payload-actions";

const Page = async () => {
  const data = await getPageData("About Me");

  const profilePhotoSrc = data.pagePhotos?.portrait as Asset;
  const coverPhotoSrc = data.pagePhotos?.cover as Asset;

  return (
    <>
      <div className="w-full relative h-[140px]">
        <Image
          priority
          src={coverPhotoSrc?.url as string}
          alt={coverPhotoSrc.alt as string}
          quality={100}
          width={500}
          height={140}
          style={{
            objectFit: "cover",
          }}
          className="h-full rounded-12px bg/70"
        />
        <Image
          priority
          src={profilePhotoSrc.url as string}
          alt={profilePhotoSrc.alt as string}
          className="absolute -left-8px -bottom-24px rounded-full border-inverse border-[4px] bg"
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

        <Suspense fallback={<LinksRowSkeleton />}>
          <LinksRow />
        </Suspense>

        {data ? <AboutMeHero data={data.intro} /> : <div>Loading...</div>}
      </div>

      {data ? <Sections data={data.sections} /> : <div>Loading...</div>}
    </>
  );
};

export default Page;
