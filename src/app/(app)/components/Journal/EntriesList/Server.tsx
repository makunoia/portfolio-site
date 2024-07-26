import React, { ReactNode } from "react";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

import { JournalEntriesByYear } from "@/types";
import { GroupByYear } from "@/helpers";

import JournalList from "./Client";

const getEntries = async () => {
  const payload = await getPayloadHMR({ config });
  const { docs } = await payload.find({
    collection: "journal-entries",
  });

  return GroupByYear(docs);
};

//This component is made to establish a Network Boundary within the page to utilize Suspense
const JournalEntriesList = async ({ content }: { content: ReactNode }) => {
  const entries = (await getEntries()) as JournalEntriesByYear;
  return <JournalList content={content} entries={entries} />;
};

export default JournalEntriesList;
