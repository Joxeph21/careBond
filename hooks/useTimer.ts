import { useEffect, useState, useCallback } from "react";

export function useTimer(def?: number) {
  const [timer, setTimer] = useState<number>(def || 0);

  const resetTimer = useCallback((val: number) => {
    setTimer(val);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  return { timer, resetTimer };
}
