import React from "react";
import Text from "./Text";

type SectionDividerProps = {
  header: string;
  id?: string;
};

const SectionDivider = ({ header, id }: SectionDividerProps) => {
  return (
    <div id={id} className="flex flex-row gap-16px items-center">
      <Text
        size="overline"
        className="text-nowrap text-subtle uppercase tracking-widest"
      >
        {header}
      </Text>
      <hr />
    </div>
  );
};

export default SectionDivider;
