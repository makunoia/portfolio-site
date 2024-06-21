import React from "react";
import Text from "./Text";
import { cva } from "class-variance-authority";

const BadgeStyle = cva([
  "relative flex gap-8px items-center w-fit",
  "text py-10px px-12px rounded-8px",
  "bg-clip-padding box-border",
]);

const IndicatorStyle = cva("rounded-full w-8px h-8px animate-pulse", {
  variants: {
    unavailable: {
      true: "bg-danger",
      false: "bg-success",
    },
  },
});

type BadgeType = {
  label?: string;
  unavailable?: boolean;
};

const StatusBadge = ({ label, unavailable = false }: BadgeType) => {
  const badgeStyle = BadgeStyle();
  const indicatorStyle = IndicatorStyle({ unavailable });
  return (
    <div className={`${badgeStyle} status-badge`}>
      <div className={indicatorStyle}></div>
      <Text
        size="caption"
        weight="normal"
        className="uppercase tracking-widest"
      >
        {label ? label : unavailable ? "Occupied with work" : "Open for work"}
      </Text>
    </div>
  );
};

export default StatusBadge;
