import React from "react";
import { cva } from "class-variance-authority";
import Text from "@/components/Text";

const NavbarContainerCVA = cva(["sticky bottom-40px mx-auto w-fit h-40px"]);

const NavbarCVA = cva([
  "navbar",
  "relative",
  "flex flex-row items-center p-4px rounded-8px",
]);

const NavbarButtonCVA = cva(
  [
    "inline-flex cursor-pointer",
    "py-8px px-12px rounded-6px",
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
  return (
    <div className={NavbarContainerStyle}>
      <div className={NavbarStyle}>
        <NavbarButton label="Home" active />
        <NavbarButton label="Projects" />
        <NavbarButton label="Journal" />
        <NavbarButton label="Photos" />
        <NavbarButton label="About Me" />
      </div>
    </div>
  );
};

const NavbarButton = ({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) => {
  const NavbarButtonStyle = NavbarButtonCVA({ active });
  return (
    <div className={NavbarButtonStyle}>
      <Text size="body">{label}</Text>
    </div>
  );
};

export default Navbar;
