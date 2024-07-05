import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, frame, useAnimate } from "framer-motion";
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
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // animate({width: 50})
  }, [isOpen]);

  const cardVariants = {
    open: {
      borderRadius: "12px",
      padding: "24px",
    },
    closed: {
      padding: 0,
      borderRadius: 0,
    },
  };

  return (
    <AnimatePresence mode="sync">
      <motion.div
        layout
        ref={scope}
        id={`journal-page-${data.slug}`}
        key={`journal-page-${data.slug}`}
        variants={cardVariants}
        animate={isOpen ? "open" : "closed"}
        layoutId={`journal-page-${data.slug}`}
        initial={false}
        className={`${
          isOpen &&
          "max-w-[546px] mx-auto fixed z-50 h-3/4 max-h-5/6 overflow-clip my-40px top-0px left-0px right-0px bg border shadow"
        } w-full text flex flex-col gap-16px transition-colors ease-in-out`}
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
            transition={{ delay: 0.2 }}
            initial={{ width: 300, height: 0, opacity: 0, translateY: 60 }}
            animate={{
              width: "auto",
              height: "100%",
              opacity: 1,
              translateY: 0,
            }}
            exit={{ opacity: 0, translateY: 60 }}
            className="flex flex-col gap-24px min-h-[300px] overflow-scroll"
          >
            <motion.hr layout exit={{ opacity: 0 }} />
            {content}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default JournalPage;
