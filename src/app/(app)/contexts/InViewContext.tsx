"use client";
import React, { useState, useMemo, createContext, ReactNode } from "react";

interface InViewContextType {
  inView: {
    section: string | null;
    block: string | null;
  };
  setInView: React.Dispatch<
    React.SetStateAction<{
      section: string;
      block: string;
    }>
  >;
}

// Provide default values for the context
const defaultValues: InViewContextType = {
  inView: { section: "", block: "" },
  setInView: () => {},
};

const InViewContext = createContext<InViewContextType>(defaultValues);

export function InViewProvider({ children }: { children: ReactNode }) {
  const [inView, setInView] = useState({ section: "", block: "" });
  const value = useMemo(() => ({ inView, setInView }), [inView]);

  return (
    <InViewContext.Provider value={value}>
      {children}
    </InViewContext.Provider>
  );
}

export default InViewContext;
