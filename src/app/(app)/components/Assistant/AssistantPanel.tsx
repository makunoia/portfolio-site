"use client";

import {useEffect, useRef, useState} from "react";

// Global guard (window-scoped) to ensure only one active assistant session at a time, survives remounts
const getWindowSessionLock = (): boolean => {
  if (typeof window === "undefined") return false;
  return (window as any).__assistantActiveSession === true;
};
const setWindowSessionLock = (locked: boolean) => {
  if (typeof window === "undefined") return;
  (window as any).__assistantActiveSession = locked;
};
import AssistantInput from "@/app/(app)/components/Assistant/AssistantInput";
import ChatBubble from "@/app/(app)/components/Assistant/ChatBubble";
import AssistantStream from "@/app/(app)/components/Assistant/AssistantStream";
import {motion, AnimatePresence} from "motion/react";
import {ChevronDown} from "lucide-react";
import PromptSuggestion from "@/app/(app)/components/Assistant/PromptSuggestion";

// Scroll/observer tuning (module-scope to avoid re-creation)
const BOTTOM_PX_HYSTERESIS = 6;
const NEAR_BOTTOM_RATIO = 0.1;

const AssistantPanel = ({
  onConversationActiveChange,
  endConversationSignal = 0,
}: {
  onConversationActiveChange?: (active: boolean) => void;
  endConversationSignal?: number;
}) => {
  const [thread, setThread] = useState<
    {id: string; text: string; role: "user" | "assistant"; stopped?: boolean}[]
  >([]);

  const [abortCtrl, setAbortCtrl] = useState<AbortController | null>(null);
  const isLockedRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Sticky autoscroll: when user scrolls away from bottom, disable auto-jump until they return
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [usesSmoothScroll, setUsesSmoothScroll] = useState(false);
  const isUserScrollingLatestRef = useRef(false);
  const [suppressChevron, setSuppressChevron] = useState(false);
  const programmaticScrollRef = useRef(false);
  const smoothScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    isUserScrollingLatestRef.current = isUserScrolling;
  }, [isUserScrolling]);

  const trySendMessage = (text: string): boolean => {
    // If previously collapsed, expand to reveal history on next interaction
    if (isCollapsed) setIsCollapsed(false);
    // Synchronous lock to prevent race conditions from rapid Enter presses
    if (getWindowSessionLock() || abortCtrl || isLockedRef.current)
      return false;
    // Extra guard: if there's an assistant placeholder, a stream is active
    const hasActiveAssistant = thread.some(
      (m) => m.role === "assistant" && m.text.length === 0 && !m.stopped
    );
    if (hasActiveAssistant) return false;
    isLockedRef.current = true;
    setWindowSessionLock(true);

    const controller = new AbortController();
    setAbortCtrl(controller);
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const aid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    // Immediately add user message and an empty assistant placeholder for skeleton
    setThread((prev) => [
      ...prev,
      {id: uid, text, role: "user"},
      {id: aid, text: "", role: "assistant", stopped: false},
    ]);

    // When user sends a message, ensure we scroll to bottom and enable auto-scroll
    setIsUserScrolling(false);
    setAutoScrollEnabled(true);
    setSuppressChevron(true);

    // Use smooth scroll for the initial scroll when user sends message
    if (smoothScrollTimerRef.current)
      clearTimeout(smoothScrollTimerRef.current);
    setUsesSmoothScroll(true);
    smoothScrollTimerRef.current = setTimeout(() => {
      // After smooth scroll completes, switch to instant for streaming updates
      setUsesSmoothScroll(false);
      smoothScrollTimerRef.current = null;
    }, 300);

    (async () => {
      try {
        const simpleMessages = [
          ...thread.map((m) => ({role: m.role, text: m.text})),
          {role: "user" as const, text},
        ];
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({messages: simpleMessages}),
          signal: controller.signal,
        });
        const reader = res.body?.getReader();
        if (!reader) return;
        let aText = "";
        const decoder = new TextDecoder();
        while (true) {
          const {done, value} = await reader.read();
          if (done) break;
          aText += decoder.decode(value, {stream: true});
          setThread((prev) =>
            prev.map((m) => (m.id === aid ? {...m, text: aText} : m))
          );
        }
      } catch {
      } finally {
        setAbortCtrl(null);
        isLockedRef.current = false;
        setWindowSessionLock(false);
      }
    })();

    return true;
  };

  const sessionLocked =
    !!abortCtrl || isLockedRef.current || getWindowSessionLock();

  const hasStarted = thread.length > 0;
  const [suggestionsReady, setSuggestionsReady] = useState(true);
  const [threadReveal, setThreadReveal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    onConversationActiveChange?.(hasStarted && !isCollapsed);
  }, [hasStarted, isCollapsed, onConversationActiveChange]);

  // Cleanup on unmount: abort any in-flight request and release session locks
  useEffect(() => {
    return () => {
      if (abortCtrl) {
        try {
          abortCtrl.abort();
        } catch {}
      }
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      if (smoothScrollTimerRef.current)
        clearTimeout(smoothScrollTimerRef.current);
      setAbortCtrl(null);
      isLockedRef.current = false;
      setWindowSessionLock(false);
    };
  }, []);

  // Reveal thread area immediately on start to avoid late layout shifts
  useEffect(() => {
    if (hasStarted && !threadReveal) {
      setThreadReveal(true);
    }
  }, [hasStarted, threadReveal]);

  // When user ends the conversation, reshow suggestions in collapsed state
  useEffect(() => {
    if (isCollapsed) {
      setSuggestionsReady(true);
    }
  }, [isCollapsed]);

  // Keep the latest messages in view only when already at bottom; avoid scroll fighting
  useEffect(() => {
    if (autoScrollEnabled && !isUserScrollingLatestRef.current) {
      programmaticScrollRef.current = true;
      bottomRef.current?.scrollIntoView({
        behavior: usesSmoothScroll ? "smooth" : abortCtrl ? "auto" : "smooth",
        block: "end",
      });
      // Clear the flag next frame to avoid catching user scrolls
      requestAnimationFrame(() => {
        programmaticScrollRef.current = false;
      });
    }
  }, [thread, abortCtrl, autoScrollEnabled, usesSmoothScroll]);

  // Update atBottom when the user scrolls
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isAtBottomNow = distanceFromBottom <= BOTTOM_PX_HYSTERESIS;
    setAtBottom(isAtBottomNow);
    // Ignore programmatic scrolls entirely (no user-intent toggles)
    if (programmaticScrollRef.current) {
      if (isAtBottomNow) {
        setSuppressChevron(false);
        programmaticScrollRef.current = false;
      }
      return;
    }
    // Mark manual scrolling and debounce reset
    setIsUserScrolling(true);
    if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
    scrollStopTimer.current = setTimeout(() => setIsUserScrolling(false), 600);
    // Disable autoscroll on ANY upward movement away from absolute bottom
    if (distanceFromBottom > 0) setAutoScrollEnabled(false);
    // Instantly dismiss chevron when we reach bottom
    if (isAtBottomNow) {
      setIsUserScrolling(false);
      setSuppressChevron(false);
      programmaticScrollRef.current = false;
    }
  };

  // IntersectionObserver to robustly detect end-of-list visibility
  useEffect(() => {
    if (!hasStarted) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const waitForRefsThenObserve = () => {
      if (cancelled) return;
      const rootEl = scrollRef.current;
      const target = bottomRef.current;

      if (!rootEl || !target) {
        requestAnimationFrame(waitForRefsThenObserve);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const nearBottom =
            entry.isIntersecting &&
            entry.intersectionRatio >= NEAR_BOTTOM_RATIO;
          // Instantly dismiss chevron when bottom marker enters view
          if (nearBottom) {
            setAtBottom(true);
            setIsUserScrolling(false);
            setSuppressChevron(false);
            programmaticScrollRef.current = false;
            // Only re-enable autoscroll if user is not actively scrolling
            if (!isUserScrollingLatestRef.current) {
              setAutoScrollEnabled(true);
            }
          }
        },
        {root: rootEl, threshold: [0, NEAR_BOTTOM_RATIO, 1]}
      );
      observer.observe(target);
    };

    requestAnimationFrame(waitForRefsThenObserve);

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
    };
  }, [hasStarted, thread.length]);

  // Pointer interactions imply manual scroll intent: disable autoscroll immediately
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onPointer = () => {
      setIsUserScrolling(true);
      setAutoScrollEnabled(false);
    };
    el.addEventListener("pointerdown", onPointer);
    el.addEventListener("wheel", onPointer, {passive: true});
    el.addEventListener("touchstart", onPointer, {passive: true});
    return () => {
      el.removeEventListener("pointerdown", onPointer);
      el.removeEventListener("wheel", onPointer);
      el.removeEventListener("touchstart", onPointer);
    };
  }, [hasStarted]);

  // Also listen at the document level to catch interactions outside the scrollable area
  useEffect(() => {
    if (!hasStarted) return;
    const onAnyInteract = () => {
      setIsUserScrolling(true);
      setAutoScrollEnabled(false);
    };
    // Use capture to ensure we toggle before scroll effects run
    document.addEventListener("pointerdown", onAnyInteract, {capture: true});
    document.addEventListener("wheel", onAnyInteract, {passive: true});
    document.addEventListener("touchstart", onAnyInteract, {passive: true});
    return () => {
      document.removeEventListener("pointerdown", onAnyInteract, {
        capture: true,
      } as any);
      document.removeEventListener("wheel", onAnyInteract as any);
      document.removeEventListener("touchstart", onAnyInteract as any);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (endConversationSignal > 0) {
      // If there's an active stream, abort it and release locks
      if (abortCtrl) {
        try {
          abortCtrl.abort();
        } catch {}
      }
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      if (smoothScrollTimerRef.current)
        clearTimeout(smoothScrollTimerRef.current);
      setAbortCtrl(null);
      isLockedRef.current = false;
      setWindowSessionLock(false);
      setIsCollapsed(true);
      setThreadReveal(false);
    }
  }, [endConversationSignal]);

  useEffect(() => {
    if (hasStarted) {
      setSuggestionsReady(false);
    }
  }, [hasStarted]);

  // Immediate stop: abort fetch and release locks instantly
  const stopStreaming = () => {
    if (!abortCtrl) return;
    // Mark the latest assistant message as stopped so UI can reflect it
    setThread((prev) => {
      const idx = [...prev]
        .map((m, i) => ({m, i}))
        .filter((x) => x.m.role === "assistant")
        .map((x) => x.i)
        .pop();
      if (idx === undefined) return prev;
      const next = [...prev];
      next[idx] = {...next[idx], stopped: true};
      return next;
    });
    try {
      abortCtrl.abort();
    } catch {}
    setAbortCtrl(null);
    isLockedRef.current = false;
    setWindowSessionLock(false);
  };

  return (
    <motion.div
      className="relative flex items-center justify-center flex-col gap-24px w-full"
      layout="position"
    >
      <motion.h1
        className="self-center text-heading text"
        initial={false}
        animate={
          !hasStarted || isCollapsed ? {opacity: 1, y: 0} : {opacity: 0, y: -12}
        }
        transition={{duration: 0.22, ease: "easeOut"}}
        aria-hidden={!(!hasStarted || isCollapsed)}
        style={{contain: "layout paint", willChange: "transform, opacity"}}
      >
        Anything I can help you with?
      </motion.h1>

      <motion.div
        className={"w-full"}
        layout="position"
        transition={{type: "spring", stiffness: 400, damping: 40, mass: 0.8}}
      >
        <AssistantInput
          onSubmit={trySendMessage}
          isStreaming={!!abortCtrl}
          sessionLocked={sessionLocked}
          onStop={stopStreaming}
          expanded={hasStarted && !isCollapsed}
          aboveContent={
            hasStarted && !isCollapsed ? (
              <motion.div
                layout
                className="relative w-full flex flex-col min-h-0 h-full"
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 420,
                    damping: 40,
                    mass: 0.7,
                  },
                }}
              >
                <motion.div
                  layout
                  className="flex-1 min-h-0 overflow-y-auto"
                  ref={scrollRef}
                  onScroll={handleScroll}
                  layoutScroll
                >
                  {/* Render chat thread with bottom reference for sticky chevron */}
                  <div className="flex flex-col px-20px">
                    {thread.map((m) => {
                      if (m.role === "user") {
                        return (
                          <motion.div
                            key={m.id}
                            initial={{opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 26,
                              mass: 0.8,
                            }}
                            layout="position"
                            className="w-full flex-col justify-items-end pt-24px"
                          >
                            <ChatBubble message={m.text} />
                            <div className="h-40px" />
                          </motion.div>
                        );
                      }
                      return (
                        <motion.div
                          key={m.id}
                          initial={{opacity: 0, y: 6}}
                          animate={{opacity: 1, y: 0}}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 26,
                            mass: 0.8,
                          }}
                          layout="position"
                        >
                          <AssistantStream text={m.text} stopped={m.stopped} />
                        </motion.div>
                      );
                    })}
                    <div ref={bottomRef} className="h-4px mt-20px pt-[50px]" />
                  </div>
                </motion.div>

                {/* Chevron overlayed (absolute) so it does not affect scroll height */}
                <AnimatePresence initial={false} mode="popLayout">
                  {!atBottom && !suppressChevron && (
                    <motion.button
                      type="button"
                      aria-label="Jump to latest"
                      onClick={() => {
                        setIsUserScrolling(false);
                        setAutoScrollEnabled(true);
                        setSuppressChevron(true);
                        programmaticScrollRef.current = true;
                        bottomRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "end",
                        });
                      }}
                      className="absolute bottom-12px left-1/2 z-30 w-[40px] h-[40px] rounded-full grid place-items-center border bg-[hsl(var(--primitive-300))] pointer-events-auto"
                      style={{
                        borderColor: "hsl(var(--border-default))",
                        color: "hsl(var(--fg-default))",
                        translate: "0 -55px",
                        boxShadow: "0 4px 16px hsl(var(--shadow) / 0.35)",
                      }}
                      initial={{opacity: 0, y: 8}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: -8}}
                      transition={{duration: 0.2, ease: "easeOut"}}
                    >
                      <ChevronDown className="w-20px h-20px" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : null
          }
        />
      </motion.div>

      {/* Prompt Suggestions  */}
      {(!hasStarted || isCollapsed) && suggestionsReady && (
        <motion.div
          className="flex flex-row gap-14px w-full"
          layout
          initial="hidden"
          animate="show"
          transition={{
            staggerChildren: 0.08,
            delayChildren: 0.05,
          }}
        >
          <PromptSuggestion
            header="Ask a question"
            samplePrompt="What is Mark's best competency?"
          />
          <PromptSuggestion
            header="Summarize"
            samplePrompt="Tell me about Mark's work experience."
          />
          <PromptSuggestion
            header="Find information"
            samplePrompt="What is Mark's email address?"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AssistantPanel;
