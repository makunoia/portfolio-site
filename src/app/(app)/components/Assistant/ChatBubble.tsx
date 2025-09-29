"use client";

import {motion} from "motion/react";
import {cva} from "class-variance-authority";

const bubble = cva(
  [
    "max-w-[75%] rounded-24px border px-16px py-10px shadow-sm transition-all duration-200 ease-in-out",
    "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--brand)_var(--cb-alpha1),var(--cb-base)),color-mix(in_oklch,var(--brand)_var(--cb-alpha2),var(--cb-base)))]",
    "border-[color:color-mix(in_oklch,var(--brand)_var(--cb-border),transparent)]",
    "[--cb-base:transparent] [--cb-alpha1:20%] [--cb-alpha2:12%] [--cb-border:22%]",
    "hover:[--cb-alpha1:32%] hover:[--cb-alpha2:24%] hover:[--cb-border:32%]",
    "light:[--cb-base:#ffffff] light:[--cb-alpha1:86%] light:[--cb-alpha2:70%] light:[--cb-border:54%] light:hover:[--cb-alpha1:96%] light:hover:[--cb-alpha2:84%] light:hover:[--cb-border:64%] light:text-white",
  ].join(" "),
);

const ChatBubble = ({message}: {message: string}) => {
  return (
    <motion.div
      layout
      initial={{opacity: 0, y: 12, scale: 0.98}}
      animate={{opacity: 1, y: 0, scale: 1}}
      exit={{opacity: 0, y: -10, scale: 0.98}}
      transition={{
        layout: {type: "spring", stiffness: 380, damping: 28, mass: 0.7},
        opacity: {duration: 0.2, ease: "easeOut"},
        y: {type: "spring", stiffness: 380, damping: 28, mass: 0.7},
        scale: {type: "spring", stiffness: 380, damping: 28, mass: 0.7},
      }}
      className={bubble()}
    >
      <p className="text-body-large leading-[1.6] text-fg-default light:text-white">
        {message}
      </p>
    </motion.div>
  );
};

export default ChatBubble;
