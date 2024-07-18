import React from "react";
import Text from "./Text";
import LinkButton from "./LinkButton";
import { cva } from "class-variance-authority";

const IndicatorCVA = cva("rounded-full w-8px h-8px animate-pulse", {
  variants: {
    status: {
      dnd: "bg-danger",
      available: "bg-success",
    },
  },
});

const Footer = ({ status }: { label: string; status: "dnd" | "available" }) => {
  const IndicatorStyle = IndicatorCVA({ status });

  return (
    <footer className="max-w-[700px] mx-auto h-fit flex flex-col gap-[40px] mt-60px py-40px border-t">
      <div className="flex flex-col">
        <Text>Don't be an alien, say hi</Text>
        <Text size="lead" weight="medium">
          hi@marknoya.me
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

      <div className="flex flex-col gap-30px md:flex-row md:justify-between">
        <div className="flex flex-col items-start gap-4px">
          <div className="flex flex-row gap-4px">
            <Text weight="medium">Montreal, Canada</Text>
            <Text>9:00 PM</Text>
          </div>
          <div className="flex flex-row items-center gap-8px">
            <div className={IndicatorStyle}></div>
            <Text>Sleeping</Text>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4px">
          <Text className="text-subtle">
            This website, like I am, is a work in progress.
          </Text>
          <Text>Last updated May 21, 2024 9:00 PM</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
