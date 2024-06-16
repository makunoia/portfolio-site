import React, { ReactElement } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TextType = {
  children: string | ReactElement;
  size?:
    | "caption"
    | "body"
    | "body-large"
    | "overline"
    | "lead"
    | "heading"
    | "display";
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span";
  weight?: "normal" | "medium" | "bold";
  type?: "sans" | "mono";
  multiline?: boolean;
  className?: string;
};

const TextStyles = cva([], {
  variants: {
    size: {
      caption: "text-caption",
      body: "text-body",
      "body-large": "text-body-large",
      overline: "text-body-large capitalize",
      lead: "text-lead",
      heading: "text-heading",
      display: "text-display",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    type: {
      sans: "font-sans",
      mono: "font-mono",
    },
    multiline: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { multiline: true, size: "body", class: "leading-6" },
    { multiline: true, size: "lead", class: "leading-8" },
  ],
});

const Text = ({
  as: Component = "span",
  size,
  children,
  className,
  type = "sans",
  weight = "normal",
  multiline,
}: TextType) => {
  const styles = cn(TextStyles({ size, weight, multiline, type }), className);

  return <Component className={styles}>{children}</Component>;
};

export default Text;
