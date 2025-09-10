"use client";

import React, {useCallback, useEffect, useState} from "react";
import Text from "@/components/Text";
import Link from "next/link";
import Image from "next/image";
import {cva} from "class-variance-authority";
import {FeaturedProject} from "@/types";
import {ArrowUpRight, ChevronLeft, ChevronRight} from "lucide-react";
import {m, LazyMotion, domAnimation} from "motion/react";
import {track} from "@vercel/analytics";
import {cn} from "../../lib/utils";

const style = cva([
  "w-full h-[270px] sm:h-[300px]",
  "relative group cursor-pointer",
  "flex flex-row place-content-end",
  "rounded-4px sm:rounded-12px bg-subtle/20 overflow-hidden",
  "shadow-md shadow-neutral-200/0 hover:shadow-neutral-300",
  "outline outline-neutral-100/0 hover:outline-neutral-200",
  "transition-all ease-in duration-300",
]);

const imageContainer = cva(["absolute left-0px", "h-full w-full sm:w-[60%]"]);

const imageStyle = cva(
  [
    "w-[350px] sm:w-full h-full",
    "absolute left-[50%] translate-x-[-50%] sm:left-8px sm:translate-x-0px",
    "overflow-visible",
    "transition-all ease-in-out duration-300",
  ],
  {
    variants: {
      shown: {
        true: "opacity-1 translate-y-8px delay-200",
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

const FeaturedProjects = ({projects}: {projects: FeaturedProject[]}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [link, setLink] = useState<string>("");

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const showArrowsAndBar = projects.length > 1;
  const duration = 5000;

  const GoToPreviousItem = useCallback(() => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
    setProgress(0);
  }, []);

  const GoToNextItem = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isPaused) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            GoToNextItem();
            return 0;
          }
          return oldProgress + 100 / (duration / 100);
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPaused, GoToNextItem]);

  useEffect(() => {
    projects.length
      ? setLink(projects[activeIndex].slug)
      : console.log("No projects found.");
  }, [activeIndex]);

  return (
    <section
      id="latestProjects"
      className="w-full flex flex-col gap-16px justify-between"
    >
      <div className="flex flex-row w-full justify-between">
        <Text as="h2" size="lead">
          Featured Projects
        </Text>

        {showArrowsAndBar ? (
          <div className="flex flex-row gap-4px">
            <ChevronLeft
              onClick={() => GoToPreviousItem()}
              className="text-subtle/40 hover:text cursor-pointer duration-150 transition-colors ease-in-out"
            />
            <ChevronRight
              onClick={() => GoToNextItem()}
              className="text-subtle/40 hover:text cursor-pointer duration-150 transition-colors ease-in-out"
            />
          </div>
        ) : null}
      </div>

      {projects ? (
        <Link
          prefetch
          className={style()}
          href={`/projects/${link}`}
          id="featured-projects-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => track(`Clicked Featured Project: ${link}`)}
        >
          <LazyMotion features={domAnimation}>
            <m.div
              layout
              initial={{translateY: 100, opacity: 0}}
              animate={{translateY: 0, opacity: 100}}
              transition={{type: "spring", delay: 0.3}}
              className={imageContainer()}
            >
              {projects.map((project, i) => {
                return (
                  <div
                    key={project.slug}
                    className={imageStyle({
                      shown: activeIndex === i ? true : false,
                    })}
                  >
                    <Image
                      fill
                      priority
                      quality={85}
                      sizes="80vw"
                      className="select-none"
                      src={project.featuredData.image.url}
                      alt={project.featuredData.image.alt || ""}
                      style={{objectFit: "cover", objectPosition: "top"}}
                    />
                  </div>
                );
              })}
            </m.div>
          </LazyMotion>

          {projects.map((project, i) => (
            <BackgroundLight
              key={project.slug}
              gradient={{
                start: project.featuredData.gradientStart,
                end: project.featuredData.gradientEnd,
              }}
              shown={activeIndex === i}
            />
          ))}

          <div className={infoStyle()}>
            <ArrowButton />

            <>
              {projects.map((project, i) => (
                <div
                  key={project.slug}
                  className={cn(
                    `sm:w-4/5`,
                    `flex flex-col gap-4px p-12px rounded-8px`,
                    `transition-all ease-in-out duration-300`,
                    `absolute z-20 left-8px right-8px bottom-8px sm:left-auto sm:right-8px`,
                    `bg-gradient-to-br from-neutral-100/80 to-neutral-100`,
                    `backdrop-blur-sm`,
                    `${
                      activeIndex === i
                        ? "opacity-100 translate-y-0px"
                        : "opacity-0 translate-y-40px"
                    }`
                  )}
                >
                  <Text
                    as="h3"
                    size="body-large"
                    weight="medium"
                    className="whitespace-nowrap"
                  >
                    {project.title}
                  </Text>
                  <Text className="text-subtle" as="p" size="caption" multiline>
                    {project.desc}
                  </Text>
                </div>
              ))}
            </>

            {/* <TextOverlayBG /> */}
          </div>

          {showArrowsAndBar ? <ProgressBar progress={progress} /> : null}
        </Link>
      ) : (
        <div className="text">No projects</div>
      )}
    </section>
  );
};

const ProgressBar = ({progress}: {progress: number}) => {
  const styles = cva([
    "w-0px h-2px",
    "absolute bottom-0px left-0px z-10",
    "bg-inverse",
  ]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={styles()}
        initial={{width: 0}}
        animate={{width: `${progress}%`}}
        transition={{duration: 0.1, ease: "linear"}}
      />
    </LazyMotion>
  );
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
    "w-full h-[30%] sm:w-[120%] sm:h-[120px] sm:-rotate-6 rounded-tl-24px",
    "absolute bottom-0px right-[0px] sm:-bottom-[20px] sm:-right-[30px] z-10",
    "bg-gradient-to-br from-neutral-100/20 to-neutral-100",
    "blur-[30px]",
  ]);

  return <div className={styles()} />;
};

const BackgroundLight = ({
  gradient,
  shown,
}: {
  gradient: {start: string; end: string};
  shown: boolean;
}) => {
  const styles = cva(
    [
      "w-[45%] h-full rounded-full",
      "absolute top-0px left-0px -z-10",
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

  return <div className={styles({shown})} style={gradientStyle} />;
};

export default FeaturedProjects;
