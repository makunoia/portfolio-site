import Text from "@/components/Text";
import ListContainer from "./ListContainer";
import {JournalEntry, Project} from "payload-types";
import {motion} from "motion/react";

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
    <motion.section
      className="w-full mt-40px flex flex-col gap-16px md:flex-row md:gap-0px justify-between"
      layout
      transition={{duration: 0.3, ease: "easeInOut"}}
    >
      <motion.div
        className="w-full md:max-w-[250px] flex flex-col flex-1"
        layout
        transition={{duration: 0.3, ease: "easeInOut"}}
      >
        <Text as="h2" size="lead">
          {title}
        </Text>
      </motion.div>
      <motion.div
        className="w-full md:max-w-[400px] flex flex-col flex-grow flex-1 gap-24px"
        layout
        transition={{duration: 0.3, ease: "easeInOut"}}
      >
        <ListContainer link={link} items={items} />
      </motion.div>
    </motion.section>
  );
};

export default PageSection;
