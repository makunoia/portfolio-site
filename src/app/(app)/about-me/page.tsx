export const dynamic = "force-static";

import Text from "@/components/Text";
import Image from "next/image";
import React, { Suspense } from "react";
import AboutMeHero from "@/components/HeroSections/AboutMe";
import Sections from "@/components/AboutMe/Sections";
import LinksRowSkeleton from "@/components/Skeletons/LinksRow";

import { Asset } from "payload-types";
import LinksRow from "../components/LinksRow";
import { getPageData } from "@/lib/actions";

const Page = async () => {
  const data = await getPageData("About Me");

  const profilePhoto = data.pagePhotos?.portrait as Asset;
  const coverPhoto = data.pagePhotos?.cover as Asset;
  const coverImgTransformer = `https://marknoya.me/cdn-cgi/image/format=webp,width=700,fit=contain,quality=100/`;
  const profileImgTransformer = `https://marknoya.me/cdn-cgi/image/format=webp,width=300,fit=contain,quality=100/`;

  return (
    <>
      <div className="w-full relative min-h-[130px]">
        <Image
          priority
          src={`${coverImgTransformer}${coverPhoto.url as string}`}
          alt={coverPhoto.alt as string}
          className="h-full rounded-12px bg/70"
          sizes="500px"
          style={{
            objectFit: "cover",
          }}
          fill
        />
        <Image
          src={`${profileImgTransformer}${profilePhoto.url as string}`}
          alt={profilePhoto.alt as string}
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
