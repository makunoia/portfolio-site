import React, { Suspense } from "react";
import Text from "../Text";
import LinksRow from "../LinksRow";
import Globe from "./Globe";
import FooterStatus from "@/components/Footer/TimeAndStatus";
import LinksRowSkeleton from "@/components/Skeletons/LinksRow";

const Footer = () => {
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE as string;

  return (
    <footer className="relative max-w-[700px] mx-auto h-fit flex flex-col gap-[40px] mt-60px py-40px border-t">
      <div className="flex flex-col">
        <div className="text text-body" style={{ textDecoration: "none" }}>
          Don't be an alien, say hi!
        </div>
        <Text size="lead" weight="medium">
          hi@marknoya.me
        </Text>
      </div>

      <Suspense fallback={<LinksRowSkeleton />}>
        <LinksRow />
      </Suspense>

      <div className="flex flex-col gap-30px md:flex-row md:justify-between">
        <div className="order-last md:order-first flex flex-col gap-4px justify-end">
          <div>
            <Text className="text-info">This site is a work in progress.</Text>
          </div>
          <Text className="text-subtle">{`Last updated ${buildDate}`}</Text>
        </div>

        <FooterStatus />
      </div>

      <Globe />
    </footer>
  );
};

export default Footer;
