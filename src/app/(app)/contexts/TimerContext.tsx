"use client";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

interface TimerProps {
  resetTimer: boolean;
  setResetTimer: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
  resetTimer: false,
  setResetTimer: () => {},
};

const TimerContext = createContext<TimerProps>(defaultValues);

const TimerContextProvider = ({ children }: { children: ReactNode }) => {
  const [resetTimer, setResetTimer] = useState<TimerProps["resetTimer"]>(false);

  return (
    <TimerContext value={{ resetTimer, setResetTimer }}>
      {children}
    </TimerContext>
  );
};

export { TimerContext, TimerContextProvider };
