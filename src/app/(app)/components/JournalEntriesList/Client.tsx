"use client";
import React, { ReactNode, useEffect, useState } from "react";

import JournalPage from "@/components/JournalPage";
import SectionDivider from "@/components/SectionDivider";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { JournalEntriesByYear } from "@/types";
import StaggerAnimator from "../StaggerAnimator";

const JournalEntriesList = ({
  content,
  entries,
}: {
  content: ReactNode;
  entries: JournalEntriesByYear;
}) => {
  const path = usePathname();
  const [showOverlay, setShowOverlay] = useState(false);
  const [AllEntriesByYear, setAllEntriesByYear] =
    useState<JournalEntriesByYear | null>(entries);

  useEffect(() => {
    if (path === "/journal") setShowOverlay(false);
    else setShowOverlay(true);
  }, [path]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      {AllEntriesByYear ? (
        AllEntriesByYear.map((entry) => (
          <LayoutGroup key={`collection-${entry.year}`}>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center justify-center gap-16px"
              key={`collection-${entry.year}`}
            >
              <SectionDivider header={entry.year} />
              {entry.entries.map((entry) => (
                <JournalPage
                  data={entry}
                  content={content}
                  key={`page-${entry.slug}`}
                />
              ))}
            </motion.div>
          </LayoutGroup>
        ))
      ) : (
        <div className="text">No records</div>
      )}

      {showOverlay && <Overlay setShow={setShowOverlay} />}
    </>
  );
};

const Overlay = ({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.replace("/journal");
    setShow(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={() => handleClick()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="absolute bg inset-0px z-10"
      />
    </AnimatePresence>
  );
};

export default JournalEntriesList;
