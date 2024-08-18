"use client";

import { cn } from "@/utils";
import { useEffect, useState } from "react";

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
  const [hoverStyle, setHoverStyle] = useState<string>("");
  const [activeStyle, setActiveStyle] = useState<string>("");

  const getTracklineHeight = (parentID: string, childID: string) => {
    const parent = document.getElementById(parentID);
    const child = document.getElementById(childID);

    if (parent && child) {
      const parentRect = parent?.getBoundingClientRect();
      const childRect = child?.getBoundingClientRect();

      // Calculate the distance
      const distance =
        childRect.bottom - parentRect.top - childRect.height * 0.5;
      return distance;
    } else return 0;
  };

  const getPathHoverStyle = (i: number) => {
    if (hoveredItemIndex !== undefined) {
      return cn(hoveredItemIndex == i && "hovered");
    } else return "";
  };

  const getPathActiveStyle = (i: number) => {
    if (activeItemIndex !== undefined) {
      return cn(activeItemIndex == i && "active");
    } else return "";
  };

  useEffect(() => {
    const height = getTracklineHeight(parentID, childID);
    setTracklineHeight(height);
  }, []);

  useEffect(() => {
    const hoverStyle = getPathHoverStyle(index);
    const activeStyle = getPathActiveStyle(index);

    setHoverStyle(hoverStyle);
    setActiveStyle(activeStyle);
  }, [index]);

  return (
    <div
      className={cn(
        "trackline",
        `${getPathHoverStyle(index)}`,
        `${getPathActiveStyle(index)}`
      )}
      style={{
        height: tracklineHeight,
      }}
    />
  );
};

export default ScrollSpyTrackline;
