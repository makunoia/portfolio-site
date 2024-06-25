"use client";
import React, { useEffect, useState } from "react";
import Text from "./Text";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

//TO DO
// ✅ Active State styling
// ✅ Accordion styling
// True ScrollSpy items based on payload
// Updating active scroll spy item depending on which section is topmost on screen
// Accordion - collapsed when not in section

type SectionType = {
  id: string;
  active?: boolean;
  subsections: {
    id: string;
    active?: boolean;
  }[];
};

const ScrollSpy = ({
  sections,
}: {
  sections: {
    title: string;
    id: string;
    subsections: { id: string; lead: string }[];
  }[];
}) => {
  const [allSections, setAllSections] = useState([] as SectionType[]);

  useEffect(() => {
    const pageSections = sections.map((section) => {
      return {
        id: section.id,
        active: false,
        subsections: section.subsections.map((sub) => {
          return {
            id: sub.id,
            active: false,
          };
        }),
      };
    });

    setAllSections(pageSections);
  }, [sections]);

  return (
    <div className="sticky pl-24px top-24px min-w-[150px] ml-auto flex flex-col gap-4px">
      <Text size="body" className="text-subtle mb-12px">
        Content
      </Text>
      <Accordion.Root className="flex flex-col" type="single" collapsible>
        {sections.map(({ title, id, subsections }, index) => {
          return (
            <ScrollSpyItem
              id={id}
              key={title}
              title={title}
              subsections={subsections}
              sectionState={allSections[index]}
            />
          );
        })}
      </Accordion.Root>
    </div>
  );
};

const ScrollSpyItem = ({
  id,
  title,
  sectionState,
  subsections,
}: {
  id: string;
  title: string;
  sectionState: SectionType;
  subsections: { lead: string; id: string }[];
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | undefined>();
  const [hoveredItemIndex, setHoveredItemIndex] = useState<
    number | undefined
  >();

  const onMouseEnterHandler = (i: number) => {
    setHoveredItemIndex(() => i);
  };

  const onMouseLeaveHandler = () => {
    setHoveredItemIndex(() => undefined);
  };

  const onClickHandler = (i: number) => {
    setActiveItemIndex(i);
  };

  const getPathStyle = (
    i: number,
    type: "hover" | "active",
    vertical?: boolean
  ) => {
    const className = type === "hover" ? "path" : "active";
    const comparedIndex = type === "hover" ? hoveredItemIndex : activeItemIndex;

    return comparedIndex !== undefined && vertical
      ? cn(comparedIndex >= i && className)
      : cn(comparedIndex == i && className);
  };

  return (
    <Accordion.Item
      value={id}
      className="w-full cursor-pointer flex flex-col gap-8px transition-all ease-in-out"
    >
      <Accordion.Header>
        <Accordion.Trigger>
          <Text
            className={`${
              sectionState?.active ? "text font-medium" : "text-subtle/80"
            }`}
          >
            {title}
          </Text>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="spy-items-container">
        {subsections.map(({ lead }, i) => (
          <div
            key={i}
            className="group spy-item last:mb-8px"
            onMouseEnter={() => onMouseEnterHandler(i)}
            onMouseLeave={() => onMouseLeaveHandler()}
            onClick={() => onClickHandler(i)}
          >
            <div
              className={`trackline trackline-v 
                ${getPathStyle(i, "hover", true)}
                ${getPathStyle(i, "active", true)}`}
            />
            <div
              className={`trackline trackline-h 
                ${getPathStyle(i, "hover")} 
                ${getPathStyle(i, "active")}`}
            />
            <Text
              className={`transition-color duration-300 ease-in-out group-hover:text ${
                i === activeItemIndex ? "text" : "text-subtle/40 "
              } text-nowrap`}
            >
              {lead}
            </Text>
          </div>
        ))}
      </Accordion.Content>
    </Accordion.Item>
  );
};

// const getPreviousSiblings = (element: HTMLElement): Element[] => {
//   const parent = element.parentElement;
//   const prevSiblings: Element[] = [];

//   if (parent) {
//     const allSiblings = Array.from(parent.children);
//     for (const sibling of allSiblings) {
//       if (sibling !== element) {
//         prevSiblings.push(sibling);
//       } else break;
//     }
//   }

//   return prevSiblings;
// };

// const toggleHoverClass = (
//   element: HTMLElement,
//   className: string,
//   add: boolean
// ): void => {
//   const horizontalTrackLine = element.getElementsByClassName("trackline-h")[0];
//   const prevSiblings = getPreviousSiblings(element);
//   const verticalTrackLines = prevSiblings.map(
//     (sib) => sib.getElementsByClassName("trackline-v")[0]
//   );

//   if (add) {
//     horizontalTrackLine.classList.add(className);
//     verticalTrackLines.forEach((el) => el.classList.add(className));
//   } else {
//     verticalTrackLines.forEach((el) => el.classList.remove(className));
//     setTimeout(() => {
//       horizontalTrackLine.classList.remove(className);
//     }, 200);
//   }
// };

// const onClickHandler = (i: number, e: HTMLElement): void => {
//   toggleHoverClass(e, "active", true);
// };

// const onMouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
//   toggleHoverClass(e.currentTarget as HTMLElement, "hovered", true);
// };

// const onMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
//   toggleHoverClass(e.currentTarget as HTMLElement, "hovered", false);
// };

export default ScrollSpy;
