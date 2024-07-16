"use client";
import React, { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  usePresence,
  useAnimate,
} from "framer-motion";
import Text from "./Text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";
import { JournalEntry, JournalEntryTag } from "payload-types";
import { formatDate } from "@/lib/utils";

// TO DO
// FIX MOUNT ANIMATION ON LINK VISIT
// HOVER INTERACTION
// INSTANT RESPONSE ON CLICK

const JournalPage = ({
  content,
  data,
}: {
  content: ReactNode;
  data: JournalEntry;
}) => {
  const page = useRef<HTMLDivElement>(null);
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [showScrollHeader, setShowScrollHeader] = useState(false);
  const { scrollY } = useScroll({ container: page });
  const currPath = usePathname();
  const EntryTag: JournalEntryTag = data.tag as JournalEntryTag;
  const EntryDate: string = formatDate(new Date(data.date));

  useMotionValueEvent(scrollY, "change", () => {
    if (isPageOpen) {
      if (scrollY.get() > 40) setShowScrollHeader(true);
      else setShowScrollHeader(false);
    }
  });

  useEffect(() => {}, [isPageOpen]);

  useEffect(() => {
    const thisJournalEntryOpened = currPath.includes(data.slug);
    if (thisJournalEntryOpened) {
      OpenPageOrchestration();
    } else {
      ClosePageOrchestration();
    }
  }, [currPath]);

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const ClosePageOrchestration = async () => {
    // console.log("Closing page...");
    setIsContentOpen(false);
  };

  const ClosePageOrchestrationWithHeader = async () => {
    // console.log("Closing page with header...");
    page.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsContentOpen(false);
  };

  const OpenPageOrchestration = async () => {
    // console.log("Opening page...");
    setIsPageOpen(true);
    await delay(500);
    setIsContentOpen(true);
  };

  return (
    <motion.div
      layout="position"
      ref={page}
      id={`journal-page-${data.slug}`}
      animate={isPageOpen ? { opacity: 1 } : { opacity: 1 }}
      className={` ${
        isPageOpen
          ? "fixed top-0px sm:top-40px z-50 bg border shadow overflow-y-scroll overflow-x-hidden mx-0px sm:mx-[15%] md:mx-[20%]"
          : "relative h-fit"
      } group sm:min-w-[500px] w-full sm:w-fit max-h-[80%] rounded-none sm:rounded-12px text flex flex-col transition-colors duration-600 ease-in-out pointer-events-auto`}
    >
      {isPageOpen && showScrollHeader && (
        <ScrollHeader
          slug={data.slug}
          title={data.title as string}
          onCloseHandler={ClosePageOrchestrationWithHeader}
        />
      )}

      <Link
        href={isPageOpen ? "/journal" : `journal/${data.slug}`}
        className={isPageOpen ? "pointer-events-none" : "pointer-events-auto"}
        prefetch
        scroll
      >
        <motion.div
          layout
          className={`${
            isPageOpen ? "cursor-auto p-24px" : "cursor-pointer"
          } flex flex-row justify-between h-fit`}
        >
          <motion.div layout="position" className={`flex flex-col gap-4px`}>
            <motion.h2
              layout="position"
              className={`text ${
                isPageOpen ? "text-lead" : "text-body"
              } transition-all ease-linear`}
            >
              {data.title}
            </motion.h2>
            <motion.div
              layout="position"
              className={`text-caption text-subtle`}
            >
              {EntryDate}
            </motion.div>
          </motion.div>

          <motion.div
            layout
            className="flex flex-row items-center justify-end h-fit gap-8px w-fit"
          >
            <motion.div
              layout="position"
              className={`${
                isPageOpen ? "invisible md:visible" : "visible"
              } h-fit flex items-center rounded-10px px-10px py-8px transition-colors duration-500 ease-in-out bg-subtle/40`}
            >
              <Text size="caption" className="text-subtle text-nowrap">
                {EntryTag.name as string}
              </Text>
            </motion.div>
            {(isPageOpen || isContentOpen) && (
              <CloseButton onClick={ClosePageOrchestration} />
            )}
          </motion.div>
        </motion.div>
      </Link>

      <AnimatePresence onExitComplete={() => setIsPageOpen(false)}>
        {isContentOpen && (
          <ContentContainer key={`content-${data.slug}`} content={content} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ContentContainer = ({ content }: { content: ReactNode }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      // console.log("Content Mounted");
    }

    if (!isPresent) {
      // console.log("Content Dismounted");

      const exitAnimation = async () => {
        await animate(scope.current, { height: 0, opacity: 0 });

        safeToRemove();
      };

      exitAnimation();
      // console.log("Animation done");
    }
  }, [isPresent]);

  return (
    <motion.div layout ref={scope} className="flex flex-col gap-16px px-24px">
      <motion.hr layout key="hr" exit={{ opacity: 0 }} />
      <motion.div
        layout="position"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-16px"
      >
        <Suspense
          fallback={
            <motion.div
              layout="position"
              exit={{ opacity: 0, translateY: 40 }}
              className="w-full h-full min-h-[100px] flex flex-col items-center"
            >
              Loading entry
            </motion.div>
          }
        >
          {/* <AnimatePresence>{content}</AnimatePresence> */}
        </Suspense>
      </motion.div>
    </motion.div>
  );
};

const CloseButton = ({ onClick }: { onClick: () => {} }) => {
  return (
    <motion.div
      onClick={() => onClick()}
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-2px flex rounded-4px h-fit bg hover:bg-subtle border shadow-sm cursor-pointer pointer-events-auto"
    >
      <XIcon size={20} />
    </motion.div>
  );
};

const ScrollHeader = ({
  title,
  onCloseHandler,
}: {
  layoutId?: string;
  title: string;
  slug: string;
  onCloseHandler: () => void;
}) => {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, top: "0px" }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`journal-page-header w-full sticky z-10 -mb-[48px] flex px-24px py-12px bg shadow-2xl`}
    >
      <motion.div layout className="w-full">
        <motion.div
          layout
          className={`w-full flex flex-row justify-between items-center`}
        >
          <motion.h2
            layout
            className={`text-body-large font-medium ease-linear text`}
          >
            {title}
          </motion.h2>
          <Link href="/journal" onClick={() => onCloseHandler()} prefetch>
            <motion.div
              layout
              className="cursor-pointer hover:bg-subtle flex flex-row items-center gap-4px text-caption pl-4px border p-4px rounded-4px bg shadow-sm"
            >
              Close
              <XIcon size={12} />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default JournalPage;
