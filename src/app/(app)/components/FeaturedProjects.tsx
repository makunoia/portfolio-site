"use client";
import React, { useContext, useEffect, useState } from "react";
import Text from "./Text";
import Link from "next/link";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useAnimate } from "framer-motion";
import useInterval from "../hooks/useInterval";
import { TimerContext } from "../contexts/TimerContext";

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
    image: "https://assets.marknoya.me/Code.jpeg",
    gradient: { start: "red", end: "blue" },
  },
  {
    title: "Multiverse UI",
    desc: "Our own design system at work",
    slug: "project-item-two",
    image: "https://assets.marknoya.me/file-1.png",
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
  const duration = 5000;

  const timerContext = useContext(TimerContext);
  const { resetTimer, setResetTimer } = timerContext;

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

  const imageStyle = cva(
    [
      "w-full h-[220px]",
      "sm:w-[400px] sm:h-[250px]",
      "absolute left-0px sm:left-24px -bottom-8px",
      "overflow-visible",
      "transition-all ease-in-out duration-300",
    ],
    {
      variants: {
        shown: {
          true: "opacity-1 translate-y-0px delay-200",
          false: "opacity-0 translate-y-40px",
        },
      },
    }
  );

  const infoStyle = cva([
    "relative",
    "flex flex-col justify-end gap-12px",
    "p-16px sm:p-24px sm:pl-0px",
    "w-full sm:w-[50%]",
  ]);

  useInterval(
    () => {
      setActiveIndex((prevIndex) =>
        prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
      );
    },
    duration,
    resetTimer,
    setResetTimer
  );

  useEffect(() => {
    setLink(featuredProjects[activeIndex].slug);
  }, [activeIndex]);

  const PreviousItem = () => {
    if (activeIndex === 0) {
      setActiveIndex(featuredProjects.length - 1);
    } else setActiveIndex((curr) => --curr);

    setResetTimer(true);
  };

  const NextItem = () => {
    if (activeIndex === featuredProjects.length - 1) {
      setActiveIndex(0);
    } else setActiveIndex((curr) => ++curr);

    setResetTimer(true);
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

      <Link
        prefetch
        className={style()}
        href={`/projects/${link}`}
        id="featured-projects-container"
      >
        <div className={imageContainer()}>
          {featuredProjects.map((project, i) => (
            <div
              key={project.slug}
              className={imageStyle({
                shown: activeIndex === i ? true : false,
              })}
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
            </div>
          ))}

          {featuredProjects.map((project, i) => (
            <BackgroundLight
              key={project.slug}
              gradient={project.gradient}
              shown={activeIndex === i}
            />
          ))}
        </div>

        <div className={infoStyle()}>
          <ArrowButton />

          <div className="relative bg-danger">
            {featuredProjects.map((project, i) => (
              <div
                key={project.slug}
                className={`flex flex-col gap-4px w-full absolute bottom-0px transition-all ease-in-out duration-300  ${
                  activeIndex === i
                    ? "opacity-100 translate-y-0px"
                    : "opacity-0 translate-y-40px"
                }`}
              >
                <Text as="h3" size="body-large" weight="medium">
                  {project.title}
                </Text>
                <Text className="text-subtle" as="p" size="caption" multiline>
                  {project.desc}
                </Text>
              </div>
            ))}
          </div>

          <TextOverlayBG />
        </div>
        <ProgressBar duration={duration} currIndex={activeIndex} />
      </Link>
    </>
  );
};

const ProgressBar = ({
  duration,
  currIndex,
}: {
  duration: number;
  currIndex: number;
}) => {
  const styles = cva([
    "w-0px h-2px",
    "absolute bottom-0px left-0px z-10",
    "bg-inverse",
  ]);

  const [scope, animate] = useAnimate();
  const startAnimation = async () => {
    await animate(
      scope.current,
      { width: "100%" },
      {
        duration: duration / 1000,
      }
    );
  };

  useEffect(() => {
    const animation = async () => {
      if (scope.animations.length > 0) {
        await animate(scope.current, { width: "0px" });
        startAnimation();
      } else {
        startAnimation();
      }
    };

    animation();
  }, [currIndex]);

  return <motion.div ref={scope} className={styles()} />;
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
    "w-[140%] h-[30%] sm:w-[120%] sm:h-[60%] sm:-rotate-12 rounded-40px",
    "absolute bottom-0px right-[0px] sm:-bottom-[50px] sm:-right-[60px] -z-10",
    "bg-gradient-to-r from-neutral-100 to-neutral-100/80",
    "blur-[40px] sm:blur-[50px]",
  ]);

  return <div className={styles()}></div>;
};

const BackgroundLight = ({
  gradient,
  shown,
}: {
  gradient: { start: string; end: string };
  shown: boolean;
}) => {
  const styles = cva(
    [
      "w-[400px] h-[400px] rounded-full",
      "absolute -left-[20%] -top-[20%] -z-10",
      "transition-colors ease-in-out duration-1000",
      "transition-opacity ease-in-out duration-300",
      "blur-[90px]",
    ],
    {
      variants: {
        shown: {
          true: "opacity-40",
          false: "opacity-0",
        },
      },
    }
  );

  const gradientStyle = {
    background: `linear-gradient(125deg, ${gradient.start} 50%, ${gradient.end} 0%)`,
  };

  return <div className={styles({ shown })} style={gradientStyle} />;
};

export default FeaturedProjects;
