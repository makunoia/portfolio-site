import { Suspense } from "react";
import Text from "@/components/Text";
import ListContainer from "./ListContainer";
import { CollectionSlug } from "payload";

const PageSection = ({
  title,
  collection,
  link,
}: {
  title: string;
  link: string;
  collection: CollectionSlug;
}) => {
  return (
    <section className="w-full flex flex-col gap-16px md:flex-row md:gap-0px justify-between">
      <div className="w-full md:max-w-[250px] flex flex-col flex-1">
        <Text as="h2" size="lead">
          {title}
        </Text>
      </div>
      <div className="w-full md:max-w-[400px] flex flex-col flex-grow flex-1 gap-24px">
        <Suspense fallback={<div className="text">Loading...</div>}>
          <ListContainer link={link} collection={collection} />
        </Suspense>
      </div>
    </section>
  );
};

export default PageSection;
