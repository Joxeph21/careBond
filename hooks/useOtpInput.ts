"use client";
import { useEffect, useRef, useCallback, useState } from "react";

type OtpInputType = "NUMERIC" | "LETTERS" | "BOTH";

const useOtpInput = (
  inputsCount: number,
  onChange?: (values: string[]) => void,
  type: OtpInputType = "NUMERIC"
) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState<string[]>(Array(inputsCount).fill(""));

  const getInputRegex = useCallback(() => {
    switch (type) {
      case "NUMERIC":
        return /^\d$/;
      case "LETTERS":
        return /^[a-z]$/i;
      case "BOTH":
        return /^[a-z0-9]$/i;
      default:
        return /^\d$/;
    }
  }, [type]);

  const updateValues = useCallback(
    (index: number, newValue: string) => {
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);
      onChange?.(newValues);
    },
    [values, onChange]
  );

  const focusNextInput = useCallback(
    (index: number) => {
      if (index < inputsCount - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    },
    [inputsCount]
  );

  const focusPrevInput = useCallback((index: number) => {
    if (index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const key = e.key;
      const inputRegex = getInputRegex();

      if (inputRegex.test(key) && key.length === 1) {
        e.preventDefault();
        updateValues(index, key.toLowerCase());
        focusNextInput(index);
        return
      }

      if (key === "ArrowLeft") {
          focusPrevInput(index);
          return;
      }
      if (key === "ArrowRight") {
          focusNextInput(index);
          return;
      }
    },
    [focusNextInput, updateValues, getInputRegex, focusPrevInput]
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const key = e.key;
      if (key === "Backspace") {
        updateValues(index, "");
        focusPrevInput(index);
      }
    },
    [focusPrevInput, updateValues]
  );

  useEffect(() => {
    inputsRef.current = Array(inputsCount).fill(null);
  }, [inputsCount]);

  const setInputRef = useCallback(
    (el: HTMLInputElement | null, index: number) => {
      inputsRef.current[index] = el;
    },
    []
  );

  return { inputsRef, handleKeyDown, setInputRef, handleKeyUp, values };
};

export default useOtpInput;
