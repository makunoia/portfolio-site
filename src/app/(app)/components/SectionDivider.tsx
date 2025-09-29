"use client";
import React from "react";
import {m, LazyMotion, domAnimation} from "motion/react";
import Text from "./Text";

const SectionDivider = ({header, id}: {header: string; id?: string}) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        layout
        id={id}
        className="flex flex-row gap-16px items-center w-full"
        transition={{type: "spring", damping: 50, stiffness: 400}}
      >
        <Text
          size="overline"
          className="text-nowrap text-fg-subtle uppercase tracking-widest"
        >
          {header}
        </Text>
        <hr />
      </m.div>
    </LazyMotion>
  );
};

export default SectionDivider;
