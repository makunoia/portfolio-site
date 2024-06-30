"use client";
import { motion } from "framer-motion";
import Text from "@/components/Text";
import React from "react";
import Link from "next/link";
const Page = () => {
  return (
    <Link href="journal/item" prefetch>
      <motion.div layout layoutId="text" className="text">
        header
      </motion.div>
    </Link>
  );
};

export default Page;

{
  /* <div className="flex flex-row justify-between">
<div className="flex flex-col gap-4px">
  <Text size="body" className=" transition-all duration-600 ease-in">
    A Day in Toronto
  </Text>
  <Text size="caption" className="text-subtle">
    May 5, 2024
  </Text>
</div>
<div className="flex items-center h-fit rounded-10px px-10px py-12px transition-colors duration-500 ease-in-out bg-subtle/80">
  <Text size="caption" className="text-subtle text-nowrap">
    Reflection
  </Text>
</div>
</div> */
}
<motion.div
  layout
  layoutId="journal-page"
  exit={{ opacity: 0 }}
  className="cursor-pointer rounded-12px fixed z-10 top-40px left-0px right-0px bg border shadow p-24px w-[540px] mx-auto"
>
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
  </motion.div>
</motion.div>;
