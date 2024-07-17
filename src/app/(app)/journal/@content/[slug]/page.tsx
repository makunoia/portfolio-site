"use client";
import React, { useEffect, useState } from "react";
import Users from "@/app/(payload)/collections/Users";
import Text from "@/app/(app)/components/Text";
import { motion } from "framer-motion";
import { JournalEntry } from "payload-types";
import Showcase from "@/app/(app)/components/Showcase";

// TO DO
// Loading State
// Align Props with PayLoad

const JournalPage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const [content, setContent] = useState<JournalEntry["blocks"]>();

  useEffect(() => {
    const getEntries = async (slug: string) => {
      // const req = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/entries/${slug}`
      // );

      const req = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/journal-entries/?where[slug][equals]=${slug}`,
        {
          headers: {
            Authentication: `${Users.slug} API-Key ${process.env.PAYLOAD_API_KEY}`,
          },
        }
      );

      var content;
      if (req.ok) {
        const { docs } = await req.json();
        content = docs[0].blocks;

        setContent(content);
      } else {
        console.log(await req.json());
      }
    };

    getEntries(slug);
  }, [slug]);

  return (
    <motion.div
      layout="position"
      animate={{ height: "fit-content" }}
      transition={{ type: "spring", delay: 0.8, duration: 0.2 }}
      exit={{ height: 0, transition: { duration: 0.2 } }}
      className="flex flex-col gap-24px"
    >
      {content ? (
        content.map((block) => {
          return (
            <div key={block.id} className="flex flex-col gap-16px">
              <div className="flex flex-col gap-4px">
                <Text size="body-large" as="h3" weight="medium">
                  {block.lead}
                </Text>
                <Text size="body">{block.copy}</Text>
              </div>

              {block.showcase?.length ? (
                <Showcase
                  image={block.showcase[0].image}
                  title={block.showcase[0].title}
                  desc={block.showcase[0].desc}
                  tag={block.showcase[0].tag as string}
                />
              ) : null}
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </motion.div>
  );
};

export default JournalPage;
