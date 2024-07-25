import React from "react";
import Text from "./Text";
import { cva } from "class-variance-authority";

const BadgeCVA = cva(
  [
    "relative flex gap-8px items-center w-fit",
    "py-10px px-12px",
    "rounded-8px backdrop-blur-sm",
    "bg-clip-padding box-border",
  ],
  {
    variants: {
      status: {
        employed: "bg-info/10",
        open: "bg-success/10",
      },
    },
  }
);

const IndicatorCVA = cva("rounded-full w-8px h-8px animate-pulse", {
  variants: {
    status: {
      employed: "bg-info",
      open: "bg-success",
    },
  },
});

const StatusBadge = ({ status }: { status?: "employed" | "open" }) => {
  const BadgeStyle = BadgeCVA({ status });
  const IndicatorStyle = IndicatorCVA({ status });
  return (
    <div className={`${BadgeStyle}`}>
      <div className={IndicatorStyle}></div>
      <Text
        size="caption"
        weight="medium"
        className="uppercase tracking-widest"
      >
        {status === "employed" ? "Currently employed" : "Open for work"}
      </Text>
    </div>
  );
};

export default StatusBadge;
