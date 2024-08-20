export const fetchCache = "force-cache";
export const dynamic = "force-static";

import Text from "@/components/Text";
import ListContainer from "./ListContainer";
import { CollectionSlug } from "payload";
import { getCollection } from "@/lib/payload-actions";

const PageSection = async ({
  title,
  collection,
  link,
  sort,
  where,
}: {
  title: string;
  link: string;
  sort: string;
  collection: CollectionSlug;
  where?: {};
}) => {
  const args = { collection, limit: 3, sort, where };
  const items = await getCollection(args);

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
