"use client";
import React, { useContext, useEffect } from "react";
import InViewContext from "../contexts/InViewContext";

type ContentType = {
  id: string;
  parts?: {
    id: string;
  }[];
}[];

const ContentObserver = ({ content }: { content: ContentType }) => {
  const { inView, setInView } = useContext(InViewContext);

  const ContentCallback = (entries: any) => {
    entries.forEach((entry: any) => {
      if (!entry.isIntersecting) {
        setInView({ section: "", part: "" });
      }
    });
  };

  const SectionCallback = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setInView((curr) => ({ section: entry.target.id, part: curr.part }));
      }
    });
  };

  const PartCallback = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setInView((curr) => ({
          section: curr.section,
          part: entry.target.id,
        }));
      }
    });
  };

  const ObserverConfig = {
    root: null,
    rootMargin: "-10% 0px -80% 0px",
  };

  useEffect(() => {
    const ContentObserver = new IntersectionObserver(
      ContentCallback,
      ObserverConfig
    );

    const SectionObserver = new IntersectionObserver(
      SectionCallback,
      ObserverConfig
    );

    const PartObserver = new IntersectionObserver(PartCallback, ObserverConfig);

    const allIDs = content.map((section) => {
      return {
        id: section.id,
        parts: section.parts?.map((part) => part.id) ?? [],
      };
    });

    ContentObserver.observe(
      document.getElementById("page-content") as HTMLElement
    );
    allIDs.forEach((section) => {
      SectionObserver.observe(document.getElementById(section.id) as Element);

      section.parts.forEach((part) =>
        PartObserver.observe(document.getElementById(part) as Element)
      );
    });
  }, [content]);

  useEffect(() => console.log("InView", inView), [inView]);

  return <div id="observer"></div>;
};

export default ContentObserver;
