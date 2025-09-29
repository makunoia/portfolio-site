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
  const handleSetActive = (nextIsRightActive: boolean) => {
    if (nextIsRightActive !== isRightActive) {
      onToggle(nextIsRightActive);
    }
  };

  return (
    <div className={`flex items-center gap-16px ${className}`}>
      <button
        type="button"
        onClick={() => handleSetActive(false)}
        className="text-body font-normal text-fg-default select-none cursor-pointer bg-transparent border-0 p-0"
        aria-pressed={!isRightActive}
      >
        {leftLabel}
      </button>

      <button
        type="button"
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

      <button
        type="button"
        onClick={() => handleSetActive(true)}
        className="text-body text-fg-default select-none cursor-pointer bg-transparent border-0 p-0"
        aria-pressed={isRightActive}
      >
        {rightLabel}
      </button>
    </div>
  );
};

export default ToggleSwitch;
