import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  ignoreRef?: React.RefObject<HTMLElement | null>,
  enabled: boolean = true,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    function handleClickOutside(event: MouseEvent | PointerEvent) {
      const target = event.target as Node;
      const isInsideMain = ref.current?.contains(target);
      const isInsideIgnore = ignoreRef?.current?.contains(target);

      if (!isInsideMain && !isInsideIgnore) handler();
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [handler, ignoreRef, enabled]);

  return ref;
}
