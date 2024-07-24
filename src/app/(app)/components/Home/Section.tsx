import { Suspense } from "react";
import Text from "@/components/Text";
import ListContainer from "./ListContainer";
import { CollectionSlug } from "payload";
import { Project, JournalEntry } from "payload-types";

import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

const PageSection = async ({
  title,
  collection,
  link,
}: {
  title: string;
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
    <section className="w-full mt-40px flex flex-col gap-16px md:flex-row md:gap-0px justify-between">
      <div className="w-full md:max-w-[250px] flex flex-col flex-1">
        <Text as="h2" size="lead">
          {title}
        </Text>
      </div>
      <div className="w-full md:max-w-[400px] flex flex-col flex-grow flex-1 gap-24px">
        <ListContainer link={link} items={items} />
      </div>
    </section>
  );
};

export default PageSection;
