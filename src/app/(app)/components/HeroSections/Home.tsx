"use client";

import ToggleSwitch from "@/components/ToggleSwitch";
import AssistantPanel from "@/app/(app)/components/Assistant/AssistantPanel";
import StatusBadge from "@/components/StatusBadge";
import {useState} from "react";
import {LexicalBlock} from "@/app/(app)/types";
import {renderLexicalContent} from "@/lib/helpers";
import {motion, AnimatePresence, LayoutGroup} from "motion/react";
import {cva} from "class-variance-authority";

const endConversationButton = cva(
  [
    "rounded-16px cursor-pointer border px-16px py-10px text-body transition-all duration-200 ease-in-out shadow-sm text-fg-default",
    "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--utility-danger)_var(--danger-alpha1),var(--danger-base)),color-mix(in_oklch,var(--utility-danger)_var(--danger-alpha2),var(--danger-base)))]",
    "border-[color:color-mix(in_oklch,var(--utility-danger)_var(--danger-border),transparent)]",
    "[--danger-base:transparent] [--danger-alpha1:12%] [--danger-alpha2:6%] [--danger-border:35%]",
    "hover:[--danger-alpha1:18%] hover:[--danger-alpha2:10%] hover:[--danger-border:45%]",
    "light:[--danger-base:#ffffff] light:[--danger-alpha1:88%] light:[--danger-alpha2:68%] light:[--danger-border:72%] light:text-white light:hover:[--danger-alpha1:92%] light:hover:[--danger-alpha2:74%] light:hover:[--danger-border:82%]",
  ].join(" "),
);

type HeroSummaryProps = {
  copy: LexicalBlock;
  status: "employed" | "open" | undefined;
};

const HomeHero = ({copy, status}: HeroSummaryProps) => {
  const [showAssistant, setShowAssistant] = useState(true);
  const [conversationActive, setConversationActive] = useState(false);
  const [endSignal, setEndSignal] = useState(0);

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
    <LayoutGroup id="home-hero">
      <div className="w-full">
        {/* Content container with smooth height transitions */}
        <motion.div
          layout
          transition={layoutTransition}
          className={showAssistant ? "overflow-visible" : "overflow-hidden"}
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
                <AssistantPanel
                  onConversationActiveChange={setConversationActive}
                  endConversationSignal={endSignal}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div
          className={`flex justify-center min-h-[44px] ${conversationActive ? "my-20px" : "my-40px"}`}
          layout
          transition={layoutTransition}
        >
          <AnimatePresence mode="wait">
            {conversationActive ? (
              <motion.button
                key="end-convo"
                className={endConversationButton()}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                transition={{duration: 0.2, ease: "easeInOut"}}
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -8}}
                layout
                onClick={() => {
                  setEndSignal((v) => v + 1);
                  setConversationActive(false);
                }}
              >
                End conversation
              </motion.button>
            ) : (
              <motion.div
                key="toggle"
                className="inline-block"
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -8}}
                layout
              >
                <ToggleSwitch
                  leftLabel="Talk to Assistant"
                  rightLabel="View summary"
                  isRightActive={!showAssistant}
                  onToggle={(isRightActive) => setShowAssistant(!isRightActive)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </LayoutGroup>
  );
};

export default HomeHero;
