import React, { HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import Text from "./Text";

const ButtonCVA = cva(
  [
    "relative overflow-hidden h-40px p-12px box-border",
    "inline-flex justify-center items-center border rounded-8px",
    "shadow-neutral-800",
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
  const ButtonStyle = ButtonCVA({ fullWidth });
  return (
    <button className={`${ButtonStyle} button group`}>
      <div className="button-bg group-hover:opacity-40 group-hover:translate-x-[80px] transition-all ease-in-out duration-300" />
      <Text size="caption" weight="medium" className="text">
        {label}
      </Text>
    </button>
  );
};

export default Button;
