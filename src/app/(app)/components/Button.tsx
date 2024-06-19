import React, { HTMLAttributes } from "react";
import Text from "./Text";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button className="button">
      <div className="button-bg transition-all ease-in-out duration-300" />
      <Text weight="medium" className="text">
        {label}
      </Text>
    </button>
  );
};

export default Button;
