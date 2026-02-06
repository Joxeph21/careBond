import { useOptimistic, useTransition } from "react";

interface UseOptimisticChangeProps<T> {
  initialValue: T;
  onSave: (value: T) => Promise<void> | void;
  errMessage?: string
}

export function useOptimisticChange<T>({
  initialValue,
  onSave,
  errMessage,
}: UseOptimisticChangeProps<T>) {
  const [isPending, startTransition] = useTransition();

  const [optimisticValue, setOptimisticValue] = useOptimistic(
    initialValue,
    (_state, newValue: T) => newValue,
  );

  const updateValue = (newValue: T) => {
    startTransition(async () => {
      setOptimisticValue(newValue);

      try {
        await onSave(newValue);
      } catch (error) {
        console.error(errMessage ?? "Something went wrong", error);
      }
    });
  };

  return {
    value: optimisticValue,
    updateValue,
    isPending,
  };
}
