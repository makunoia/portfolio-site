"use client";
import React, {ReactNode, useEffect, useState} from "react";

import JournalPage from "@/components/Journal/JournalPage";
import SectionDivider from "@/components/SectionDivider";
import {toast} from "sonner";

import {usePathname, useRouter} from "next/navigation";
import {
  m,
  LazyMotion,
  AnimatePresence,
  LayoutGroup,
  domAnimation,
} from "motion/react";
import {JournalEntriesByYear} from "@/types";
import {AnimationVariants} from "@/lib/helpers";

const JournalEntriesList = ({
  content,
  entries,
}: {
  content: ReactNode;
  entries: JournalEntriesByYear;
}) => {
  const path = usePathname();
  const router = useRouter();
  const isHomepage = path === "/journal";

  const [showOverlay, setShowOverlay] = useState(false);
  const [allEntrySlugs] = useState(
    entries
      ? entries.flatMap(({entries}) => entries.map((entry) => entry.slug))
      : []
  );
  const [AllEntriesByYear] = useState<JournalEntriesByYear | null>(entries);

  useEffect(() => {
    if (isHomepage) {
      setShowOverlay(false);
    } else {
      const isExistingEntry = allEntrySlugs.find((slug) => path.includes(slug));
      if (isExistingEntry) {
        setShowOverlay(true);
      } else {
        router.replace("/journal");
        toast.error("Entry not found", {
          description: "The entry you're trying to access doesn't exist",
        });
      }
    }
  }, [path]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={AnimationVariants.section}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-40px"
      >
        {AllEntriesByYear ? (
          AllEntriesByYear.map((entry) => (
            <LayoutGroup key={`collection-${entry.year}`}>
              <m.div
                variants={AnimationVariants.container}
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
              </m.div>
            </LayoutGroup>
          ))
        ) : (
          <div className="text">No records</div>
        )}

        {showOverlay && <Overlay setShow={setShowOverlay} />}
      </m.div>
    </LazyMotion>
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
      <m.div
        onClick={() => handleClick()}
        initial={{opacity: 0}}
        animate={{opacity: 0.4}}
        exit={{opacity: 0}}
        className="absolute bg inset-0px z-10"
      />
    </AnimatePresence>
  );
};

export default JournalEntriesList;
