"use client";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// This context is a controller for the useInterval hook.
// The hook resets the timer once the resetTimer flag is true
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
