import Link from "next/link";
import ListItem from "@/components/Home/ListItem";
import Button from "@/components/Button";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

import { CollectionSlug } from "payload";
import {
  ProjectTag,
  JournalEntryTag,
  Project,
  JournalEntry,
} from "payload-types";

import { formatDate, isProject, isJournalEntry } from "@/helpers";
const payload = await getPayloadHMR({ config });

const ListContainer = async ({
  link,
  collection,
}: {
  link: string;
  collection: CollectionSlug;
}) => {
  const { docs } = await payload.find({
    collection,
    limit: 3,
    sort: "-createdAt",
  });

  const items = docs as Project[] | JournalEntry[];

  return (
    <>
      <div className="flex flex-col gap-16px">
        {items ? (
          items.map((item) => {
            if (isProject(item)) {
              const tag: ProjectTag = item.tag as ProjectTag;
              return (
                <ListItem
                  key={item.id}
                  title={item.title}
                  tag={tag.name}
                  date={item.year}
                  url={`/projects/${item.slug}`}
                />
              );
            } else if (isJournalEntry(item)) {
              const tag: JournalEntryTag = item.tag as JournalEntryTag;
              const date = formatDate(new Date(item.date));
              return (
                <ListItem
                  key={item.id}
                  title={item.title}
                  tag={tag.name}
                  date={date}
                  url={`/journal/${item.slug}`}
                />
              );
            }
          })
        ) : (
          <div>No records found.</div>
        )}
      </div>
      <Link href={link} className="w-full" as={link}>
        <Button label="View all" fullWidth />
      </Link>
    </>
  );
};

export default ListContainer;
