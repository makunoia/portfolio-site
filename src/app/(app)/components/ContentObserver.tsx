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

  useEffect(() => {
    console.log(content);
  }, []);

  const mainSectionCallback = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setInView((curr) => ({ section: entry.target.id, part: curr.part }));
      }
    });
  };

  const subSectionCallback = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setInView((curr) => ({
          section: curr.section,
          part: entry.target.id,
        }));
      }
    });
  };

  useEffect(() => {
    const mainSectionObserver = new IntersectionObserver(mainSectionCallback, {
      root: null,
      rootMargin: "0px 0px -80% 0px",
    });

    const subSectionObserver = new IntersectionObserver(subSectionCallback, {
      root: null,
      rootMargin: "0px 0px -80% 0px",
    });

    const sectionIDs = content.map((section) => {
      return {
        id: section.id,
        parts: section.parts?.map((part) => part.id) ?? [],
      };
    });

    console.log(sectionIDs);

    sectionIDs.forEach((section) => {
      mainSectionObserver.observe(
        document.getElementById(section.id) as Element
      );

      section.parts.forEach((part) =>
        subSectionObserver.observe(document.getElementById(part) as Element)
      );
    });
  }, [content]);

  useEffect(() => console.log("InView", inView), [inView]);

  return <div id="observer" className="hidden"></div>;
};

export default ContentObserver;
