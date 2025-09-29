import React, {ReactNode} from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import Text from "./Text";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-8px",
    "isolate overflow-hidden",
    "rounded-8px border border-[color:var(--primitive-300)]",
    "bg-[color:var(--primitive-100)] clip-path-[margin-box]",
    "transition-[border-color,box-shadow] duration-300 ease-out",
    "px-12px py-10px",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:color-mix(in_oklch,var(--fg-default)_35%,transparent)]",
    "disabled:cursor-not-allowed disabled:opacity-70",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "bg-[color:var(--primitive-100)]",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        md: "h-[40px]",
        lg: "h-[48px]",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
      fullWidth: false,
    },
  }
);

export type ButtonProps = {
  asChild?: boolean;
  icon?: ReactNode;
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      icon,
      children,
      label,
      className,
      variant = "solid",
      size = "md",
      fullWidth = false,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const classes = buttonVariants({variant, size, fullWidth});

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`${classes} ${className ?? ""}`.trim()}
        style={{boxShadow: "var(--shadow-default)"}}
        type={type}
        {...rest}
      >
        <span className="pointer-events-none absolute inset-[1px] -z-10 rounded-[6px] opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100 bg-[linear-gradient(22deg,rgba(229,231,235,0)_0%,rgba(229,231,235,0.18)_45%,rgba(229,231,235,0.52)_70%,rgba(243,244,246,0.85)_100%)] dark:bg-[linear-gradient(22deg,transparent_0%,color-mix(in_oklch,var(--fg-default)_04%,transparent)_46%,color-mix(in_oklch,var(--fg-default)_09%,transparent)_72%,color-mix(in_oklch,var(--fg-default)_15%,transparent)_100%)] mix-blend-screen" />
        {icon ? <span className="flex items-center">{icon}</span> : null}
        {children ? (
          children
        ) : label ? (
          <Text size="caption" weight="medium" className="text-fg-default">
            {label}
          </Text>
        ) : null}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
