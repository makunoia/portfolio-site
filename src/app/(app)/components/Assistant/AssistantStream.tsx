"use client";

import {useEffect, useMemo, useState} from "react";
import {motion, AnimatePresence} from "motion/react";
import ReactMarkdown, {type Components} from "react-markdown";
import remarkGfm from "remark-gfm";

const AssistantStream = ({
  text,
  stopped,
}: {
  text: string;
  stopped?: boolean;
}) => {
  const clean = (text ?? "").replace(/\u200B/g, "").trim();
  const isLoading = clean.length === 0;
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
      <div className="w-full max-w-[75%] min-w-0">
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
            className="group prose prose-invert max-w-none text-body-large leading-relaxed break-words [word-break:break-word] overflow-x-auto mt-6 overflow-visible"
            style={{contain: "layout paint", willChange: "contents"}}
          >
            {(() => {
              const mdComponents: Components = {
                a: ({node, ...props}) => (
                  <a
                    {...props}
                    className="underline text"
                    style={{color: "hsl(var(--fg-brand))"}}
                    target="_blank"
                    rel="noreferrer noopener"
                  />
                ),
                code: (props) => {
                  const {className, children, ...rest} = props as any;
                  return (
                    <code
                      className={`px-1 py-[2px] rounded-[4px] bg-[hsl(var(--primitive-300))] text ${className ?? ""}`}
                      {...rest}
                    >
                      {children}
                    </code>
                  );
                },
                table: ({node, ...props}) => (
                  <table
                    {...props}
                    className="table-fixed w-full border-collapse text-left text"
                    style={{borderColor: "hsl(var(--border-default))"}}
                  />
                ),
                thead: ({node, ...props}) => (
                  <thead {...props} className="text" />
                ),
                tbody: ({node, ...props}) => (
                  <tbody {...props} className="text" />
                ),
                tr: ({node, ...props}) => (
                  <tr
                    {...props}
                    className="border"
                    style={{borderColor: "hsl(var(--border-default))"}}
                  />
                ),
                th: ({node, ...props}) => (
                  <th
                    {...props}
                    className="px-12px py-8px font-medium border bg-[hsl(var(--primitive-300))]"
                    style={{borderColor: "hsl(var(--border-default))"}}
                  />
                ),
                td: ({node, ...props}) => (
                  <td
                    {...props}
                    className="px-12px py-8px align-top border"
                    style={{borderColor: "hsl(var(--border-default))"}}
                  />
                ),
                ul: ({node, ...props}) => (
                  <ul {...props} className="list-disc pl-16px" />
                ),
                ol: ({node, ...props}) => (
                  <ol {...props} className="list-decimal pl-16px" />
                ),
                p: ({node, ...props}) => (
                  <p
                    {...props}
                    className="mb-12px last-of-type:mb-0px whitespace-pre-wrap"
                  />
                ),
              };
              return (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={mdComponents}
                >
                  {text}
                </ReactMarkdown>
              );
            })()}
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
