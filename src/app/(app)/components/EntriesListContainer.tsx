import React, { ReactNode } from "react";
import EntriesList from "@/components/EntriesList";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { GroupByYear } from "../lib/helpers";
import { JournalEntriesByYear } from "../types";

const getEntries = async () => {
  const payload = await getPayloadHMR({ config });
  const { docs } = await payload.find({
    collection: "journal-entries",
  });

  return GroupByYear(docs, "journal-entries");
};

//This component is made to establish a Network Boundary within the page to utilize Suspense
const EntriesListContainer = async ({ content }: { content: ReactNode }) => {
  const entries = (await getEntries()) as JournalEntriesByYear;
  return <EntriesList content={content} entries={entries} />;
};

export default EntriesListContainer;
