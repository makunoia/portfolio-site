export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";

import Text from "@/components/Text";
import Showcase from "@/components/Showcase";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

// TO DO
// Use Lexical Editor for content
// Loading State
// Align Props with PayLoad

const Content = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const { docs } = await payload.find({
    collection: "journal-entries",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const content = docs[0].blocks;
  return (
    <>
      {content ? (
        content.map((block) => {
          return (
            <div key={block.id} className="flex flex-col gap-16px">
              <div className="flex flex-col gap-8px">
                <Text size="body-large" as="h3" weight="medium">
                  {block.lead}
                </Text>
                <Text size="body" multiline>
                  {block.copy}
                </Text>
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
        <div>No content.</div>
      )}
    </>
  );
};

export default Content;
