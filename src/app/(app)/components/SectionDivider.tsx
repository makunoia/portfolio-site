"use client";
import React from "react";
import { motion } from "framer-motion";
import Text from "./Text";

type SectionDividerProps = {
  header: string;
  id?: string;
};

const SectionDivider = ({ header, id }: SectionDividerProps) => {
  return (
    <motion.div
      layout
      id={id}
      className="flex flex-row gap-16px items-center w-full"
      transition={{ type: "spring", damping: 50, stiffness: 400 }}
    >
      <Text
        size="overline"
        className="text-nowrap text-subtle uppercase tracking-widest"
      >
        {header}
      </Text>
      <hr />
    </motion.div>
  );
};

export default SectionDivider;
