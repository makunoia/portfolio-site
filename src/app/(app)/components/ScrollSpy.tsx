"use client";
import React, { useContext, useEffect, useState } from "react";
import Text from "./Text";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import InViewContext from "../contexts/InViewContext";

type SectionsType = {
  sections: {
    title: string;
    id: string;
    blocks: { id: string; lead: string }[];
  }[];
};

const ScrollSpy = ({ sections }: SectionsType) => {
  return (
    <div className="sticky pl-24px top-24px min-w-[150px] ml-auto flex flex-col gap-4px">
      <Text size="body" className="text-subtle mb-12px">
        Content
      </Text>
      <AccordionRoot sections={sections} />
    </div>
  );
};

const AccordionRoot = ({ sections }: SectionsType) => {
  const { inView } = useContext(InViewContext);
  return (
    <Accordion.Root
      className="flex flex-col"
      type="single"
      value={inView.section as string}
      collapsible
    >
      {sections.map(({ title, id, blocks }) => {
        return (
          <ScrollSpyItem id={id} key={title} title={title} blocks={blocks} />
        );
      })}
    </Accordion.Root>
  );
};

const ScrollSpyItem = ({
  id,
  title,
  blocks,
}: {
  id: string;
  title: string;
  blocks: { lead: string; id: string }[];
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | undefined>();
  const [hoveredItemIndex, setHoveredItemIndex] = useState<
    number | undefined
  >();

  const { inView, setInView } = useContext(InViewContext);

  //create a useEffect hook to render active path
  useEffect(() => {
    const newActiveIndex = blocks.findIndex(
      (block) => block.id == inView.block
    );
    setActiveItemIndex(newActiveIndex);
  }, [inView.block]);

  const onMouseEnterHandler = (i: number) => {
    setHoveredItemIndex(() => i);
  };

  const onMouseLeaveHandler = () => {
    setHoveredItemIndex(() => undefined);
  };

  const onClickHandler = (i: number, id: string) => {
    setActiveItemIndex(i);
    setInView((curr) => ({ section: curr.section, block: id }));
    scrollToViewHandler(id);
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

  const scrollToViewHandler = (id: string) => {
    console.log("Scroll to...", id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Accordion.Item
      value={id}
      className="w-full cursor-pointer flex flex-col gap-4px transition-all ease-in-out"
    >
      <Accordion.Header>
        <Accordion.Trigger onClick={() => scrollToViewHandler(id)}>
          <Text
            className={`${
              inView.section === id ? "text font-medium" : "text-subtle/80"
            }`}
          >
            {title}
          </Text>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content
        data-state="open"
        className="spy-items-container"
        asChild
      >
        <motion.div>
          {blocks.map(({ lead, id }, i) => (
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
                  inView.block == id ? "text" : "text-subtle/40 "
                } text-nowrap`}
              >
                {lead}
              </Text>
            </div>
          ))}
        </motion.div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default ScrollSpy;
