"use client";

import {useEffect, useMemo, useState} from "react";
import {motion, AnimatePresence} from "motion/react";
import ReactMarkdown, {type Components} from "react-markdown";
import remarkGfm from "remark-gfm";
import {cva} from "class-variance-authority";

import UsefulLinks from "./UsefulLinks";
import {StructuredChatResponse} from "@/app/(app)/types";
import {cn} from "@/lib/utils";

const assistantProse = cva(
  "group max-w-none break-words overflow-visible text-body-large [word-break:break-word]",
);

const loadingText = cva(
  "bg-gradient-to-r from-[var(--fg-subtle)] via-[var(--fg-default)] to-[var(--fg-subtle)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[gradient-pan_1.2s_linear_infinite]",
);

const AssistantStream = ({
  text,
  stopped,
  structuredData,
  isStreaming,
  isLatestMessage,
}: {
  text: string;
  stopped?: boolean;
  structuredData?: StructuredChatResponse;
  isStreaming?: boolean;
  isLatestMessage?: boolean;
}) => {
  const clean = (text ?? "").replace(/\u200B/g, "").trim();
  const isLoading = clean.length === 0;

  // Use structured data text if available, otherwise fall back to text prop
  const displayText = structuredData?.text || text;

  // Memoize loading phrases to prevent recreation
  const phrases = useMemo(
    () => [
      "Thinking…",
      "Getting information…",
      "Reasoning…",
      "Looking up details…",
      "Drafting answer…",
    ],
    []
  );

  // Memoize markdown components to prevent recreation on every render
  const mdComponents = useMemo<Components>(
    () => ({
      a: ({node, className, ...props}) => (
        <a
          {...props}
          className={cn(
            "text-fg-brand border-b border-transparent transition-colors duration-200",
            "hover:border-fg-brand",
            className
          )}
          target="_blank"
          rel="noreferrer noopener"
        />
      ),
      code: ({className, children, ...rest}) => (
        <code
          className={cn(
            "rounded-[6px] bg-bg-subtle px-1.5 py-0.5 text-fg-default text-[0.9em]",
            className
          )}
          {...rest}
        >
          {children}
        </code>
      ),
      pre: ({className, children, ...rest}) => (
        <pre
          {...rest}
          className={cn(
            "mt-4 mb-6 overflow-x-auto rounded-12px border border-border-subtle bg-bg-subtle p-4 text-sm leading-relaxed text-fg-default",
            className
          )}
        >
          {children}
        </pre>
      ),
      table: ({className, ...props}) => (
        <table
          {...props}
          className={cn(
            "my-6 w-full border-collapse text-left text-fg-default",
            className
          )}
        />
      ),
      thead: ({className, ...props}) => (
        <thead
          {...props}
          className={cn("text-fg-default", className)}
        />
      ),
      tbody: ({className, ...props}) => (
        <tbody
          {...props}
          className={cn("text-fg-default", className)}
        />
      ),
      tr: ({className, ...props}) => (
        <tr
          {...props}
          className={cn(
            "border-b border-border-subtle last:border-b-0",
            className
          )}
        />
      ),
      th: ({className, ...props}) => (
        <th
          {...props}
          className={cn(
            "border border-border-subtle px-3 py-2 text-left text-fg-default",
            className
          )}
        />
      ),
      td: ({className, ...props}) => (
        <td
          {...props}
          className={cn(
            "border border-border-subtle px-3 py-2 text-fg-default align-top",
            className
          )}
        />
      ),
      ul: ({className, ...props}) => (
        <ul
          {...props}
          className={cn(
            "my-4 list-disc space-y-2 pl-5 text-fg-default leading-[1.9]",
            className
          )}
        />
      ),
      ol: ({className, ...props}) => (
        <ol
          {...props}
          className={cn(
            "my-4 list-decimal space-y-2 pl-5 text-fg-default leading-[1.9]",
            className
          )}
        />
      ),
      li: ({className, ...props}) => (
        <li
          {...props}
          className={cn("leading-[1.9] text-fg-default", className)}
        />
      ),
      p: ({className, ...props}) => (
        <p
          {...props}
          className={cn(
            "my-4 whitespace-pre-wrap leading-[1.9] text-fg-default",
            className
          )}
        />
      ),
      blockquote: ({className, ...props}) => (
        <blockquote
          {...props}
          className={cn(
            "my-6 border-l-2 border-border-subtle pl-4 italic text-fg-subtle",
            className
          )}
        />
      ),
      hr: ({className, ...props}) => (
        <hr
          {...props}
          className={cn("my-6 border-border-subtle", className)}
        />
      ),
    }),
    []
  );

  // Memoize useful links validation
  const hasValidLinks = useMemo(
    () =>
      structuredData?.usefulLinks &&
      structuredData.usefulLinks.length > 0 &&
      structuredData.usefulLinks.every(
        (link) => link.resource_name && link.resource_link
      ),
    [structuredData?.usefulLinks]
  );
  const [phraseIdx, setPhraseIdx] = useState(0);
  useEffect(() => {
    if (!isLoading) return;
    const id = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }, 4500);
    return () => clearInterval(id);
  }, [isLoading, phrases.length]);
  return (
    <div className="w-full flex justify-start text-fg-default">
      <div className="w-full min-w-0">
        {isLoading ? (
          stopped ? (
            <div className="mt-6">
              <p className="text-body italic opacity-80">
                Response stopped by user
              </p>
            </div>
          ) : (
            <div className="mt-6 inline-block">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phraseIdx}
                  initial={{opacity: 0, y: 4}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -4}}
                  transition={{duration: 0.25, ease: "easeOut"}}
                  className={loadingText()}
                  aria-live="polite"
                >
                  {phrases[phraseIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          )
        ) : (
          <div
            className={cn(
              assistantProse(),
              "overflow-x-auto"
            )}
            style={{contain: "layout paint", willChange: "contents"}}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mdComponents}
            >
              {displayText}
            </ReactMarkdown>

            {/* Render useful links with loading state to prevent layout shifts */}
            {isStreaming && structuredData && isLatestMessage ? (
              // Loading state - reserve space to prevent layout shifts
              <motion.div
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, ease: "easeOut"}}
                className="mt-[12px] border-t border-border-subtle pt-2"
              >
                <div className="mt-2 flex flex-wrap gap-1">
                  {/* Create skeleton cards that match expected link names */}
                  <div
                    className="flex w-[110px] items-center gap-1 rounded-8px border border-[color:var(--border-default)] bg-[color:var(--primitive-200)] px-2 py-1 animate-pulse"
                  >
                    <div className="flex-1">
                      <div
                        className="h-4 rounded bg-[color:var(--primitive-300)] animate-pulse"
                      ></div>
                    </div>
                    <div
                      className="h-[12px] w-[12px] flex-shrink-0 rounded bg-[color:var(--primitive-300)] animate-pulse"
                    ></div>
                  </div>
                </div>
              </motion.div>
            ) : (
              hasValidLinks &&
              structuredData?.usefulLinks && (
                <UsefulLinks links={structuredData.usefulLinks} />
              )
            )}

            {stopped && (
              <p className="mt-12px text-body italic opacity-80">
                Response stopped by user
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantStream;
