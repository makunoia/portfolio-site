"use client";

import {motion} from "motion/react";

const PromptSuggestion = ({
  header,
  samplePrompt,
  onSelect,
}: {
  header: string;
  samplePrompt: string;
  onSelect?: (prompt: string) => void;
}) => {
  return (
    <motion.div
      variants={{
        hidden: {opacity: 0, y: 8},
        show: {opacity: 1, y: 0},
      }}
      className="text flex flex-col gap-4px p-16px rounded-16px border min-w-[200px] flex-shrink-0 h-fit cursor-pointer select-none"
      style={{
        ["--ps-alpha" as any]: 0.1,
        ["--ps-alpha2" as any]: 0.05,
        ["--ps-border" as any]: 0.12,
        background:
          "linear-gradient(135deg, hsl(var(--brand) / var(--ps-alpha)), hsl(var(--brand) / var(--ps-alpha2)))",
        borderColor: "hsl(var(--brand) / var(--ps-border))",
      }}
      whileHover={{
        ["--ps-alpha" as any]: 0.22,
        ["--ps-alpha2" as any]: 0.12,
        ["--ps-border" as any]: 0.45,
      }}
      whileTap={{scale: 0.98}}
      transition={{duration: 0.25, ease: "easeInOut"}}
      layout
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(samplePrompt)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(samplePrompt);
        }
      }}
    >
      <span className="text-caption font-medium">{header}</span>
      <p className="text-caption">{samplePrompt}</p>
    </motion.div>
  );
};

export default PromptSuggestion;
