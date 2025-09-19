"use client";

import {useCallback, useEffect, useMemo, useState} from "react";
import {motion, AnimatePresence} from "motion/react";
import ReactMarkdown, {type Components} from "react-markdown";
import remarkGfm from "remark-gfm";
import UsefulLinks from "./UsefulLinks";
import {StructuredChatResponse} from "@/app/(app)/types";

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
      a: ({node, ...props}) => (
        <a
          {...props}
          className="text"
          target="_blank"
          rel="noreferrer noopener"
        />
      ),
      code: (props) => {
        const {className, children, ...rest} = props as any;
        return (
          <code className={`text ${className ?? ""}`} {...rest}>
            {children}
          </code>
        );
      },
      table: ({node, ...props}) => <table {...props} className="text" />,
      thead: ({node, ...props}) => <thead {...props} className="text" />,
      tbody: ({node, ...props}) => <tbody {...props} className="text" />,
      tr: ({node, ...props}) => <tr {...props} className="text" />,
      th: ({node, ...props}) => <th {...props} className="text" />,
      td: ({node, ...props}) => <td {...props} className="text" />,
      ul: ({node, ...props}) => <ul {...props} className="text" />,
      ol: ({node, ...props}) => <ol {...props} className="text" />,
      p: ({node, ...props}) => (
        <p {...props} className="text whitespace-pre-wrap" />
      ),
      hr: ({node, ...props}) => <hr {...props} className="" />,
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
    <div className="w-full flex justify-start text">
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
                  className="animated-gradient-text"
                  aria-live="polite"
                >
                  {phrases[phraseIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          )
        ) : (
          <div
            className="assistant-prose group max-w-none text-body-large break-words [word-break:break-word] overflow-x-auto mt-6 overflow-visible"
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
                className="mt-12px pt-8px border-t border-subtle"
              >
                <div className="flex flex-wrap gap-4px mt-8px">
                  {/* Create skeleton cards that match expected link names */}
                  <div
                    className="flex items-center gap-4px p-8px rounded-8px border animate-pulse"
                    style={{
                      width: "110px",
                      borderColor: "var(--border-default)",
                      backgroundColor: "var(--primitive-200)",
                    }}
                  >
                    <div className="flex-1">
                      <div
                        className="h-4 rounded animate-pulse"
                        style={{backgroundColor: "var(--primitive-300)"}}
                      ></div>
                    </div>
                    <div
                      className="w-12px h-12px rounded animate-pulse flex-shrink-0"
                      style={{backgroundColor: "var(--primitive-300)"}}
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
