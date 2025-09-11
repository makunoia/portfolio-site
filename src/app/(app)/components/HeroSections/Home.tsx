"use client";

import ToggleSwitch from "@/components/ToggleSwitch";
import AssistantInput from "@/app/(app)/components/AssistantInput";
import StatusBadge from "@/components/StatusBadge";
import {useState} from "react";
import {LexicalBlock} from "@/app/(app)/types";
import {renderLexicalContent} from "@/lib/helpers";
import {motion, AnimatePresence, LayoutGroup} from "motion/react";

type HeroSummaryProps = {
  copy: LexicalBlock;
  status: "employed" | "open" | undefined;
};

const HomeHero = ({copy, status}: HeroSummaryProps) => {
  const [showAssistant, setShowAssistant] = useState(true);

  const fadeVariants = {
    initial: {opacity: 0, y: 20},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -20},
  };

  const transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  };

  const layoutTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  };

  return (
    <LayoutGroup>
      <div className="w-full">
        {/* Content container with smooth height transitions */}
        <motion.div
          layout
          transition={layoutTransition}
          className="overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!showAssistant ? (
              <motion.div
                key="summary"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                layout
              >
                <div className="flex flex-col justify-center items-center text-center gap-24px">
                  {copy.length ? renderLexicalContent(copy) : null}
                  <StatusBadge status={status} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="assistant"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="flex items-center justify-center flex-col gap-24px w-full"
                layout
              >
                <h1 className="text-heading text"> Talk to my assistant</h1>
                <AssistantInput />
                <div className="flex flex-row gap-14px w-full">
                  <PromptSuggestion
                    header="Ask a question"
                    samplePrompt="What is Mark's best competency?"
                  />
                  <PromptSuggestion
                    header="Summarize"
                    samplePrompt="Tell me about Mark's work experience."
                  />
                  <PromptSuggestion
                    header="Find information"
                    samplePrompt="What is Mark's email address?"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div
          className="flex justify-center my-40px"
          layout
          transition={layoutTransition}
        >
          <ToggleSwitch
            leftLabel="Talk to Assistant"
            rightLabel="View summary"
            isRightActive={!showAssistant}
            onToggle={(isRightActive) => setShowAssistant(!isRightActive)}
          />
        </motion.div>
      </div>
    </LayoutGroup>
  );
};

const PromptSuggestion = ({
  header,
  samplePrompt,
}: {
  header: string;
  samplePrompt: string;
}) => {
  return (
    <motion.div
      className="text flex flex-col gap-4px p-16px rounded-16px border w-full h-fit cursor-pointer select-none"
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
    >
      <span className="text-caption font-medium">{header}</span>
      <p className="text-caption">{samplePrompt}</p>
    </motion.div>
  );
};

export default HomeHero;
