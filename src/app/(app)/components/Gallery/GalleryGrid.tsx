"use client";

import {useCallback, useEffect, useMemo, useRef} from "react";
import type React from "react";
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

const mediaVariants: Variants = {
  rest: {scale: 1, transition: {duration: 0.35, ease: "easeOut"}},
  hover: {scale: 1.03, transition: {duration: 0.35, ease: "easeOut"}},
};

const GalleryGrid = ({items}: GalleryGridProps) => {
  const preparedItems = useMemo(() => {
    const arr = items ?? [];
    if (arr.length < 2) return arr;

    const photos: GalleryEntry[] = [];
    const videos: GalleryEntry[] = [];
    for (const it of arr) {
      if (it.category === "photo") photos.push(it);
      else videos.push(it);
    }

    if (videos.length <= 1) return arr;

    const segmentCount = videos.length + 1;
    const segments: GalleryEntry[][] = Array.from(
      {length: segmentCount},
      () => []
    );
    for (let i = 0; i < photos.length; i++) {
      segments[i % segmentCount].push(photos[i]);
    }

    const result: GalleryEntry[] = [];
    for (let i = 0; i < videos.length; i++) {
      result.push(...segments[i], videos[i]);
    }
    result.push(...segments[segmentCount - 1]);

    return result;
  }, [items]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-24px"
      >
        {preparedItems.length ? (
          <div className="grid grid-cols-1 gap-12px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] lg:auto-rows-[220px]">
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
  video: "Video",
} satisfies Record<GalleryEntry["category"], string>;

const GalleryCard = ({item}: {item: GalleryEntry}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const isHorizontalMedia = useMemo(() => {
    // Treat videos as non-horizontal to avoid landscape spanning
    if (item.category !== "photo") return false;
    if (item.width && item.height) {
      return item.width / item.height >= 1.35;
    }
    return false;
  }, [item.width, item.height, item.category]);

  // Determine spans based on optional renderHint, otherwise fallback to heuristics
  const {colSpan, rowSpan} = useMemo(() => {
    // Explicit hint overrides
    switch (item.renderHint) {
      case "square":
        return {colSpan: 1, rowSpan: 1};
      case "landscape":
        return {colSpan: 2, rowSpan: 1};
      case "portrait_4_5":
        return {colSpan: 1, rowSpan: 2};
      case "portrait_9_16":
        return {colSpan: 1, rowSpan: 3};
      case "auto":
      case undefined:
      case null:
      default:
        break;
    }

    // Fallback: previous behavior
    const fallbackCol = isHorizontalMedia ? 2 : 1;
    if (item.category !== "photo") {
      return {colSpan: fallbackCol, rowSpan: 2};
    }
    const id = String(item.id ?? "");
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    const fallbackRow = (hash % 2) + 1; // 1 or 2
    return {colSpan: fallbackCol, rowSpan: fallbackRow};
  }, [item.renderHint, isHorizontalMedia, item.category, item.id]);

  // Ensure videos start playing on mount to paint first frame even if poster is missing
  useEffect(() => {
    if (item.category === "photo") return;
    const node = videoRef.current;
    if (!node) return;
    node.muted = true;
    node.play().catch(() => {});
    return () => {
      try {
        node.pause();
        node.currentTime = 0;
      } catch {}
    };
    // Only depends on category to avoid replays on unrelated prop changes
  }, [item.category]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    const max = 8; // max tilt in degrees
    const rx = -(py * max);
    const ry = px * max;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  }, []);

  const onLeave = useCallback(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
  }, []);

  const sourceUrl = item.url || "";
  const isMediaAvailable = Boolean(sourceUrl);

  const body = (
    <div
      className="relative h-full overflow-hidden rounded-16px border border-border-subtle bg-bg-subtle/40 shadow-[0_8px_20px_-14px_color-mix(in_oklch,var(--shadow-default)_45%,transparent)]"
      ref={tiltRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 180ms ease-out",
      }}
    >
      <m.div
        variants={mediaVariants}
        initial="rest"
        animate="rest"
        className="relative h-full"
      >
        {isMediaAvailable ? (
          item.category === "photo" ? (
            <Image
              src={sourceUrl}
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
              autoPlay
              playsInline
              loop
              preload="auto"
              poster={item.poster?.url}
              controls={false}
              controlsList="nodownload noplaybackrate nofullscreen"
              disablePictureInPicture
              className="h-full w-full object-cover"
            >
              <source src={sourceUrl} type={item.mimeType || "video/mp4"} />
            </video>
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-subtle/60">
            <Text as="p" size="body">
              No media available
            </Text>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 dark:from-bg-default/80 dark:via-bg-default/20">
          <div className="flex flex-col gap-6px p-12px text-white drop-shadow-sm dark:text-fg-default">
            <Text as="h3" size="body-large" weight="medium">
              {item.title}
            </Text>
            {item.description ? (
              <Text
                as="p"
                size="body"
                multiline
                className="text-white/80 dark:text-fg-subtle"
              >
                {item.description}
              </Text>
            ) : null}
          </div>
        </div>
      </m.div>
    </div>
  );

  const motionProps = {
    variants: cardVariants,
    initial: "hidden" as const,
    animate: "visible" as const,
    exit: "exit" as const,
    whileHover: "hover" as const,
    whileTap: {scale: 0.98},
    className: `group block h-full ${
      colSpan > 1 ? "sm:col-span-2 lg:col-span-2 xl:col-span-2" : ""
    } ${rowSpan === 3 ? "row-span-3" : rowSpan === 2 ? "row-span-2" : "row-span-1"}`,
  };

  return <m.div {...motionProps}>{body}</m.div>;
};

export default GalleryGrid;
