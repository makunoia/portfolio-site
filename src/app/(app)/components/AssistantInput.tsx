"use client";

import {useRef, useState} from "react";
import {motion} from "motion/react";
import {SendHorizonal} from "lucide-react";

type AssistantInputProps = {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  className?: string;
};

const AssistantInput = ({
  placeholder = "Is there anything you want to know about Mark?",
  onSubmit,
  className = "",
}: AssistantInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
  };

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value.trim().length > 0;
  const isActive = isFocused || hasValue;

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full max-w-[1000px] ${className}`}
      aria-label="Talk to my assistant"
    >
      {/* Background container styled via tokens to match mock */}
      <div
        className="w-full transition-all ease-in-out duration-300 border hover:border-inverse/50 rounded-[60px] pr-10px pl-20px py-10px flex items-center gap-12px overflow-hidden cursor-text"
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-body-large leading-body placeholder:opacity-60"
          style={{color: "hsl(var(--fg-default))", background: "transparent"}}
        />

        <motion.button
          type="submit"
          aria-label="Send question"
          disabled={!hasValue}
          initial={{x: 32, opacity: 0}}
          animate={{
            x: isActive ? 0 : 32,
            opacity: isActive ? 1 : 0,
            backgroundColor: hasValue
              ? "hsl(var(--brand))"
              : "hsl(var(--primitive-600))",
            color: hasValue
              ? "hsl(var(--fg-inverse))"
              : "hsl(var(--fg-subtle))",
            borderColor: hasValue
              ? "hsl(var(--border-brand))"
              : "hsl(var(--border-default))",
          }}
          transition={{
            x: {type: "spring", stiffness: 400, damping: 30, mass: 0.7},
            opacity: {duration: 0.2, ease: "easeOut"},
            backgroundColor: {duration: 0.25},
            color: {duration: 0.25},
            borderColor: {duration: 0.25},
          }}
          className="transition-colors duration-300 ease-in-out shrink-0 w-[40px] h-[40px] rounded-full grid place-items-center border"
          style={{
            opacity: hasValue ? 1 : 0.7,
            cursor: hasValue ? "pointer" : "not-allowed",
          }}
        >
          <SendHorizonal className="text w-20px h-20px" />
        </motion.button>
      </div>
    </form>
  );
};

export default AssistantInput;
