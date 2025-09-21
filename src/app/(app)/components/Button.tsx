import React, {HTMLAttributes} from "react";
import {cva} from "class-variance-authority";

import Text from "./Text";

const ButtonCVA = cva(
  [
    "group relative isolate h-[40px] overflow-hidden px-3 cursor-pointer",
    "inline-flex items-center justify-center rounded-8px border border-[color:var(--primitive-300)]",
    "bg-[color:var(--primitive-100)] clip-path-[margin-box]",
    "transition-[border-color,box-shadow] duration-300 ease-out",
  ],
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
  }
);

const Button = ({
  label,
  fullWidth,
}: HTMLAttributes<HTMLButtonElement> & {
  label: string;
  fullWidth?: boolean;
}) => {
  const ButtonStyle = ButtonCVA({fullWidth});
  return (
    <button
      className={ButtonStyle}
      style={{boxShadow: "var(--shadow-default)"}}
    >
      <span className="pointer-events-none absolute inset-[1px] -z-10 rounded-[6px] opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100 bg-[linear-gradient(22deg,rgba(229,231,235,0)_0%,rgba(229,231,235,0.18)_45%,rgba(229,231,235,0.52)_70%,rgba(243,244,246,0.85)_100%)] dark:bg-[linear-gradient(22deg,transparent_0%,color-mix(in_oklch,var(--fg-default)_04%,transparent)_46%,color-mix(in_oklch,var(--fg-default)_09%,transparent)_72%,color-mix(in_oklch,var(--fg-default)_15%,transparent)_100%)] mix-blend-screen" />
      <Text size="caption" weight="medium" className="text-fg-default">
        {label}
      </Text>
    </button>
  );
};

export default Button;
