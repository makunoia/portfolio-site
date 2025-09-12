"use client";

import {useRef, useState} from "react";
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
};

const AssistantInput = ({
  placeholder = "Is there anything you want to know about Mark?",
  onSubmit,
  className = "",
  layoutId,
  isStreaming = false,
  onStop,
  sessionLocked = false,
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
        layout="position"
        layoutId={layoutId}
        className="relative w-full h-[60px] transition-colors ease-in-out duration-300 border hover:border-inverse/20 rounded-[60px] pr-10px pl-20px py-10px flex items-center gap-12px overflow-hidden cursor-text"
        onClick={() => inputRef.current?.focus()}
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--primitive-400)), hsl(var(--primitive-200)))",
          boxShadow: "0 1px 0 hsl(var(--primitive-200)) inset",
        }}
      >
        <label htmlFor="assistant-input" className="sr-only">
          Ask the assistant
        </label>

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
          className="flex-1 bg-transparent outline-none text-body-large leading-body placeholder:opacity-60 pr-60px"
          style={{color: "hsl(var(--fg-default))", background: "transparent"}}
        />

        <div className="absolute right-10px top-1/2 -translate-y-1/2">
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
    </form>
  );
};

export default AssistantInput;
