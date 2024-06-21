import React, { HTMLAttributes } from "react";
import Text from "./Text";
import { cva } from "class-variance-authority";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const ButtonStyle = cva([
  "relative h-40px p-12px box-border",
  "inline-flex justify-center items-center border rounded-8px",
]);

const Button = ({ label, ...props }: ButtonProps) => {
  const buttonStyle = ButtonStyle();
  return (
    <button className={`${buttonStyle} button group`}>
      <div className="button-bg group-hover:opacity-40 group-hover:translate-x-[80px] transition-all ease-in-out duration-300" />
      <Text size="caption" weight="medium" className="text">
        {label}
      </Text>
    </button>
  );
};

export default Button;
