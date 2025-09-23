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

  // Deterministic pseudo-random row span (1 or 2). Videos are forced to 2 for portrait look.
  const rowSpan = useMemo(() => {
    if (item.category !== "photo") return 2;
    const id = String(item.id ?? "");
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    return (hash % 2) + 1; // 1 or 2
  }, [item.category, item.id]);

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

  const body = (
    <div
      className="relative h-full overflow-hidden rounded-16px border border-border-subtle bg-bg-subtle/40 shadow-[0_8px_20px_-14px_color-mix(in_oklch,var(--shadow-default)_45%,transparent)]"
      ref={tiltRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{transform: "perspective(900px) rotateX(0deg) rotateY(0deg)", transition: "transform 180ms ease-out"}}
    >
      <m.div
        variants={mediaVariants}
        initial="rest"
        animate="rest"
        className="relative h-full"
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
            autoPlay
            playsInline
            loop
            preload="auto"
            poster={item.poster?.url}
            controls={false}
            controlsList="nodownload noplaybackrate nofullscreen"
            disablePictureInPicture
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          >
            <source src={item.url} type={item.mimeType || "video/mp4"} />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 dark:from-bg-default/80 dark:via-bg-default/20">
          <div className="flex flex-col gap-6px p-12px text-white drop-shadow-sm dark:text-fg-default">
            <Text as="h3" size="body-large" weight="medium">
              {item.title}
            </Text>
            {item.description ? (
              <Text as="p" size="body" multiline className="text-white/80 dark:text-fg-subtle">
                {item.description}
              </Text>
            ) : null}

            <div className="flex items-center justify-between text-caption text-white/70 dark:text-fg-subtle">
              <span className="rounded-9999 bg-white/15 px-10px py-4px uppercase tracking-wide">
                {categoryLabel[item.category]}
              </span>
              {item.externalUrl ? <span className="text-white">View ↗</span> : null}
            </div>
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
      isHorizontalMedia ? "sm:col-span-2 lg:col-span-2 xl:col-span-2" : ""
    } ${rowSpan === 2 ? "row-span-2" : "row-span-1"}`,
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
