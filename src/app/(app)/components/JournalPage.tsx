import React, {
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import journalEntries from "../sample-payload/journal-entries";
import { XIcon } from "lucide-react";
import { OpenJournalPageCTX } from "../contexts/OpenJournalPage";

// TO DO
// FIX MOUNT ANIMATION ON LINK VISIT
// HOVER INTERACTION
// INSTANT RESPONSE ON CLICK

const JournalPage = ({
  content,
  data,
}: {
  content: ReactNode;
  data: (typeof journalEntries)[0];
}) => {
  const page = useRef<HTMLDivElement>(null);
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [showScrollHeader, setShowScrollHeader] = useState(false);
  const { scrollY } = useScroll({ container: page });
  const currPath = usePathname();

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
    console.log("Closing page...");
    setIsContentOpen(false);
    // await delay(400);
    // setIsPageOpen(false);
  };

  const ClosePageOrchestrationWithHeader = async () => {
    console.log("Closing page with header...");
    page.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsContentOpen(false);
    // await delay(200);
    // setIsPageOpen(false);
  };

  const OpenPageOrchestration = async () => {
    console.log("Opening page...");
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
          ? "fixed top-0px sm:top-40px z-50 bg border rounded-none sm:rounded-12px shadow overflow-y-scroll overflow-x-hidden mx-0px sm:mx-[10%]"
          : "relative"
      } group sm:min-w-[500px] w-full sm:w-fit max-h-[80%] text flex flex-col transition-colors duration-600 ease-in-out pointer-events-auto`}
    >
      <AnimatePresence>
        {isPageOpen && showScrollHeader && (
          <ScrollHeader
            slug={data.slug}
            title={data.title}
            onCloseHandler={ClosePageOrchestrationWithHeader}
          />
        )}
      </AnimatePresence>

      {/* HOVER ELEMENT */}
      {/* <div className="absolute h-full w-full bg pointer-events-none -z-10 rounded-4px -top-16px -left-16px -right-16px -bottom-16px -"></div> */}

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
              {data.date}
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
                {data.tag}
              </Text>
            </motion.div>
            {/* <AnimatePresence> */}
            {(isPageOpen || isContentOpen) && (
              <CloseButton onClick={ClosePageOrchestration} />
            )}
            {/* </AnimatePresence> */}
          </motion.div>
        </motion.div>
      </Link>

      <AnimatePresence>
        {isContentOpen && (
          <ContentContainer
            key={`content-${data.slug}`}
            slug={data.slug}
            content={content}
            setIsPageOpen={setIsPageOpen}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ContentContainer = ({
  slug,
  content,
  setIsPageOpen,
}: // setIsContentOpen,
{
  slug: string;
  content: ReactNode;
  setIsPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      console.log("Content Mounted");
    }

    if (!isPresent) {
      console.log("Content Dismounted");
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { height: 0, opacity: 0 }
          // { type: "spring", damping: 100, stiffness: 400, duration: 0.2 }
        );

        safeToRemove();
        setIsPageOpen(false);
      };

      exitAnimation();
      console.log("Animation done");
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
          <AnimatePresence>{content}</AnimatePresence>
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
      className={`journal-page-header w-full sticky z-10 -mb-[48px] flex px-24px py-12px bg shadow-md`}
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
