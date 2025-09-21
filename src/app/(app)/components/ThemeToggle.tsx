"use client";

import {useTheme} from "next-themes";
import {useEffect, useMemo, useState, type ComponentType} from "react";
import {Monitor, Moon, Sun} from "lucide-react";

import {cn} from "@/app/(app)/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

type ThemeOption = {
  value: "system" | "light" | "dark";
  label: string;
  icon: ComponentType<{className?: string}>;
};

const OPTIONS: ThemeOption[] = [
  {value: "system", label: "System", icon: Monitor},
  {value: "light", label: "Light", icon: Sun},
  {value: "dark", label: "Dark", icon: Moon},
];

const ThemeToggle = ({className}: ThemeToggleProps) => {
  const {theme, resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeValue = useMemo(() => {
    if (!mounted) return "system";
    if (!theme) return "system";
    if (theme === "system") return "system";
    return theme as "light" | "dark";
  }, [mounted, theme]);

  // Ensure icons reflect resolved theme while selection sticks to explicit choice
  const iconTheme = mounted ? (resolvedTheme ?? "light") : "light";

  return (
    <div
      className={cn(
        "flex w-fit h-fit items-center gap-4px rounded-full",
        "bg-bg-subtle/20 p-4px ",
        "backdrop-blur-sm",
        className
      )}
      role="radiogroup"
      aria-label="Choose color theme"
    >
      {OPTIONS.map(({value, label, icon: Icon}) => {
        const isActive = activeValue === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(value)}
            className={cn(
              "relative flex h-[24px] w-[24px] items-center justify-center",
              "rounded-full transition-all duration-200 ease-out",
              "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand",
              isActive
                ? "bg-bg-default text-fg-default shadow-[0_4px_12px_rgba(15,23,42,0.12)]"
                : "text-fg-subtle hover:text-fg-default hover:bg-bg-default/60"
            )}
          >
            <span className="sr-only">{label} theme</span>
            <Icon
              className={cn(
                "h-16px w-16px transition-colors duration-200",
                value === "system"
                  ? ""
                  : value === iconTheme
                    ? ""
                    : "opacity-80"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
