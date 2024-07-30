import React, { Suspense } from "react";
import Text from "../Text";
import LinksRow from "../LinksRow";
import Globe from "./Globe";
import FooterStatus from "@/components/Footer/TimeAndStatus";

const Footer = () => {
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE as string;

  return (
    <footer className="relative max-w-[700px] mx-auto h-fit flex flex-col gap-[40px] mt-60px py-40px border-t">
      <div className="flex flex-col">
        <Text>Don't be an alien, say hi!</Text>
        <Text size="lead" weight="medium">
          hi@marknoya.me
        </Text>
      </div>

      <Suspense fallback={<div>Loading.</div>}>
        <LinksRow />
      </Suspense>

      <div className="flex flex-col gap-30px md:flex-row md:justify-between">
        <div className="order-last md:order-first flex flex-col gap-4px justify-end">
          <Text className="text-info">This site is a work in progress.</Text>
          <Text className="text-subtle">{`Last updated ${buildDate}`}</Text>
        </div>

        <FooterStatus />
      </div>

      <Globe />
    </footer>
  );
};

export default Footer;
