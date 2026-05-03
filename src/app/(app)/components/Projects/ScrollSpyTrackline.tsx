"use client";

import {useCallback, useEffect, useState} from "react";
import {cva} from "class-variance-authority";

const tracklineVariants = cva(
  [
    "absolute bottom-[calc(100%-8px)] left-0",
    "w-[12px] rounded-bl-[8px] border border-r-0 border-t-0",
    "border-[color:var(--trackline)]",
    "pointer-events-none",
    "transition-[border-color] duration-300 ease-in-out",
    "mix-blend-normal dark:mix-blend-lighten",
    "z-[1]",
  ].join(" "),
  {
    variants: {
      hovered: {
        true: "border-[color:var(--trackline-hover)] z-[2]",
        false: "",
      },
      active: {
        true: "border-[color:var(--trackline-active)] z-[3]",
        false: "",
      },
    },
    defaultVariants: {
      hovered: false,
      active: false,
    },
  }
);

const ScrollSpyTrackline = ({
  hoveredItemIndex,
  activeItemIndex,
  index,
  parentID,
  childID,
}: {
  hoveredItemIndex: number | undefined;
  activeItemIndex: number | undefined;
  index: number;
  parentID: string;
  childID: string;
}) => {
  const [tracklineHeight, setTracklineHeight] = useState(0);

  const measureHeight = useCallback(() => {
    const parent = document.getElementById(parentID);
    const child = document.getElementById(childID);
    if (!parent || !child) return;
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    setTracklineHeight(childRect.bottom - parentRect.top - childRect.height * 0.5);
  }, [parentID, childID]);

  useEffect(() => {
    measureHeight();
    const parent = document.getElementById(parentID);
    if (!parent || typeof ResizeObserver === "undefined") return;
    let raf: number;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measureHeight);
    });
    observer.observe(parent);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [measureHeight, parentID]);

  return (
    <div
      className={tracklineVariants({
        hovered: hoveredItemIndex === index,
        active: activeItemIndex === index,
      })}
      style={{
        height: tracklineHeight,
      }}
    />
  );
};

export default ScrollSpyTrackline;
