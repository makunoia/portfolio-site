"use client";
import { motion } from "framer-motion";
import Text from "@/components/Text";
import React from "react";

type JournalPageProps = {
  title: string;
  date: string;
  desc: string;
  tag: string;
  slug: string;
  content: {
    lead: string;
    paragraph: string;
  }[];
};

const JournalPage = () => {
  return (
    <motion.div layout className="text top-0px">
      This should be the content
    </motion.div>
  );
};

const PageContent = ({ content }: Pick<JournalPageProps, "content">) => {
  return (
    <motion.article layout className="flex flex-col gap-24px">
      {content.map((block, i) => (
        <motion.div
          key={`${block.lead}-${i}`}
          className="flex flex-col gap-8px"
        >
          <Text as="h3" weight="medium" className="text w-full">
            {block.lead}
          </Text>
          <Text as="p" multiline className="text w-full">
            {block.paragraph}
          </Text>
        </motion.div>
      ))}
    </motion.article>
  );
};

export default JournalPage;

<motion.div layout className={`flex flex-col gap-18px`}>
  <motion.div
    layoutId="list-item"
    className="flex flex-row justify-between"
    exit={{ opacity: 0, translateX: -20 }}
  >
    <motion.div
      layout
      transition={{ duration: 0.2, damping: 100, stiffness: 100 }}
      className="flex flex-col gap-4px"
    >
      <Text size="body" className=" transition-all duration-600 ease-in">
        A Day in Toronto
      </Text>
      <Text size="caption" className="text-subtle">
        May 5, 2024
      </Text>
    </motion.div>
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="flex items-center h-fit rounded-10px px-10px py-12px transition-colors duration-500 ease-in-out bg-subtle/80"
    >
      <Text size="caption" className="text-subtle text-nowrap">
        Reflection
      </Text>
    </motion.div>
  </motion.div>

  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col gap-18px"
  >
    <hr />
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat cum
    sapiente quam nobis expedita possimus amet, labore ratione iure unde!
    {/* <PageContent content={JournalEntries[0].content} /> */}
  </motion.div>
</motion.div>;
