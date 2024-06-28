"use client";
import React, { useEffect, useState, createContext, ReactElement } from "react";

interface SectionInViewContextType {
  inView: {
    section: string | null;
    part: string | null;
  };
  setInView: React.Dispatch<
    React.SetStateAction<{
      section: string;
      part: string;
    }>
  >;
}
// Provide default values for the context

const defaultValues: SectionInViewContextType = {
  inView: { section: "", part: "" },
  setInView: () => {},
};

const SectionInViewContext =
  createContext<SectionInViewContextType>(defaultValues);

type SectionType = {
  id: string;
  parts: {
    id: string;
  }[];
};

export function SectionInViewProvider({
  sections,
  children,
}: {
  sections: SectionType[];
  children: ReactElement;
}) {
  const [inView, setInView] = useState({ section: "", part: "" });

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

    const sectionIDs = sections.map((section) => {
      return {
        id: section.id,
        parts: section.parts.map((part) => part.id),
      };
    });

    sectionIDs.forEach((section) => {
      mainSectionObserver.observe(
        document.getElementById(section.id) as Element
      );

      section.parts.forEach((part) =>
        subSectionObserver.observe(document.getElementById(part) as Element)
      );
    });
  }, [sections]);

  useEffect(() => console.log("InView", inView), [inView]);

  return (
    <SectionInViewContext.Provider value={{ inView, setInView }}>
      {children}
    </SectionInViewContext.Provider>
  );
}

export default SectionInViewContext;
