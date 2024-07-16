"use client";
import React, { ReactNode, useEffect, useState } from "react";

import Text from "@/components/Text";
import JournalPage from "@/components/JournalPage";
import SectionDivider from "@/components/SectionDivider";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { JournalEntry } from "payload-types";
import Users from "@/app/(payload)/collections/Users";
import JournalEntriesList from "../components/JournalEntriesList";
import { GroupByYear, JournalEntriesByYear } from "@/lib/utils";
import journalEntries from "../sample-payload/journal-entries";

const Layout = ({ content }: { content: ReactNode }) => {
  const path = usePathname();
  const queryURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal-entries`;

  const [showOverlay, setShowOverlay] = useState(false);
  const [AllEntriesByYear, setAllEntriesByYear] =
    useState<JournalEntriesByYear | null>(null);

  useEffect(() => {
    if (path === "/journal") setShowOverlay(false);
    else setShowOverlay(true);
  }, [path]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(queryURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Users.slug} API-Key ${process.env.NEXT_PUBLIC_PAYLOAD_API_KEY}`,
        },
      });

      const data = await response.json();
      const allEntries: JournalEntry[] = data.docs;

      const allEntriesByYear: JournalEntriesByYear = GroupByYear(
        allEntries as JournalEntry[],
        "journal-entries"
      ) as JournalEntriesByYear;

      console.log(allEntriesByYear);
      setAllEntriesByYear(allEntriesByYear);
    };

    fetchData();
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

        {AllEntriesByYear ? (
          AllEntriesByYear.map((entry) => (
            <LayoutGroup key={`collection-${entry.year}`}>
              <motion.div
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
          <div>No records</div>
        )}

        {showOverlay && <Overlay setShow={setShowOverlay} />}
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
