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

import { formatDate, isProject, isJournalEntry } from "@/helpers";
import { LayoutGroup, motion, stagger } from "framer-motion";

const ListContainer = async ({
  link,
  items,
}: {
  link: string;
  items: Project[] | JournalEntry[];
}) => {
  const frameVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 80,
      },
    },
  };

  return (
    <>
      {items ? (
        <motion.div
          className="flex flex-col gap-16px"
          variants={frameVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => {
            if (isProject(item)) {
              const tag: ProjectTag = item.tag as ProjectTag;
              return (
                <motion.div
                  className="w-full h-fit"
                  variants={itemVariants}
                  key={item.id}
                >
                  <ListItem
                    title={item.title}
                    tag={tag.name}
                    date={item.year}
                    url={`/projects/${item.slug}`}
                  />
                </motion.div>
              );
            } else if (isJournalEntry(item)) {
              const tag: JournalEntryTag = item.tag as JournalEntryTag;
              const date = formatDate(new Date(item.date));
              return (
                <motion.div
                  className="w-full h-fit"
                  variants={itemVariants}
                  key={item.id}
                >
                  <ListItem
                    title={item.title}
                    tag={tag.name}
                    date={date}
                    url={`/journal/${item.slug}`}
                  />
                </motion.div>
              );
            }
          })}

          <motion.div className="w-full h-fit" variants={itemVariants}>
            <Link href={link} className="w-full" as={link}>
              <Button label="View all" fullWidth />
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <div className="text">No records found.</div>
      )}
    </>
  );
};

export default ListContainer;
