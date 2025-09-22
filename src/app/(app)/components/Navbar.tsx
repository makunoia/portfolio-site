"use client";
import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cva} from "class-variance-authority";
import {Slot} from "@radix-ui/react-slot";
import {motion} from "motion/react";

import Text from "@/components/Text";
import {Home, Palette, NotebookText, User, Images} from "lucide-react";

const NavbarContainerCVA = cva([
  "sticky bottom-40px z-30 mx-auto h-[40px] w-fit",
]);

const NavbarCVA = cva(
  [
    "relative flex items-center gap-2 rounded-12px p-1 md:gap-0",
    "backdrop-blur-[18px]",
    "border border-[color:color-mix(in_oklch,var(--navbar-border-lit)_10%,transparent)]",
    "bg-[color:var(--navbar-container-bg)]",
    "shadow-[0_12px_32px_-22px_color-mix(in_oklch,var(--shadow-default)_60%,transparent)]",
    "light:shadow-[0_12px_24px_-16px_rgba(15,23,42,0.18)]",
    "light:border-[color:color-mix(in_oklch,var(--navbar-border-lit)_35%,transparent)]",
  ].join(" ")
);

const NavbarButtonCVA = cva(
  [
    "relative z-10 inline-flex cursor-pointer items-center gap-0 overflow-hidden rounded-8px px-2.5 py-2 md:gap-2 md:px-3",
    "text-fg-default",
    "transition-colors duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_oklch,var(--navbar-button-hover-border)_75%,transparent)] focus-visible:ring-offset-0",
  ].join(" "),
  {
    variants: {
      active: {
        true: ["light:text-white"].join(" "),
        false: "",
      },
    },
  }
);

const Navbar = () => {
  const NavbarContainerStyle = NavbarContainerCVA();
  const NavbarStyle = NavbarCVA();
  const slug = usePathname();

  const items = React.useMemo(
    () => [
      {label: "Home", icon: Home, url: "/", active: slug === "/"},
      {
        label: "Projects",
        icon: Palette,
        url: "/projects",
        active: slug === "/projects",
      },
      {
        label: "Gallery",
        icon: Images,
        url: "/gallery",
        active: slug === "/gallery",
      },
      {
        label: "Journal",
        icon: NotebookText,
        url: "/journal",
        active: slug === "/journal",
      },
      {
        label: "About Me",
        icon: User,
        url: "/about-me",
        active: slug === "/about-me",
      },
    ],
    [slug]
  );

  const activeItemUrl = React.useMemo(
    () => items.find((item) => item.active)?.url ?? null,
    [items]
  );
  const [highlightSlug, setHighlightSlug] = React.useState<string | null>(
    activeItemUrl
  );
  const [highlightRect, setHighlightRect] = React.useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRefs = React.useRef(new Map<string, HTMLAnchorElement>());

  const registerButton = React.useCallback(
    (slug: string, node: HTMLAnchorElement | null) => {
      if (node) {
        buttonRefs.current.set(slug, node);
      } else {
        buttonRefs.current.delete(slug);
      }
    },
    []
  );

  React.useEffect(() => {
    setHighlightSlug(activeItemUrl);
  }, [activeItemUrl]);

  const updateHighlightRect = React.useCallback((slug: string | null) => {
    const container = containerRef.current;
    if (!container) {
      setHighlightRect(null);
      return;
    }

    if (!slug) {
      setHighlightRect(null);
      return;
    }

    const target = buttonRefs.current.get(slug);
    if (!target) {
      setHighlightRect(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setHighlightRect({
      width: targetRect.width,
      height: targetRect.height,
      x:
        targetRect.left -
        containerRect.left -
        container.clientLeft +
        container.scrollLeft,
      y:
        targetRect.top -
        containerRect.top -
        container.clientTop +
        container.scrollTop,
    });
  }, []);

  React.useLayoutEffect(() => {
    updateHighlightRect(highlightSlug);
  }, [highlightSlug, updateHighlightRect]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => updateHighlightRect(highlightSlug);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [highlightSlug, updateHighlightRect]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateHighlightRect(highlightSlug);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [highlightSlug, updateHighlightRect]);

  const resetHighlight = React.useCallback(() => {
    setHighlightSlug(activeItemUrl);
  }, [activeItemUrl]);

  return (
    <nav className={NavbarContainerStyle}>
      <div
        ref={containerRef}
        className={NavbarStyle}
        onPointerLeave={resetHighlight}
        onBlurCapture={(event) => {
          const nextTarget = event.relatedTarget as Node | null;
          if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
            resetHighlight();
          }
        }}
      >
        {highlightRect && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-0 rounded-8px bg-[color:var(--navbar-button-hover-bg)]"
            transition={{type: "spring", stiffness: 450, damping: 36}}
            initial={false}
            style={{
              width: highlightRect.width,
              height: highlightRect.height,
            }}
            animate={{
              x: highlightRect.x,
              y: highlightRect.y,
              width: highlightRect.width,
              height: highlightRect.height,
            }}
          />
        )}
        {items.map((item) => (
          <NavbarButton
            key={item.url}
            label={item.label}
            icon={item.icon}
            url={item.url}
            active={item.active}
            onHighlight={() => setHighlightSlug(item.url)}
            registerNode={(node) => registerButton(item.url, node)}
          />
        ))}
      </div>
    </nav>
  );
};

const NavbarButton = ({
  label,
  icon: Icon,
  url,
  active,
  onHighlight,
  registerNode,
}: {
  label: string;
  icon: React.ComponentType;
  url: string;
  active?: boolean;
  onHighlight: () => void;
  registerNode: (node: HTMLAnchorElement | null) => void;
}) => {
  const NavbarButtonStyle = NavbarButtonCVA({active});
  const activeAccentClass = active ? " light:text-white" : "";
  const activeBackgroundStyle = active
    ? ({background: "var(--navbar-button-active-bg)"} as React.CSSProperties)
    : undefined;
  const setRef = React.useCallback(
    (node: HTMLAnchorElement | null) => {
      registerNode(node);
    },
    [registerNode]
  );

  return (
    <Link
      prefetch
      href={url}
      as={url}
      aria-label={label}
      className={NavbarButtonStyle}
      style={activeBackgroundStyle}
      onPointerEnter={onHighlight}
      onFocus={onHighlight}
      ref={setRef}
    >
      <Slot
        className={`text-fg-default w-24px h-24px block md:hidden${activeAccentClass}`}
      >
        {<Icon />}
      </Slot>
      <Text
        size="body"
        className={`hidden text-nowrap md:inline-flex${activeAccentClass}`}
      >
        {label}
      </Text>
    </Link>
  );
};

export default Navbar;
