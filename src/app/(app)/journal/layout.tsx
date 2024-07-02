"use client";
import Text from "@/components/Text";
import SectionDivider from "@/components/SectionDivider";
import React, { ReactNode, useEffect, useState } from "react";
import Template from "./template";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import JournalPage from "@/components/JournalPage";
import JournalEntries from "../sample-payload/journal-entries";

const Layout = ({ content }: { content: ReactNode }) => {
  const hasOpenPage = useSelectedLayoutSegment("content");
  const [allEntries, setAllEntries] = useState<
    { year: string; entries: typeof JournalEntries }[] | null
  >(null);

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
          {hasOpenPage && <Overlay />}
          {allEntries &&
            allEntries.map((entry) => (
              <LayoutGroup>
                <motion.div
                  initial={{ translateY: 40, opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  key={`collection-${entry.year}`}
                  className="flex flex-col gap-16px"
                >
                  <SectionDivider header={entry.year} />
                  {entry.entries.map((page) => (
                    <JournalPage
                      key={`page-${page.slug}`}
                      data={page}
                      content={content}
                    />
                  ))}
                </motion.div>
              </LayoutGroup>
            ))}
        </Template>
      </main>
    </>
  );
};

const Overlay = () => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        onClick={() => router.back()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="absolute bg inset-0px z-10"
      />
    </AnimatePresence>
  );
};

export default Layout;
