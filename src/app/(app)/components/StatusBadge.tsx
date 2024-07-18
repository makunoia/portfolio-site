import React from "react";
import Text from "./Text";
import { cva } from "class-variance-authority";

const BadgeCVA = cva([
  "relative flex gap-8px items-center w-fit",
  "bg-success/10 py-10px px-12px",
  "rounded-8px backdrop-blur-sm",
  "bg-clip-padding box-border",
]);

const IndicatorCVA = cva("rounded-full w-8px h-8px animate-pulse", {
  variants: {
    unavailable: {
      true: "bg-danger",
      false: "bg-success",
    },
  },
});

const StatusBadge = ({
  label,
  unavailable = false,
}: {
  label?: string;
  unavailable?: boolean;
}) => {
  const BadgeStyle = BadgeCVA();
  const IndicatorStyle = IndicatorCVA({ unavailable });
  return (
    <div className={`${BadgeStyle}`}>
      <div className={IndicatorStyle}></div>
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
