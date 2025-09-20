"use client";
import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cva} from "class-variance-authority";
import {Slot} from "@radix-ui/react-slot";

import Text from "@/components/Text";
import {Home, Palette, NotebookText, User} from "lucide-react";
import ThemeToggle from "@/app/(app)/components/ThemeToggle";

const NavbarContainerCVA = cva([
  "sticky z-20 bottom-40px mx-auto w-fit h-40px",
]);

const NavbarCVA = cva([
  "navbar",
  "relative",
  "flex flex-row gap-8px md:gap-0px items-center p-4px rounded-8px",
]);

const NavbarButtonCVA = cva(
  [
    "navbar-button",
    "inline-flex cursor-pointer",
    "p-8px md:px-12px rounded-6px",
    "border border-transparent",
    "transition-colors ease-in-out duration-200",
  ],
  {
    variants: {
      active: {
        true: "is-active",
      },
    },
  }
);

const Navbar = () => {
  const NavbarContainerStyle = NavbarContainerCVA();
  const NavbarStyle = NavbarCVA();
  const slug = usePathname();

  return (
    <nav className={NavbarContainerStyle}>
      <div className={NavbarStyle}>
        <NavbarButton label="Home" url="/" icon={Home} active={slug === "/"} />
        <NavbarButton
          label="Projects"
          icon={Palette}
          url="/projects"
          active={slug === "/projects"}
        />
        <NavbarButton
          label="Journal"
          icon={NotebookText}
          url="/journal"
          active={slug === "/journal"}
        />
        <NavbarButton
          label="About Me"
          icon={User}
          url="/about-me"
          active={slug === "/about-me"}
        />
        <ThemeToggle className="ml-4px" />
      </div>
    </nav>
  );
};

const NavbarButton = ({
  label,
  icon: Icon,
  url,
  active,
}: {
  label: string;
  icon: React.ComponentType;
  url: string;
  active?: boolean;
}) => {
  const NavbarButtonStyle = NavbarButtonCVA({active});
  return (
    <Link prefetch href={url} as={url} aria-label={label}>
      <div className={NavbarButtonStyle}>
        <Slot className="text-fg-default w-24px h-24px block md:hidden">{<Icon />}</Slot>
        <Text size="body" className="text-nowrap hidden md:block">
          {label}
        </Text>
      </div>
    </Link>
  );
};

export default Navbar;
