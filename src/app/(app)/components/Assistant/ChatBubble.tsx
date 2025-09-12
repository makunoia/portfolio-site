"use client";

import {motion} from "motion/react";

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
      className="rounded-24px px-16px py-10px max-w-[75%]"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--brand) / 0.18), hsl(var(--brand) / 0.10))",
        color: "hsl(var(--fg-inverse))",
      }}
    >
      <p className="text text-body-large leading-[1.6]">{message}</p>
    </motion.div>
  );
};

export default ChatBubble;
