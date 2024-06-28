"use client";
import React, { useState, createContext, ReactNode } from "react";

interface InViewContextType {
  inView: {
    section: string | null;
    part: string | null;
  };
  setInView: React.Dispatch<
    React.SetStateAction<{
      section: string;
      part: string;
    }>
  >;
}

// Provide default values for the context
const defaultValues: InViewContextType = {
  inView: { section: "", part: "" },
  setInView: () => {},
};

const InViewContext = createContext<InViewContextType>(defaultValues);

export function InViewProvider({ children }: { children: ReactNode }) {
  const [inView, setInView] = useState({ section: "", part: "" });

  return (
    <InViewContext.Provider value={{ inView, setInView }}>
      {children}
    </InViewContext.Provider>
  );
}

export default InViewContext;
