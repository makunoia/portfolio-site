import React, { ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Text from "./Text";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import journalEntries from "../sample-payload/journal-entries";

// TO DO
// FIX MOUNT ANIMATION ON LINK VISIT

const JournalPage = ({
  content,
  data,
}: {
  content: ReactNode;
  data: (typeof journalEntries)[0];
}) => {
  const openedPage = useSelectedLayoutSegment("content");
  const isOpen = openedPage == data.slug;

  const left = useMotionValue(0);
  const right = useMotionValue(0);
  const top = useMotionValue(0);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        id={`journal-page-${data.slug}-container`}
        key={`journal-page-${data.slug}-container`}
        layoutId={`journal-page-${data.slug}`}
        style={isOpen ? { left, right, top } : {}}
        className={isOpen ? "absolute z-50 h-screen pointer-events-none" : ""}
      >
        <motion.div
          layout
          id={`journal-page-${data.slug}`}
          initial={isOpen && { opacity: 0, translateY: 60 }}
          animate={isOpen ? { opacity: 1, translateY: 0 } : { opacity: 1 }}
          className={`${
            isOpen &&
            "overflow-clip my-40px bg border shadow p-24px rounded-12px max-w-[525px]"
          }  w-full max-h-[80%] mx-auto text flex flex-col gap-16px transition-colors ease-in-out`}
        >
          <Link href={openedPage ? "" : `journal/${data.slug}`}>
            <motion.div
              layout
              className={openedPage ? "cursor-auto" : "cursor-pointer"}
            >
              <motion.div layout className={`flex flex-col gap-18px`}>
                <motion.div
                  layoutId={`list-item-${data.slug}`}
                  className="flex flex-row justify-between"
                  exit={{ opacity: 0, translateX: -20 }}
                >
                  <motion.div
                    layout
                    transition={{
                      duration: 0.2,
                      damping: 600,
                      stiffness: 800,
                    }}
                    className="flex flex-col gap-4px"
                  >
                    <Text
                      size={isOpen ? "heading" : "body"}
                      className="transition-all duration-600 ease-in"
                    >
                      {data.title}
                    </Text>
                    <Text size="caption" className="text-subtle">
                      {data.date}
                    </Text>
                  </motion.div>
                  <motion.div
                    layout
                    transition={{ duration: 0.2 }}
                    className="flex h-fit items-center rounded-10px px-10px py-8px transition-colors duration-500 ease-in-out bg-subtle/40"
                  >
                    <Text size="caption" className="text-subtle text-nowrap">
                      {data.tag}
                    </Text>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>

          {isOpen && (
            <motion.div
              id={`content-${data.slug}`}
              initial={{ opacity: 0, translateY: 60 }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              exit={{ opacity: 0, translateY: 60 }}
              className="flex flex-col gap-24px overflow-scroll"
            >
              <motion.hr layout exit={{ opacity: 0 }} />
              {content}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JournalPage;
