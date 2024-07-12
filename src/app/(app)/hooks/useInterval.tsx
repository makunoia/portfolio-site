import { useEffect, useRef, Dispatch, SetStateAction, useState } from "react";

function useInterval(
  callback: () => void,
  delay: number,
  resetTimer: boolean,
  setResetTimer: Dispatch<SetStateAction<boolean>>
) {
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const savedCallback = useRef(() => {});

  function tick() {
    savedCallback.current();
  }

  useEffect(() => {
    if (resetTimer) {
      //Reset the timer
      clearInterval(timerID);
      setResetTimer(false);

      //Restart the timer
      const id = setInterval(tick, delay);
      setTimerID(id);
    }
  }, [resetTimer]);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(tick, delay);
      setTimerID(id);

      return () => {
        clearInterval(timerID);
      };
    }
  }, [delay]);
}

export default useInterval;
