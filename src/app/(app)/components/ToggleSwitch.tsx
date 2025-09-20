"use client";

import {motion} from "motion/react";

type ToggleSwitchProps = {
  leftLabel: string;
  rightLabel: string;
  isRightActive: boolean;
  onToggle: (isRightActive: boolean) => void;
  className?: string;
};

const ToggleSwitch = ({
  leftLabel,
  rightLabel,
  isRightActive,
  onToggle,
  className = "",
}: ToggleSwitchProps) => {
  return (
    <div className={`flex items-center gap-16px ${className}`}>
      <span className="text-body font-medium text-fg-default">{leftLabel}</span>

      <button
        onClick={() => onToggle(!isRightActive)}
        className="relative w-[35px] h-[22px] rounded-24px p-1px cursor-pointer"
        style={{
          background: "var(--brand)",
        }}
        aria-label={`Toggle between ${leftLabel} and ${rightLabel}`}
      >
        <motion.div
          className="w-[14px] h-[14px] rounded-full shadow-sm bg-white"
          animate={{
            x: isRightActive ? 18 : 4,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>

      <span className="text-body font-medium text-fg-default">
        {rightLabel}
      </span>
    </div>
  );
};

export default ToggleSwitch;
