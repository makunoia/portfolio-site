"use client";
import React, {useContext, useEffect, useState} from "react";
import Text from "@/components/Text";
import {m, LazyMotion, domAnimation} from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import {cva} from "class-variance-authority";

import InViewContext from "@/contexts/InViewContext";
import ScrollSpyTrackline from "./ScrollSpyTrackline";

export type ScrollSpyType = {
  title: string;
  htmlID: string;
  blocks: {lead: string; htmlID: string}[];
};

const accordionItem = cva(
  "flex w-full cursor-pointer flex-col gap-8px transition-all ease-in-out",
);

const spyContainer = cva(
  [
    "relative overflow-hidden pl-[2px] pt-[2px]",
    "data-[state=open]:animate-[slideDown_300ms_cubic-bezier(0.9,0,0.4,1)_forwards]",
    "data-[state=closed]:animate-[slideUp_300ms_cubic-bezier(0.9,0,0.4,1)_forwards]",
  ].join(" "),
);

const spyItem = cva(
  "group relative flex w-fit items-start pl-[18px]",
  {
    variants: {
      isActive: {
        true: "opacity-100",
        false: "opacity-70 hover:opacity-100",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

const ScrollSpy = ({sections}: {sections: ScrollSpyType[]}) => {
  return (
    <div className="sticky pl-24px top-24px min-w-[150px] ml-auto flex flex-col gap-4px">
      <Text size="body" className="text-fg-subtle mb-12px">
        Content
      </Text>
      <LazyMotion features={domAnimation}>
        <AccordionRoot sections={sections} />
      </LazyMotion>
    </div>
  );
};

const AccordionRoot = ({sections}: {sections: ScrollSpyType[]}) => {
  const {inView} = useContext(InViewContext);
  return (
    <Accordion.Root
      className="flex flex-col gap-8px"
      type="single"
      value={inView.section as string}
      collapsible
    >
      {sections.map(({title, htmlID, blocks}) => {
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
  blocks: {lead: string; htmlID: string}[];
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | undefined>();
  const [hoveredItemIndex, setHoveredItemIndex] = useState<
    number | undefined
  >();

  const {inView, setInView} = useContext(InViewContext);

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
    setInView((curr) => ({section: curr.section, block: id}));
    scrollToViewHandler(id);
  };

  const scrollToViewHandler = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <Accordion.Item value={id} className={accordionItem()}>
      <Accordion.Header className="inline-flex">
        <Accordion.Trigger
          className="inline-flex"
          onClick={() => scrollToViewHandler(id)}
        >
          <Text
            className={`text-wrap text-left transition-colors duration-300 ease-in-out ${
              inView.section === id
                ? "text-fg-default font-medium"
                : "text-fg-subtle/60 hover:text-fg-subtle"
            }`}
          >
            {title}
          </Text>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content
        id={`spy-items-container-${id}`}
        className={spyContainer()}
        asChild
      >
        <m.div className="flex flex-col gap-2">
          {blocks.map(({lead, htmlID}, i) => (
            <div
              key={i}
              id={`scrollspy-item-${htmlID}`}
              className={spyItem({isActive: inView.block == htmlID})}
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
                className={`transition-color duration-300 ease-in-out group-hover:text-fg-default text-wrap ${
                  inView.block == htmlID ? "text-fg-default" : "text-fg-subtle/40 "
                }`}
              >
                {lead}
              </Text>
            </div>
          ))}
        </m.div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default ScrollSpy;
