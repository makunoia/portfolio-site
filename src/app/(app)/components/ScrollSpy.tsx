"use client";
import React from "react";
import Text from "./Text";

const ScrollSpy = ({
  sections,
}: {
  sections: {
    title: string;
    id: string;
    subsections: { id: string; lead: string; active: boolean }[];
  }[];
}) => {
  return (
    <div className="sticky pl-24px top-24px min-w-[150px] ml-auto flex flex-col gap-4px">
      <Text size="body" className="text-subtle mb-12px">
        Content
      </Text>
      <div className="flex flex-col gap-12px">
        {sections.map(({ title, id, subsections }) => (
          <ScrollSpyItem
            key={title}
            id={id}
            title={title}
            subsections={subsections}
          />
        ))}
      </div>
    </div>
  );
};

const getPreviousSiblings = (element: HTMLElement): Element[] => {
  const parent = element.parentElement;
  const prevSiblings: Element[] = [];

  if (parent) {
    const allSiblings = Array.from(parent.children);
    for (const sibling of allSiblings) {
      if (sibling !== element) {
        prevSiblings.push(sibling);
      } else break;
    }
  }

  return prevSiblings;
};

const toggleHoverClass = (element: HTMLElement, add: boolean): void => {
  const horizontalTrackLine = element.getElementsByClassName("trackline-h")[0];
  const prevSiblings = getPreviousSiblings(element);
  const verticalTrackLines = prevSiblings.map(
    (sib) => sib.getElementsByClassName("trackline-v")[0]
  );

  if (add) {
    horizontalTrackLine.classList.add("hovered");
    verticalTrackLines.forEach((el) => el.classList.add("hovered"));
  } else {
    verticalTrackLines.forEach((el) => el.classList.remove("hovered"));
    setTimeout(() => {
      horizontalTrackLine.classList.remove("hovered");
    }, 200);
  }
};

const onMouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.preventDefault();
  toggleHoverClass(e.currentTarget as HTMLElement, true);
};

const onMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.preventDefault();
  toggleHoverClass(e.currentTarget as HTMLElement, false);
};

const ScrollSpyItem = ({
  title,
  subsections,
}: {
  title: string;
  id: string;
  subsections: { lead: string; id: string; active?: boolean }[];
}) => {
  return (
    <div className="w-full cursor-pointer flex flex-col gap-8px">
      <Text>{title}</Text>
      <div className="spy-items-container">
        {subsections.map(({ lead, active }) => (
          <div
            className={`spy-item ${active && "active"}`}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
          >
            <div className="trackline trackline-v" />
            <div className="trackline trackline-h" />
            <Text
              className={`transition-color duration-300 ease-in-out ${
                active ? "text" : "text-subtle/40 hover:text"
              } text-nowrap`}
            >
              {lead}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollSpy;
