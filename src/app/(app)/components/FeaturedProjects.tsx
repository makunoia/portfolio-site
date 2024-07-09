import React from "react";
import Text from "./Text";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";

type FeaturedProjectType = {
  title: string;
  shortDesc: string;
  category: string;
};

const FeaturedProjects = ({ title, shortDesc }: FeaturedProjectType) => {
  const style = cva([
    "relative group cursor-pointer",
    "flex flex-row place-content-end",
    "w-full h-[250px] sm:h-[290px]",
    "rounded-4px sm:rounded-12px bg-subtle/20 overflow-hidden",
    "hover:shadow-lg outline outline-neutral-100/0 hover:outline-neutral-400",
    "transition-all ease-in duration-300",
  ]);

  const imageContainer = cva([
    "absolute left-0px -z-10",
    "h-full w-full sm:w-[60%]",
  ]);

  const imageStyle = cva([
    "w-full h-[240px]",
    "sm:w-[400px] sm:h-[250px]",
    "absolute left-0px sm:left-24px bottom-0px",
    "overflow-visible ",
  ]);

  const infoStyle = cva([
    "relative",
    "flex flex-col justify-end gap-12px",
    "p-16px sm:p-24px sm:pl-0px",
    "w-full sm:w-[50%]",
  ]);

  return (
    <>
      <div className={style()}>
        <div className={imageContainer()}>
          <div id="image" className={imageStyle()}>
            <Image
              src="https://assets.marknoya.me/Prototype.png"
              alt="Prototype preview"
              style={{ objectFit: "contain" }}
              fill
            />
          </div>
          <BackgroundLight />
        </div>

        <div className={infoStyle()}>
          <ArrowButton />
          <div className="flex flex-col gap-4px w-full">
            <Text as="h3" size="body-large" weight="medium">
              {title}
            </Text>
            <Text className="text-subtle" as="p" size="caption" multiline>
              {shortDesc}
            </Text>
          </div>
          <TextOverlayBG />
        </div>
        <ProgressBar />
      </div>
    </>
  );
};

const ProgressBar = () => {
  const styles = cva([
    "w-[20%] h-2px",
    "absolute bottom-0px left-0px z-10",
    "bg-inverse",
  ]);

  return <div className={styles()} />;
};

const ArrowButton = () => {
  const styles = cva([
    "w-fit h-fit rounded-full p-8px",
    "opacity-0 group-hover:opacity-100",
    "absolute top-24px right-24px -z-10",
    "transition-opacity ease-in-out duration-300",
    "border border-inverse text",
  ]);

  return (
    <div className={styles()}>
      <ArrowUpRight size={28} className="fill-inverse" />
    </div>
  );
};

const TextOverlayBG = () => {
  const styles = cva([
    "w-[120%] h-[60%] -rotate-12 rounded-40px",
    "absolute -bottom-[24px] -right-[16px] -z-10",
    "bg-gradient-to-r from-neutral-100 to-neutral-100/80",
    "blur-[50px]",
  ]);

  return <div className={styles()}></div>;
};

const BackgroundLight = () => {
  const styles = cva([
    "w-[400px] h-[400px] rounded-full",
    "absolute -left-[20%] -top-[20%] -z-10",
    "bg-gradient-to-bl from-neutral-900",
    "opacity-80 blur-[90px]",
  ]);

  return <div className={styles()}></div>;
};

export default FeaturedProjects;
