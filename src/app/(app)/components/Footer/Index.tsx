import React, {Suspense} from "react";
import Text from "../Text";
import LinksRow from "../LinksRow";
import ThemeToggle from "@/app/(app)/components/ThemeToggle";

const Globe = dynamic(() => import("./Globe"));

import FooterStatus from "@/components/Footer/TimeAndStatus";
import LinksRowSkeleton from "@/components/Skeletons/LinksRow";
import dynamic from "next/dynamic";

const Footer = () => {
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE as string;

  return (
    <footer className="relative max-w-[700px] mx-auto h-fit flex flex-col gap-[40px] mt-60px py-40px border-t">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col items-start">
          <div
            className="text-fg-default text-body"
            style={{textDecoration: "none"}}
          >
            Don't be an alien, say hi!
          </div>
          <Text size="lead" weight="medium">
            hi@marknoya.me
          </Text>
        </div>

        <ThemeToggle />
      </div>

      <Suspense fallback={<LinksRowSkeleton />}>
        <LinksRow />
      </Suspense>

      <div className="flex flex-col gap-30px md:flex-row md:items-end md:justify-between">
        <div className="order-last md:order-first flex flex-col gap-4px justify-end">
          <div>
            <Text className="text-fg-info">God is a designer.</Text>
          </div>
          <Text className="text-fg-subtle">{`Last updated ${buildDate}`}</Text>
        </div>

        <FooterStatus />
      </div>

      <Globe />
    </footer>
  );
};

export default Footer;
