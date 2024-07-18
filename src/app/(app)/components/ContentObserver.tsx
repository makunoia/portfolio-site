"use client";
import React, { useContext, useEffect } from "react";
import InViewContext from "@/contexts/InViewContext";
import { ContentType } from "@/types";

const ContentObserver = ({ content }: { content: ContentType }) => {
  const { inView, setInView } = useContext(InViewContext);

  const ContentCallback = (entries: any) => {
    entries.forEach((entry: any) => {
      if (!entry.isIntersecting) {
        setInView({ section: "", block: "" });
      }
    });
  };

  const SectionCallback = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setInView((curr) => ({
          section: entry.target.id,
          block: curr.block,
        }));
      }
    });
  };

  const BlockCallback = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setInView((curr) => ({
          section: curr.section,
          block: entry.target.id,
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

    const BlockObserver = new IntersectionObserver(
      BlockCallback,
      ObserverConfig
    );

    const allIDs = content
      ? content.map((section) => {
          return {
            htmlID: section.htmlID,
            blocks: section.blocks?.map((block) => block.htmlID) ?? [],
          };
        })
      : [];

    ContentObserver.observe(
      document.getElementById("page-content") as HTMLElement
    );
    allIDs.forEach((section) => {
      SectionObserver.observe(
        document.getElementById(section.htmlID) as Element
      );

      section.blocks.forEach((block) =>
        BlockObserver.observe(document.getElementById(block) as Element)
      );
    });
  }, [content]);

  return <div id="observer"></div>;
};

export default ContentObserver;
