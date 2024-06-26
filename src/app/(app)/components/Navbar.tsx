"use client";
import React from "react";
import { cva } from "class-variance-authority";
import Text from "@/components/Text";
import Link from "next/link";
import { Home, Palette, NotebookText, User, Sun, Moon } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavbarContainerCVA = cva(["sticky bottom-40px mx-auto w-fit h-40px"]);

const NavbarCVA = cva([
  "navbar",
  "relative",
  "flex flex-row gap-8px md:gap-0px items-center p-4px rounded-8px",
]);

const NavbarButtonCVA = cva(
  [
    "inline-flex cursor-pointer",
    "p-8px md:px-12px rounded-6px",
    "hover:bg-subtle/80",
    "transition-colors ease-in-out duration-200",
  ],
  {
    variants: {
      active: {
        true: "bg",
      },
    },
  }
);

const Navbar = () => {
  const NavbarContainerStyle = NavbarContainerCVA();
  const NavbarStyle = NavbarCVA();
  const slug = usePathname();

  console.debug(slug);
  return (
    <nav className={NavbarContainerStyle}>
      <div className={NavbarStyle}>
        <NavbarButton label="Home" to="/" icon={Home} active={slug === "/"} />
        <NavbarButton
          label="Projects"
          icon={Palette}
          to="/projects"
          active={slug === "/projects"}
        />
        <NavbarButton
          label="Journal"
          icon={NotebookText}
          to="/journal"
          active={slug === "/journal"}
        />
        <NavbarButton
          label="About Me"
          icon={User}
          to="/about-me"
          active={slug === "/about-me"}
        />
      </div>
    </nav>
  );
};

const NavbarButton = ({
  label,
  icon: Icon,
  to,
  active,
}: {
  label: string;
  icon: React.ComponentType;
  to: string;
  active?: boolean;
}) => {
  const NavbarButtonStyle = NavbarButtonCVA({ active });
  return (
    <Link href={to}>
      <div className={NavbarButtonStyle}>
        <Slot className="text w-24px h-24px block md:hidden">{<Icon />}</Slot>
        <Text size="body" className="text-nowrap hidden md:block">
          {label}
        </Text>
      </div>
    </Link>
  );
};

export default Navbar;
