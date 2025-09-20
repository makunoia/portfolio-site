"use client";

import {useRef, useState, ReactNode, useEffect} from "react";
import {motion} from "motion/react";
import {SendHorizonal, CircleStop} from "lucide-react";

type AssistantInputProps = {
  placeholder?: string;
  onSubmit?: (value: string) => boolean;
  className?: string;
  layoutId?: string;
  isStreaming?: boolean;
  onStop?: () => void;
  sessionLocked?: boolean;
  // When provided, renders an expandable area ABOVE the input inside the same container
  aboveContent?: ReactNode;
  // Toggles the container from fixed input height to expandable layout
  expanded?: boolean;
};

const AssistantInput = ({
  placeholder = "Is there anything you want to know about Mark?",
  onSubmit,
  className = "",
  layoutId,
  isStreaming = false,
  onStop,
  sessionLocked = false,
  aboveContent,
  expanded = false,
}: AssistantInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isStreaming || sessionLocked) return;
    const trimmed = value.trim();
    if (!trimmed) return;
    const accepted = onSubmit?.(trimmed) ?? false;
    if (accepted) {
      setValue("");
    }
  };

  const [isFocused, setIsFocused] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const containerBackground = expanded
    ? "var(--assistant-input-bg-expanded)"
    : "var(--assistant-input-bg)";
  const containerShadow = "var(--assistant-input-shadow)";
  const expandedOverlayBackground = "var(--assistant-input-overlay)";

  // Lock page scroll while the assistant input is focused
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isPointerInside) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverscroll = body.style.overscrollBehavior;
    html.style.overflow = "hidden";
    body.style.overscrollBehavior = "contain";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overscrollBehavior = prevBodyOverscroll;
    };
  }, [isPointerInside]);

  const hasValue = value.trim().length > 0;
  const canSend = !isStreaming && !sessionLocked && hasValue;
  const isActive = isFocused || hasValue || isStreaming || sessionLocked;

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDownCapture={(e) => {
        // Extra safety: block Enter at capture phase while streaming or locked
        if (
          (isStreaming || sessionLocked) &&
          (e.key === "Enter" || (e as any).keyCode === 13)
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className={`relative w-full ${className} transition-all ease-in-out duration-300 ${expanded ? "h-[50vh]" : "h-fit"}`}
      aria-label="Talk to my assistant"
      autoComplete="off"
    >
      <motion.div
        layout
        layoutId={layoutId}
        className={`relative w-full ${expanded ? "h-[60vh] translate-y-[-90px]" : "h-[60px] translate-x-[0px]"}  transition-colors ease-in-out duration-300 border-border-default/40 flex ${expanded ? "flex-col items-stretch" : "items-center hover:border-border-inverse/10"} overflow-hidden cursor-text`}
        onClick={() => inputRef.current?.focus()}
        onPointerEnter={() => setIsPointerInside(true)}
        onPointerLeave={() => setIsPointerInside(false)}
        initial={false}
        animate={{
          borderRadius: expanded ? 20 : 60,
          y: expanded ? -10 : 0,
        }}
        transition={{
          layout: {type: "spring", stiffness: 420, damping: 40, mass: 0.7},
          borderRadius: {
            type: "spring",
            stiffness: 420,
            damping: 40,
            mass: 0.7,
          },
          y: {
            type: "spring",
            stiffness: 420,
            damping: 40,
            mass: 0.7,
          },
        }}
        style={{
          backgroundColor: containerBackground,
          boxShadow: containerShadow,
          willChange: "height, transform, border-radius, translateY",
        }}
      >
        {expanded && aboveContent ? (
          <motion.div
            layout
            className="w-full min-h-0 overflow-hidden flex-1"
            transition={{
              layout: {type: "spring", stiffness: 420, damping: 40, mass: 0.7},
            }}
            style={{willChange: "height"}}
          >
            {aboveContent}
          </motion.div>
        ) : null}

        <label htmlFor="assistant-input" className="sr-only">
          Ask the assistant
        </label>

        <motion.div
          layout
          className={`absolute bottom-0px w-full flex items-center py-18px ${expanded ? "blurred-overlay mt-auto" : ""}`}
          initial={false}
          animate={{
            backgroundColor: expanded
              ? expandedOverlayBackground
              : "transparent",
            paddingLeft: expanded ? 20 : 16,
            paddingRight: expanded ? 12 : 0,
          }}
          transition={{
            layout: {type: "spring", stiffness: 420, damping: 40, mass: 0.7},
            backgroundColor: {duration: 0.2, ease: "easeOut"},
            borderRadius: {
              type: "spring",
              stiffness: 420,
              damping: 40,
              mass: 0.7,
            },
            paddingLeft: {
              type: "spring",
              stiffness: 420,
              damping: 40,
              mass: 0.7,
            },
            paddingRight: {
              type: "spring",
              stiffness: 420,
              damping: 40,
              mass: 0.7,
            },
            paddingTop: {
              type: "spring",
              stiffness: 420,
              damping: 40,
              mass: 0.7,
            },
            paddingBottom: {
              type: "spring",
              stiffness: 420,
              damping: 40,
              mass: 0.7,
            },
          }}
        >
          <input
            id="assistant-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (
                (isStreaming || sessionLocked) &&
                (e.key === "Enter" || (e as any).keyCode === 13)
              ) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            name="assistant-query"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className="w-3/4 h-24px flex-1 text-fg-default bg-transparent outline-none text-body-large leading-body placeholder:opacity-60"
          />

          <div
            className={`absolute ${expanded ? "right-8px" : "right-10px"} top-1/2 -translate-y-1/2`}
          >
            <motion.button
              type={isStreaming ? "button" : canSend ? "submit" : "button"}
              aria-label={isStreaming ? "Stop response" : "Send question"}
              disabled={isStreaming ? false : !canSend}
              onMouseDown={(e) => {
                // Prevent default early to avoid any chance of form submit on re-render
                if (isStreaming) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              onClick={(e) => {
                if (isStreaming) {
                  // Ensure this click never triggers a form submit even if the button
                  // re-renders to type="submit" before the browser default action.
                  e.preventDefault();
                  e.stopPropagation();
                  onStop?.();
                }
              }}
              initial={{x: 24, opacity: 0}}
              animate={{
                x: isActive ? 0 : 24,
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                x: {type: "spring", stiffness: 400, damping: 30, mass: 0.7},
                opacity: {duration: 0.2, ease: "easeOut"},
              }}
              className={`${
                isStreaming
                  ? "text-fg-inverse bg-bg-danger/90"
                  : canSend
                    ? "text-white bg-bg-brand"
                    : "text-fg-subtle/20 bg-bg-subtle/70"
              } transition-colors duration-300 ease-in-out shrink-0 w-[40px] h-[40px] rounded-full grid place-items-center border-bg-default/10`}
              style={{
                opacity: isStreaming || canSend ? 1 : 0.7,
                cursor: isStreaming || canSend ? "pointer" : "not-allowed",
                borderColor: isStreaming
                  ? "var(--utility-danger)"
                  : canSend
                    ? "var(--border-border-brand)"
                    : "var(--border-default)",
              }}
            >
              {isStreaming ? (
                <CircleStop className="text-white w-20px h-20px" />
              ) : (
                <SendHorizonal className="w-20px h-20px" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default AssistantInput;
