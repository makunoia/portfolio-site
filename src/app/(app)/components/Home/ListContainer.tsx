"use client";

import Link from "next/link";
import ListItem from "@/components/Home/ListItem";
import Button from "@/components/Button";
import {
  ProjectTag,
  JournalEntryTag,
  Project,
  JournalEntry,
} from "payload-types";

import {
  formatDate,
  isProject,
  isJournalEntry,
  AnimationVariants,
} from "@/lib/helpers";

import {m, LazyMotion, domAnimation} from "motion/react";

const ListContainer = ({
  link,
  items,
}: {
  link: string;
  items: Project[] | JournalEntry[];
}) => {
  return (
    <>
      <LazyMotion features={domAnimation}>
        {items.length ? (
          <m.div
            className="flex flex-col gap-16px"
            variants={AnimationVariants.container}
            initial="hidden"
            animate="visible"
          >
            {items.map((item) => {
              if (isProject(item)) {
                const {title, year, slug, isLocked, id} = item;
                const tag: ProjectTag = item.tag as ProjectTag;
                return (
                  <m.div
                    className="w-full h-fit"
                    variants={AnimationVariants.item}
                    key={id}
                  >
                    {isLocked ? (
                      <ListItem
                        title={title}
                        tag={tag.name}
                        date={year}
                        url={`/projects/${slug}`}
                        locked={true}
                        codename={item.lockedData?.codename as string}
                      />
                    ) : (
                      <ListItem
                        title={title}
                        tag={tag.name}
                        date={year}
                        url={`/projects/${slug}`}
                        locked={false}
                      />
                    )}
                  </m.div>
                );
              } else if (isJournalEntry(item)) {
                const tag: JournalEntryTag = item.tag as JournalEntryTag;
                const date = formatDate(new Date(item.date));
                return (
                  <m.div
                    className="w-full h-fit"
                    variants={AnimationVariants.item}
                    key={item.id}
                  >
                    <ListItem
                      title={item.title}
                      tag={tag.name}
                      date={date}
                      locked={false}
                      url={`/journal/${item.slug}`}
                    />
                  </m.div>
                );
              }
            })}

            <m.div className="w-full h-fit" variants={AnimationVariants.item}>
              <Link href={link} className="w-full" as={link}>
                <Button label="View all" fullWidth />
              </Link>
            </m.div>
          </m.div>
        ) : (
          <div className="text-fg-default">No records found.</div>
        )}
      </LazyMotion>
    </>
  );
};

export default ListContainer;
