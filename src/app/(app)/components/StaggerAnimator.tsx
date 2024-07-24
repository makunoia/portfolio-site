"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const StaggerAnimator = ({
  children,
  className,
  play,
}: {
  children: ReactNode;
  className?: string;
  play: boolean;
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 80,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={play ? "show" : false}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child) => {
            return <motion.div variants={item}>{child}</motion.div>;
          })
        : null}
    </motion.div>
  );
};

export default StaggerAnimator;
