"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Text from "./Text";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import SectionInViewContext, {
  SectionInViewProvider,
} from "../context/SectionsInView";

//TO DO
// ✅ Active State styling
// ✅ Accordion styling
// ✅ True items based on payload
// Updating active scroll spy item depending on which section is topmost on screen
// Accordion - collapsed when not in section

type SectionsType = {
  sections: {
    title: string;
    id: string;
    parts: { id: string; lead: string }[];
  }[];
};

const ScrollSpy = ({ sections }: SectionsType) => {
  return (
    <SectionInViewProvider sections={sections}>
      <div className="sticky pl-24px top-24px min-w-[150px] ml-auto flex flex-col gap-4px">
        <Text size="body" className="text-subtle mb-12px">
          Content
        </Text>
        <AccordionRoot sections={sections} />
      </div>
    </SectionInViewProvider>
  );
};

const AccordionRoot = ({ sections }: SectionsType) => {
  const { inView } = useContext(SectionInViewContext);
  return (
    <Accordion.Root
      className="flex flex-col"
      type="single"
      value={inView.section as string}
      collapsible
    >
      {sections.map(({ title, id, parts }, index) => {
        return (
          <ScrollSpyItem id={id} key={title} title={title} parts={parts} />
        );
      })}
    </Accordion.Root>
  );
};

const ScrollSpyItem = ({
  id,
  title,
  parts,
}: {
  id: string;
  title: string;
  parts: { lead: string; id: string }[];
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | undefined>();
  const [hoveredItemIndex, setHoveredItemIndex] = useState<
    number | undefined
  >();

  const { inView, setInView } = useContext(SectionInViewContext);

  //create a useEffect hook to render active path
  useEffect(() => {
    const newActiveIndex = parts.findIndex((part) => part.id == inView.part);
    setActiveItemIndex(newActiveIndex);
  }, [inView.part]);

  const onMouseEnterHandler = (i: number) => {
    setHoveredItemIndex(() => i);
  };

  const onMouseLeaveHandler = () => {
    setHoveredItemIndex(() => undefined);
  };

  const onClickHandler = (i: number, id: string) => {
    setInView((curr) => ({ section: curr.section, part: id }));
    setActiveItemIndex(i);
  };

  // These getPathStyle methods styles the path according to the item's place
  // on the array, if the item is index 3, it styles itself and the indexes less than 3
  const getPathHoverStyle = (i: number, vertical?: boolean) => {
    return hoveredItemIndex !== undefined && vertical
      ? cn(hoveredItemIndex >= i && "hovered")
      : cn(hoveredItemIndex == i && "hovered");
  };

  const getPathActiveStyle = (i: number, vertical?: boolean) => {
    return activeItemIndex !== undefined && vertical
      ? cn(activeItemIndex >= i && "active")
      : cn(activeItemIndex == i && "active");
  };

  return (
    <Accordion.Item
      value={id}
      className="w-full cursor-pointer flex flex-col gap-4px transition-all ease-in-out"
    >
      <Accordion.Header>
        <Accordion.Trigger>
          <Text
            className={`${
              inView.section === id ? "text font-medium" : "text-subtle/80"
            }`}
          >
            {title}
          </Text>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content data-state="open" className="spy-items-container">
        {parts.map(({ lead, id }, i) => (
          <div
            key={i}
            className="group spy-item last:mb-8px"
            onMouseEnter={() => onMouseEnterHandler(i)}
            onMouseLeave={() => onMouseLeaveHandler()}
            onClick={() => onClickHandler(i, id)}
          >
            <div
              className={`trackline trackline-v 
                ${getPathHoverStyle(i, true)}
                ${getPathActiveStyle(i, true)} `}
            />
            <div
              className={`trackline trackline-h 
                ${getPathHoverStyle(i)} 
                ${getPathActiveStyle(i)}`}
            />
            <Text
              className={`transition-color duration-300 ease-in-out group-hover:text ${
                inView.part == id ? "text" : "text-subtle/40 "
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

export default ScrollSpy;
