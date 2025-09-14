"use client";

import {useRef, useState, ReactNode} from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

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
      className={`relative w-full ${className}`}
      aria-label="Talk to my assistant"
      autoComplete="off"
    >
      {/* Background container styled via tokens to match mock */}
      <motion.div
        layout
        layoutId={layoutId}
        className={`relative w-full ${expanded ? "h-[40vh]" : "h-[60px]"} transition-colors ease-in-out duration-300 border hover:border-inverse/20 flex ${expanded ? "flex-col items-stretch" : "items-center"} overflow-hidden cursor-text`}
        onClick={() => inputRef.current?.focus()}
        initial={false}
        animate={{borderRadius: expanded ? 20 : 60}}
        transition={{
          layout: {type: "spring", stiffness: 420, damping: 40, mass: 0.7},
          borderRadius: {
            type: "spring",
            stiffness: 420,
            damping: 40,
            mass: 0.7,
          },
        }}
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--primitive-400)), hsl(var(--primitive-200)))",
          boxShadow: "0 1px 0 hsl(var(--primitive-200)) inset",
          willChange: "height, transform, border-radius",
        }}
      >
        {expanded && aboveContent ? (
          <motion.div
            layout
            className="w-full px-20px min-h-0 overflow-hidden flex-1"
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
          className={`absolute bottom-0px w-full flex items-center py-18px ${expanded ? "mt-auto" : ""}`}
          initial={false}
          animate={{
            backgroundColor: expanded ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
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
            className="w-3/4 h-24px flex-1 bg-transparent outline-none text-body-large leading-body placeholder:opacity-60"
            style={{
              color: "hsl(var(--fg-default))",
              background: "transparent",
            }}
          />

          <div
            className={`absolute ${expanded ? "right-8px" : "right-10px"} top-1/2 -translate-y-1/2`}
          >
            <motion.button
              type={isStreaming ? "button" : canSend ? "submit" : "button"}
              aria-label={isStreaming ? "Stop response" : "Send question"}
              disabled={isStreaming ? false : !canSend}
              onClick={isStreaming ? onStop : undefined}
              initial={{x: 24, opacity: 0}}
              animate={{
                x: isActive ? 0 : 24,
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                x: {type: "spring", stiffness: 400, damping: 30, mass: 0.7},
                opacity: {duration: 0.2, ease: "easeOut"},
              }}
              className="transition-colors duration-300 ease-in-out shrink-0 w-[40px] h-[40px] rounded-full grid place-items-center border"
              style={{
                opacity: isStreaming || canSend ? 1 : 0.7,
                cursor: isStreaming || canSend ? "pointer" : "not-allowed",
                backgroundColor: isStreaming
                  ? "hsl(var(--utility-danger) / 0.9)"
                  : canSend
                    ? "hsl(var(--brand))"
                    : "hsl(var(--primitive-600))",
                color: isStreaming
                  ? "hsl(var(--fg-inverse))"
                  : canSend
                    ? "hsl(var(--fg-inverse))"
                    : "hsl(var(--fg-subtle))",
                borderColor: isStreaming
                  ? "hsl(var(--utility-danger))"
                  : canSend
                    ? "hsl(var(--border-brand))"
                    : "hsl(var(--border-default))",
              }}
            >
              {isStreaming ? (
                <CircleStop className="text w-20px h-20px" />
              ) : (
                <SendHorizonal className="text w-20px h-20px" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default AssistantInput;
