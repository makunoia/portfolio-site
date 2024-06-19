import React, { ReactElement } from "react";
import Text from "./Text";

type BadgeType = {
  label: string;
  status?: "employed" | "open";
};

const Badge = ({ label, status }: BadgeType) => {
  return (
    <div className="badge">
      <div className="bg-success rounded-full w-2 h-2 animate-pulse"></div>
      <Text
        size="caption"
        weight="medium"
        className="uppercase tracking-widest"
      >
        {label}
      </Text>
    </div>
  );
};

export default Badge;
