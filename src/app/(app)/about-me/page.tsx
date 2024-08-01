import Text from "@/components/Text";
import Image from "next/image";
import React from "react";
import AboutMeHero from "@/components/HeroSections/AboutMe";
import Sections from "@/components/AboutMe/Sections";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { Asset } from "payload-types";
import LinksRow from "../components/LinksRow";
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
  const coverImgTransformer = `https://marknoya.me/cdn-cgi/image/format=webp,width=700,fit=contain,quality=100/`;
  const profileImgTransformer = `https://marknoya.me/cdn-cgi/image/format=webp,width=300,fit=contain,quality=100/`;

  return (
    <>
      <div className="w-full relative min-h-[130px]">
        <Image
          src={`${coverImgTransformer}${coverPhoto.url as string}`}
          alt={coverPhoto.alt as string}
          className="h-full rounded-12px"
          sizes="500px"
          style={{
            objectFit: "cover",
          }}
          fill
        />
        <Image
          src={`${profileImgTransformer}${profilePhoto.url as string}`}
          alt={profilePhoto.alt as string}
          className="absolute -left-8px -bottom-24px rounded-full border-inverse border-[4px]"
          style={{
            objectFit: "fill",
          }}
          width={120}
          height={120}
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

        <LinksRow />

        {data ? <AboutMeHero data={data.intro} /> : <div>Loading...</div>}
      </div>

      {data ? <Sections data={data.sections} /> : <div>Loading...</div>}
    </>
  );
};

export default Page;
