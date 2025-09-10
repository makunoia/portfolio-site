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
      <span className="text-body font-medium text">{leftLabel}</span>

      <button
        onClick={() => onToggle(!isRightActive)}
        className="relative w-[35px] h-[22px] rounded-24px p-1px focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
        style={{
          background: "hsl(var(--brand))",
        }}
        aria-label={`Toggle between ${leftLabel} and ${rightLabel}`}
      >
        <motion.div
          className="w-[14px] h-[14px] rounded-full bg-inverse shadow-sm"
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

      <span className="text-body font-medium text">{rightLabel}</span>
    </div>
  );
};

export default ToggleSwitch;
