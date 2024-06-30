"use client";
import React from "react";
import JournalPage from "@/components/JournalPage";
import SectionDivider from "@/components/SectionDivider";
import JournalEntries from "../sample-payload/journal-entries";
import { motion } from "framer-motion";
import Link from "next/link";
import Text from "@/components/Text";

const Page = () => {
  return (
    <div className="flex flex-col gap-16px">
      <SectionDivider header="2024" />

      <Link href={`journal/test`}>
        <motion.div className="flex flex-row justify-between">
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
            className="flex items-center h-fit rounded-10px px-10px py-12px transition-colors duration-500 ease-in-out bg-subtle/40"
          >
            <Text size="caption" className="text-subtle text-nowrap">
              Reflection
            </Text>
          </motion.div>
        </motion.div>
      </Link>

      {/* <div className="flex flex-col gap-16px">
        {JournalEntries.map(({ title, gist, date, tag, content, slug }) => (
          <JournalPage
            slug={slug}
            key={slug}
            title={title}
            date={date}
            desc={gist}
            tag={tag}
            content={content}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Page;
