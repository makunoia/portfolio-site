import Text from "./Text";
import {cva} from "class-variance-authority";

type StatusVariant = "employed" | "open";

const badge = cva(
  [
    "group relative isolate flex w-fit items-center gap-2 rounded-16px border border-transparent px-[12px] py-[10px] text-white cursor-default",
    "backdrop-blur-sm transition-transform duration-200 ease-out",
    "before:absolute before:-z-20 before:inset-0 before:rounded-10px before:content-[''] before:bg-[linear-gradient(180deg,var(--status-border-top)_0%,var(--status-border-bottom)_100%)]",
    "after:absolute after:-z-10 after:inset-[1px] after:rounded-[8px] after:content-[''] after:bg-[color:var(--status-fill)] after:transition-colors after:duration-200 after:ease-out",
  ].join(" "),
  {
    variants: {
      status: {
        employed: [
          "[--status-fill:#2563eb]",
          "[--status-border-top:#1d4ed8]",
          "[--status-border-bottom:#60a5fa]",
          "[--status-indicator:#bfdbfe]",
        ].join(" "),
        open: [
          "[--status-fill:#16a34a]",
          "[--status-border-top:#22c55e]",
          "[--status-border-bottom:#86efac]",
          "[--status-indicator:#bbf7d0]",
        ].join(" "),
      },
    },
    defaultVariants: {
      status: "open",
    },
  }
);

const indicator = cva(
  "h-2.5 w-2.5 rounded-full animate-pulse bg-[color:var(--status-indicator)]",
  {
    variants: {
      status: {
        employed: "",
        open: "",
      },
    },
    defaultVariants: {
      status: "open",
    },
  }
);

const StatusBadge = ({status}: {status?: StatusVariant}) => {
  const variant: StatusVariant = status === "employed" ? "employed" : "open";
  return (
    <div className={badge({status: variant})}>
      <div className={indicator({status: variant})} />
      <Text
        size="caption"
        weight="medium"
        className="uppercase tracking-[0.12em] text-nowrap text-white select-none"
      >
        {variant === "employed" ? "Currently employed" : "Open for work"}
      </Text>
    </div>
  );
};

export default StatusBadge;
