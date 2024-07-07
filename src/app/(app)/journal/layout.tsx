"use client";
import Text from "@/components/Text";
import SectionDivider from "@/components/SectionDivider";
import React, { ReactNode, useEffect, useState } from "react";
import Template from "./template";
import { motion, AnimatePresence, LayoutGroup, stagger } from "framer-motion";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import JournalPage from "@/components/JournalPage";
import JournalEntries from "../sample-payload/journal-entries";

const Layout = ({ content }: { content: ReactNode }) => {
  const path = usePathname();
  const [showOverlay, setShowOverlay] = useState(false);
  const [allEntries, setAllEntries] = useState<
    { year: string; entries: typeof JournalEntries }[] | null
  >(null);

  useEffect(() => {
    if (path === "/journal") setShowOverlay(false);
    else setShowOverlay(true);
  }, [path]);

  useEffect(() => {
    const allYearPublished = JournalEntries.reduce<string[]>((arr, entry) => {
      const year = new Date(entry.date).getFullYear().toString();
      if (!arr.includes(year)) {
        arr.push(year);
      }

      return arr;
    }, []);

    const entries = allYearPublished.map((year) => ({
      year: year,
      entries: JournalEntries.filter((entry) => {
        const yearPublished = new Date(entry.date).getFullYear().toString();

        if (year === yearPublished) {
          return { title: entry.title, tag: entry.tag, date: entry.date };
        }
      }),
    }));

    setAllEntries(entries);
  }, []);

  return (
    <>
      <main className="max-w-[500px] mx-auto flex flex-col gap-40px my-[80px]">
        <div className="flex flex-col gap-4px">
          <Text as="h1" size="heading" weight="normal">
            Journal
          </Text>
          <Text
            as="h3"
            size="body-large"
            weight="normal"
            multiline
            className="text-subtle mr-40px"
          >
            Space to share my thoughts, rants, ephiphanies and comments about
            random things in life.
          </Text>
        </div>

        <Template key="journal-template">
          {allEntries &&
            allEntries.map((entry) => (
              <LayoutGroup key={`collection-${entry.year}`}>
                <motion.div
                  className="flex flex-col items-center justify-center gap-16px"
                  key={`collection-${entry.year}`}
                >
                  <SectionDivider header={entry.year} />
                  {entry.entries.map((page) => (
                    <JournalPage
                      data={page}
                      content={content}
                      key={`page-${page.slug}`}
                      overlayControl={setShowOverlay}
                    />
                  ))}
                </motion.div>
              </LayoutGroup>
            ))}

          {showOverlay && <Overlay setShow={setShowOverlay} />}
        </Template>
      </main>
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

export default Layout;
