import React, { ReactNode } from "react";
import { getEntries } from "@/lib/payload-actions";
import { JournalEntriesByYear } from "@/types";
import JournalList from "./Client";

//This component is made to establish a Network Boundary within the page to utilize Suspense
const JournalEntriesList = async ({ content }: { content: ReactNode }) => {
  const entries = (await getEntries()) as JournalEntriesByYear;
  return <JournalList content={content} entries={entries} />;
};

export default JournalEntriesList;
