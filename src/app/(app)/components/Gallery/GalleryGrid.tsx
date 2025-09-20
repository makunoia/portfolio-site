"use client";

import {useCallback, useMemo, useRef} from "react";
import Image from "next/image";
import {LazyMotion, domAnimation, m, Variants} from "motion/react";

import Text from "@/components/Text";
import {GalleryEntry} from "@/types";

type GalleryGridProps = {
  items: GalleryEntry[];
};

const containerVariants: Variants = {
  hidden: {opacity: 0, y: 20},
  visible: {opacity: 1, y: 0, transition: {staggerChildren: 0.08}},
};

const cardVariants: Variants = {
  hidden: {opacity: 0, y: 24, scale: 0.96},
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {type: "spring", stiffness: 200, damping: 28},
  },
  exit: {opacity: 0, y: 20, scale: 0.95, transition: {duration: 0.18}},
};

const overlayVariants: Variants = {
  rest: {opacity: 0},
  hover: {
    opacity: 1,
    transition: {duration: 0.3, ease: "easeOut"},
  },
};

const mediaVariants: Variants = {
  rest: {scale: 1, transition: {duration: 0.35, ease: "easeOut"}},
  hover: {scale: 1.03, transition: {duration: 0.35, ease: "easeOut"}},
};

const GalleryGrid = ({items}: GalleryGridProps) => {
  const preparedItems = useMemo(() => items ?? [], [items]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-24px"
      >
        {preparedItems.length ? (
          <div className="grid grid-cols-1 gap-16px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {preparedItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[240px] items-center justify-center rounded-16px border border-border-subtle bg-bg-subtle/40">
            <Text as="p" size="body-large" className="text-fg-subtle">
              More visuals coming soon. Check back shortly!
            </Text>
          </div>
        )}
      </m.div>
    </LazyMotion>
  );
};

const categoryLabel = {
  photo: "Photo",
  reel: "Reel",
  video: "Video",
} satisfies Record<GalleryEntry["category"], string>;

const GalleryCard = ({item}: {item: GalleryEntry}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isHorizontalMedia = useMemo(() => {
    if (item.width && item.height) {
      return item.width / item.height >= 1.35;
    }

    if (item.category !== "photo") return true;
    return false;
  }, [item.width, item.height, item.category]);

  const aspectRatio = useMemo(() => {
    if (item.width && item.height) {
      return `${item.width} / ${item.height}`;
    }

    if (item.category === "reel") return "9 / 16";
    if (item.category === "video") return "16 / 9";
    return "4 / 5";
  }, [item.category, item.width, item.height]);

  const handleMouseEnter = useCallback(() => {
    if (item.category === "photo") return;
    const node = videoRef.current;
    if (!node) return;
    node.play().catch(() => {});
  }, [item.category]);

  const handleMouseLeave = useCallback(() => {
    if (item.category === "photo") return;
    const node = videoRef.current;
    if (!node) return;
    node.pause();
    node.currentTime = 0;
  }, [item.category]);

  const body = (
    <div className="relative overflow-hidden rounded-16px border-[12px] border-white bg-white shadow-[0_12px_20px_-10px_rgba(0,0,0,0.6)] dark:border-neutral-200 dark:bg-neutral-200">
      <m.div
        variants={mediaVariants}
        initial="rest"
        animate="rest"
        className="relative"
          style={{aspectRatio}}
        >
          {item.category === "photo" ? (
            <Image
              src={item.url}
              alt={item.description || item.title}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover"
              priority={false}
            />
          ) : (
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              preload="metadata"
              poster={item.poster?.url}
              className="h-full w-full object-cover"
            >
              <source src={item.url} type={item.mimeType} />
            </video>
          )}
          <m.div
            variants={overlayVariants}
            initial="rest"
            animate="rest"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-default/85 via-transparent to-transparent"
          />
        </m.div>

        <div className="flex flex-col gap-6px p-14px">
          <Text as="h3" size="body-large" weight="medium">
            {item.title}
          </Text>
          {item.description ? (
            <Text
              as="p"
              size="body"
              multiline
              className="text-fg-subtle"
            >
              {item.description}
            </Text>
          ) : null}

          <div className="flex items-center justify-between text-caption text-fg-subtle">
            <span className="rounded-9999 bg-bg-subtle/80 px-10px py-4px uppercase tracking-wide">
              {categoryLabel[item.category]}
            </span>
            {item.externalUrl ? (
              <span className="text-fg-default/70 transition group-hover:text-fg-default">
                View ↗
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );

  const motionProps = {
    variants: cardVariants,
    initial: "hidden" as const,
    animate: "visible" as const,
    exit: "exit" as const,
    whileHover: "hover" as const,
    whileTap: {scale: 0.97},
    className: `group block ${
      isHorizontalMedia ? "sm:col-span-2 lg:col-span-2 xl:col-span-2" : ""
    }`,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  if (item.externalUrl) {
    return (
      <m.a
        {...motionProps}
        href={item.externalUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        {body}
      </m.a>
    );
  }

  return <m.div {...motionProps}>{body}</m.div>;
};

export default GalleryGrid;
