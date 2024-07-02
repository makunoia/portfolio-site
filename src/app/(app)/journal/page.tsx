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
