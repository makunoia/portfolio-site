import React, { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Text from "./Text";
import Link from "next/link";
import {
  useSelectedLayoutSegment,
  usePathname,
  useRouter,
} from "next/navigation";
import journalEntries from "../sample-payload/journal-entries";
import { XIcon } from "lucide-react";

// TO DO
// FIX MOUNT ANIMATION ON LINK VISIT
// HOVER INTERACTION
// INSTANT RESPONSE ON CLICK

const JournalPage = ({
  content,
  data,
  overlayControl,
}: {
  content: ReactNode;
  data: (typeof journalEntries)[0];
  overlayControl: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const page = useRef<HTMLDivElement>(null);
  const currPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll({ container: page });
  const [showScrollHeader, setShowScrollHeader] = useState(false);

  useMotionValueEvent(scrollY, "change", () => {
    if (scrollY.get() > 40) setShowScrollHeader(true);
    else setShowScrollHeader(false);
  });

  useEffect(() => {
    console.log("path changed");
    if (currPath.includes(data.slug)) console.log("one match");

    setIsOpen(currPath.includes(data.slug));
  }, [currPath]);

  const router = useRouter();
  const onCloseHandler = () => {
    page.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    router.replace("/journal");
    setIsOpen(false);
    overlayControl(false);
  };

  return (
    <motion.div
      layout
      ref={page}
      id={`journal-page-${data.slug}`}
      animate={isOpen ? { opacity: 1 } : { opacity: 1 }}
      className={` ${
        isOpen
          ? "fixed top-40px z-50 bg border rounded-12px shadow overflow-scroll sm:mx-16px md:0px"
          : "relative"
      } group max-w-[650px] w-full max-h-[80%] text flex flex-col gap-16px transition-colors ease-in-out pointer-events-auto`}
    >
      <AnimatePresence>
        {isOpen && showScrollHeader && (
          <ScrollHeader
            slug={data.slug}
            title={data.title}
            onCloseHandler={onCloseHandler}
          />
        )}
      </AnimatePresence>

      {/* HOVER ELEMENT */}
      {/* <div className="absolute h-full w-full bg pointer-events-none -z-10 rounded-4px -top-16px -left-16px -right-16px -bottom-16px -"></div> */}

      <Link
        href={isOpen ? "/journal" : `journal/${data.slug}`}
        className={isOpen ? "pointer-events-none" : "pointer-events-auto"}
        prefetch
        scroll
      >
        <motion.div
          layout
          className={`${
            isOpen ? "cursor-auto p-24px pb-0px" : "cursor-pointer"
          } flex flex-row justify-between`}
        >
          <motion.div layout="position" className={`flex flex-col gap-4px`}>
            <motion.h2
              layout="position"
              className={`text ${
                isOpen ? "text-lead" : "text-body"
              } transition-all ease-linear`}
            >
              {data.title}
            </motion.h2>
            <motion.div
              layout="position"
              className={`text-caption text-subtle`}
            >
              {data.date}
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-row items-center h-fit gap-8px">
            <motion.div
              layout
              className="flex h-fit items-center rounded-10px px-10px py-8px transition-colors duration-500 ease-in-out bg-subtle/40"
            >
              <Text size="caption" className="text-subtle text-nowrap">
                {data.tag}
              </Text>
            </motion.div>
            <AnimatePresence>{isOpen && <CloseButton />}</AnimatePresence>
          </motion.div>
        </motion.div>
      </Link>

      {isOpen && (
        <>
          <motion.hr layout exit={{ opacity: 0 }} />
          <motion.div layout id={`content-${data.slug}`}>
            <Suspense fallback={<div>Temporary Fallback</div>}>
              {content}
            </Suspense>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

const CloseButton = () => {
  return (
    <motion.div
      layout="position"
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
      className={`journal-page-header sticky z-10 -mb-[64px] flex px-24px py-12px bg-subtle/30 backdrop-blur-md`}
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
