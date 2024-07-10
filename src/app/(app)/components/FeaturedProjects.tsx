"use client";
import React, { useEffect, useMemo, useState } from "react";
import Text from "./Text";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type FeaturedProjectType = {
  title: string;
  desc: string;
  slug: string;
  image: string;
  gradient: { start: string; end: string };
  active?: boolean;
};

const featuredProjects: FeaturedProjectType[] = [
  {
    title: "AppendPay",
    desc: "An eFinance app for senior citizens",
    slug: "project-item-one",
    image: "https://assets.marknoya.me/Prototype.png",
    gradient: { start: "red", end: "blue" },
  },
  {
    title: "Multiverse UI",
    desc: "Our own design system at work",
    slug: "project-item-two",
    image: "https://assets.marknoya.me/UX%20Testing.png",
    gradient: { start: "purple", end: "yellow" },
  },
  {
    title: "Stark UI",
    desc: "My personal design system",
    slug: "project-item-three",
    image: "https://assets.marknoya.me/Code.jpeg",
    gradient: { start: "green", end: "orange" },
  },
];

const FeaturedProjects = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [link, setLink] = useState<string>("");
  const style = cva([
    "w-full h-[240px] sm:h-[290px]",
    "relative group cursor-pointer",
    "flex flex-row place-content-end",
    "rounded-4px sm:rounded-12px bg-subtle/20 overflow-hidden",
    "hover:shadow-lg outline outline-neutral-100/0 hover:outline-neutral-400",
    "transition-all ease-in duration-300",
  ]);

  const imageContainer = cva([
    "absolute left-0px -z-10",
    "h-full w-full sm:w-[60%]",
  ]);

  const imageStyle = cva([
    "w-full h-[220px]",
    "sm:w-[400px] sm:h-[250px]",
    "absolute left-0px sm:left-24px -bottom-8px",
    "overflow-visible ",
  ]);

  const infoStyle = cva([
    "relative",
    "flex flex-col justify-end gap-12px",
    "p-16px sm:p-24px sm:pl-0px",
    "w-full sm:w-[50%]",
  ]);

  useEffect(() => {
    setLink(featuredProjects[activeIndex].slug);
  }, [activeIndex]);

  const PreviousItem = () => {
    if (activeIndex === 0) {
      setActiveIndex(featuredProjects.length - 1);
    } else setActiveIndex((curr) => --curr);
  };

  const NextItem = () => {
    if (activeIndex === featuredProjects.length - 1) {
      setActiveIndex(0);
    } else setActiveIndex((curr) => ++curr);
  };

  return (
    <>
      <div className="flex flex-row w-full justify-between">
        <Text as="h2" size="lead">
          Latest Projects
        </Text>
        <div className="flex flex-row gap-4px">
          <ChevronLeft
            onClick={() => PreviousItem()}
            className="text-subtle/40 hover:text cursor-pointer duration-150 transition-colors ease-in-out"
          />
          <ChevronRight
            onClick={() => NextItem()}
            className="text-subtle/40 hover:text cursor-pointer duration-150 transition-colors ease-in-out"
          />
        </div>
      </div>

      <Link href={`/projects/${link}`} prefetch className={style()}>
        <div className={imageContainer()}>
          <AnimatePresence mode="sync">
            {featuredProjects.map(
              (project, i) =>
                activeIndex === i && (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, translateY: 40 }}
                    animate={{
                      opacity: 1,
                      translateY: 0,
                      transition: { ease: "easeInOut", duration: 0.6 },
                    }}
                    exit={{
                      opacity: 0,
                      translateY: -40,
                      transition: { ease: "easeInOut" },
                    }}
                    className={imageStyle()}
                  >
                    <Image
                      className="select-none"
                      src={project.image}
                      alt="Prototype preview"
                      style={{ objectFit: "contain" }}
                      sizes="400px"
                      priority
                      fill
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>

          <AnimatePresence>
            {featuredProjects.map(
              (project, i) =>
                activeIndex === i && (
                  <BackgroundLight
                    key={project.slug}
                    gradient={project.gradient}
                  />
                )
            )}
          </AnimatePresence>
        </div>

        <div className={infoStyle()}>
          <ArrowButton />
          <AnimatePresence mode="wait">
            {featuredProjects.map(
              (project, i) =>
                activeIndex === i && (
                  <motion.div
                    layoutId={`project-info-${project.slug}`}
                    key={project.slug}
                    initial={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{
                      opacity: 0,
                      translateY: -40,
                      transition: { ease: "easeInOut" },
                    }}
                    transition={{
                      ease: "easeOut",
                    }}
                    className="flex flex-col gap-4px w-full"
                  >
                    <Text as="h3" size="body-large" weight="medium">
                      {project.title}
                    </Text>
                    <Text
                      className="text-subtle"
                      as="p"
                      size="caption"
                      multiline
                    >
                      {project.desc}
                    </Text>
                  </motion.div>
                )
            )}
          </AnimatePresence>
          <TextOverlayBG />
        </div>
        <ProgressBar />
      </Link>
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
    "absolute -bottom-[50px] -right-[60px] -z-10",
    "bg-gradient-to-r from-neutral-100 to-neutral-100/80",
    "blur-[50px]",
  ]);

  return <div className={styles()}></div>;
};

const BackgroundLight = ({
  gradient,
}: {
  gradient: { start: string; end: string };
}) => {
  const styles = cva([
    "w-[400px] h-[400px] rounded-full",
    "absolute -left-[20%] -top-[20%] -z-10",
    "transition-colors ease-in-out duration-1000",
    "opacity-40 blur-[90px]",
  ]);

  const gradientStyle = {
    background: `linear-gradient(125deg, ${gradient.start} 50%, ${gradient.end} 0%)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { ease: "easeInOut", duration: 0.4 } }}
      className={styles()}
      style={gradientStyle}
    ></motion.div>
  );
};

export default FeaturedProjects;
