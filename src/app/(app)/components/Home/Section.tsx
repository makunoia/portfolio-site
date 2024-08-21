import Text from "@/components/Text";
import ListContainer from "./ListContainer";
import { JournalEntry, Project } from "payload-types";

const PageSection = ({
  title,
  link,
  items,
}: {
  title: string;
  link: string;
  items: Project[] | JournalEntry[];
}) => {
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
