"use client";
import React, {HTMLAttributes} from "react";
import Text from "./Text";
import Link from "next/link";
import {cva} from "class-variance-authority";
import {ArrowUpRight} from "lucide-react";
import { trackEvent } from "../lib/mixpanel-browser";

const ButtonCVA = cva([
  "group cursor-pointer",
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
      onClick={() => trackEvent("Link Button Clicked", {label, href})}
    >
      <button className={`${ButtonStyle}`}>
        <Text
          as="span"
          size="caption"
          weight="medium"
          className="text-fg-default"
        >
          {label}
        </Text>
        <ArrowUpRight
          size={16}
          strokeWidth={1}
          className="transition-colors ease-in-out duration-150 stroke-neutral-800 group-hover:stroke-neutral-1100"
        />
      </button>
    </Link>
  );
};

export default LinkButton;
