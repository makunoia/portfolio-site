"use client";

import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";

import {cn} from "@/app/(app)/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({className}: ThemeToggleProps) => {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (mounted ? resolvedTheme : "dark") === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color scheme"
      className={cn(
        "relative inline-flex items-center justify-center",
        "p-8px md:px-12px rounded-6px",
        "transition-colors duration-200 ease-in-out",
        "hover:bg-bg-subtle/80 focus-visible:outline-2",
        "focus-visible:outline-offset-2 focus-visible:outline-brand",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="sr-only">Toggle color scheme</span>
      <span className="relative flex h-20px w-20px items-center justify-center">
        <Sun
          className={cn(
            "absolute h-full w-full transition-all duration-300",
            isDark
              ? "rotate-90 scale-75 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute h-full w-full transition-all duration-300",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-75 opacity-0"
          )}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
