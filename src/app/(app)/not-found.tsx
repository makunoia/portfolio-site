import React, { Suspense } from "react";

import Text from "@/components/Text";
import PageListSkeleton from "@/components/Skeletons/PageList";
import ListContainer from "@/components/Home/ListContainer";
import BackButton from "@/app/(app)/components/Projects/BackButton";

import config from "@payload-config";
import { getPayload } from "payload";
const payload = await getPayload({ config });

import { Project } from "payload-types";

export default async function NotFound() {
  const { docs } = await payload.find({
    collection: "projects",
    limit: 5,
    sort: "-year",
    where: {
      isLocked: {
        equals: false,
      },
    },
  });

  const items = docs as Project[];

  return (
    <main className="max-w-[500px] mx-auto my-[80px] flex flex-col gap-40px">
      <div className="flex flex-col gap-8px">
        <BackButton />
        <div className="flex flex-col gap-4px">
          <Text size="heading">You might be lost</Text>
          <Text size="body" className="text-fg-subtle" multiline>
            What you're looking for does not exist
          </Text>
        </div>
      </div>

      <hr />
      <div className="flex flex-col gap-24px">
        <Text size="body-large" weight="medium">
          Explore my projects
        </Text>
        <Suspense fallback={<PageListSkeleton />}>
          <ListContainer link="/projects" items={items} />
        </Suspense>
      </div>
    </main>
  );
}
