import Text from "@/components/Text";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default () => {
  return (
    <section
      id="latestProjects"
      className="w-full flex flex-col gap-16px justify-between"
    >
      <div className="flex flex-row w-full justify-between">
        <Text as="h2" size="lead">
          Featured Projects
        </Text>

        <div className="flex flex-row gap-4px rounded-4px sm:rounded-12px">
          <ChevronLeft className="text-subtle/40 opacity-40" />
          <ChevronRight className="text-subtle/40 opacity-40" />
        </div>
      </div>

      <div className="animate-pulse bg-subtle/60 w-full h-[240px] sm:h-[290px] rounded-4px sm:rounded-12px" />
    </section>
  );
};
