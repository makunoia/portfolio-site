"use client";
import React, { HTMLAttributes } from "react";
import Text from "./Text";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { Mixpanel } from "@/lib/mp-actions";

const ButtonCVA = cva([
  "group",
  "inline-flex justify-center items-center",
  "shadow-neutral-800",
]);

const LinkButton = ({
  label,
  href,
}: HTMLAttributes<HTMLButtonElement> & {
  label: string;
  href: string;
}) => {
  const ButtonStyle = ButtonCVA();
  return (
    <Link
      href={href}
      target="_blank"
      onClick={() => Mixpanel.track("Link Clicked", { Resource: label })}
    >
      <button className={`${ButtonStyle}`}>
        <Text as="span" size="caption" weight="medium" className="text">
          {label}
        </Text>
        <ArrowUpRight
          size={16}
          strokeWidth={1}
          className="transition-colors ease-in-out duration-150 stroke-neutral-700 group-hover:stroke-neutral-1100"
        />
      </button>
    </Link>
  );
};

export default LinkButton;
