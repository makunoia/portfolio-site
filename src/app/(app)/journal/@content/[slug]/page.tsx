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

export default JournalPage;
