"use client";
import Text from "@/components/Text";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import JournalEntries from "../../../sample-payload/journal-entries";

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

const JournalPage = ({ content, slug }: JournalPageProps) => {
  const path = usePathname();
  console.log(path);

  // const AllContent = JournalEntries.map((entry) => entry.content)
  return (
    <>
      <Overlay />
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className="cursor-pointer rounded-12px fixed z-10 top-40px left-0px right-0px bg border shadow p-24px w-[540px] mx-auto"
      >
        <motion.div className={`flex flex-col gap-18px`}>
          <Link href={`journal/${slug}`}>
            <motion.div className="flex flex-row justify-between">
              <motion.div
                layout
                transition={{ duration: 0.2, damping: 100, stiffness: 100 }}
                className="flex flex-col gap-4px"
              >
                <Text
                  size="body"
                  className=" transition-all duration-600 ease-in"
                >
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
          </Link>
          <AnimatePresence>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-18px"
            >
              <hr />
              <PageContent content={JournalEntries[0].content} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

const PageContent = ({ content }: Pick<JournalPageProps, "content">) => {
  return (
    <motion.article layout className="flex flex-col gap-24px">
      {content.map((block) => (
        <motion.div className="flex flex-col gap-8px">
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

const Overlay = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="absolute bg inset-0px z-10"
      />
    </AnimatePresence>
  );
};

export default JournalPage;
