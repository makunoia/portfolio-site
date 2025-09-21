"use client";

import {type KeyboardEvent} from "react";
import {motion} from "motion/react";
import {cva} from "class-variance-authority";

const promptCard = cva(
  [
    "flex h-fit min-w-[200px] flex-shrink-0 select-none flex-col gap-4px rounded-16px p-16px cursor-pointer text-fg-default",
    "transition-colors duration-300 ease-out",
    "bg-[color:var(--assistant-suggestion-bg)]",
    "hover:bg-[color:var(--assistant-suggestion-bg-hover)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[color:color-mix(in_oklch,var(--border-default)_45%,transparent)]",
  ].join(" "),
);

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const promptCardMotion = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.32, ease: transitionEase},
  },
};

const PromptSuggestion = ({
  header,
  samplePrompt,
  onSelect,
}: {
  header: string;
  samplePrompt: string;
  onSelect?: (prompt: string) => void;
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(samplePrompt);
    }
  };

  return (
    <motion.div
      variants={promptCardMotion}
      className={promptCard()}
      layout
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(samplePrompt)}
      onKeyDown={handleKeyDown}
      whileTap={{scale: 0.97}}
      transition={{duration: 0.2, ease: transitionEase}}
    >
      <span className="text-caption font-medium">{header}</span>
      <p className="text-caption">{samplePrompt}</p>
    </motion.div>
  );
};

export default PromptSuggestion;
