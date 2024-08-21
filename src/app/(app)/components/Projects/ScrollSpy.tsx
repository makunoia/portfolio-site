"use client";
import React, { useContext, useEffect, useState } from "react";
import Text from "@/components/Text";
import { m, LazyMotion, domAnimation } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import InViewContext from "@/contexts/InViewContext";
import ScrollSpyTrackline from "./ScrollSpyTrackline";

export type ScrollSpyType = {
  title: string;
  htmlID: string;
  blocks: { lead: string; htmlID: string }[];
};

const ScrollSpy = ({ sections }: { sections: ScrollSpyType[] }) => {
  return (
    <div className="sticky pl-24px top-24px min-w-[150px] ml-auto flex flex-col gap-4px">
      <Text size="body" className="text-subtle mb-12px">
        Content
      </Text>
      <AccordionRoot sections={sections} />
    </div>
  );
};

const AccordionRoot = ({ sections }: { sections: ScrollSpyType[] }) => {
  const { inView } = useContext(InViewContext);
  return (
    <Accordion.Root
      className="flex flex-col gap-8px"
      type="single"
      value={inView.section as string}
      collapsible
    >
      {sections.map(({ title, htmlID, blocks }) => {
        return (
          <ScrollSpyItem
            id={htmlID}
            key={title}
            title={title}
            blocks={blocks}
          />
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
  blocks: { lead: string; htmlID: string }[];
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | undefined>();
  const [hoveredItemIndex, setHoveredItemIndex] = useState<
    number | undefined
  >();

  const { inView, setInView } = useContext(InViewContext);

  //create a useEffect hook to render active path
  useEffect(() => {
    const newActiveIndex = blocks.findIndex(
      (block) => block.htmlID == inView.block
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

  const scrollToViewHandler = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Accordion.Item
      value={id}
      className="w-full cursor-pointer flex flex-col gap-8px transition-all ease-in-out"
    >
      <Accordion.Header className="inline-flex">
        <Accordion.Trigger
          className="inline-flex"
          onClick={() => scrollToViewHandler(id)}
        >
          <Text
            className={`text-wrap text-left transition-colors duration-300 ease-in-out ${
              inView.section === id
                ? "text font-medium"
                : "text-subtle/60 hover:text-subtle"
            }`}
          >
            {title}
          </Text>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content
        data-state="open"
        id={`spy-items-container-${id}`}
        className="spy-items-container"
        asChild
      >
        <LazyMotion features={domAnimation}>
          <m.div>
            {blocks.map(({ lead, htmlID }, i) => (
              <div
                key={i}
                id={`scrollspy-item-${htmlID}`}
                className="group spy-item"
                onMouseEnter={() => onMouseEnterHandler(i)}
                onMouseLeave={() => onMouseLeaveHandler()}
                onClick={() => onClickHandler(i, htmlID)}
              >
                <ScrollSpyTrackline
                  activeItemIndex={activeItemIndex}
                  hoveredItemIndex={hoveredItemIndex}
                  index={i}
                  parentID={`spy-items-container-${id}`}
                  childID={`scrollspy-item-${htmlID}`}
                />
                <Text
                  className={`transition-color duration-300 ease-in-out group-hover:text text-wrap ${
                    inView.block == htmlID ? "text" : "text-subtle/40 "
                  }`}
                >
                  {lead}
                </Text>
              </div>
            ))}
          </m.div>
        </LazyMotion>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default ScrollSpy;
