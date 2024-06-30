"use client";
import { motion } from "framer-motion";
import Text from "@/components/Text";
import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <motion.div layoutId="journal-page">
      <motion.div layout>
        <Link href={`journal/test`}>
          <Text size="body">Some text</Text>
        </Link>
      </motion.div>
    </motion.div>
  );
};

{
  /* <motion.div layoutId="journal-item" transition={{ duration: 200 }}>
        <motion.div className="flex flex-col gap-16px">
          <Link href={`journal/test`}>
            <motion.div layout className="flex flex-row justify-between">
              <motion.div className="flex flex-col gap-4px">
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
              <motion.div className="flex items-center h-fit rounded-10px px-10px py-12px transition-colors duration-500 ease-in-out bg-subtle/40">
                <Text size="caption" className="text-subtle text-nowrap">
                  Reflection
                </Text>
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div> */
}

export default Page;
