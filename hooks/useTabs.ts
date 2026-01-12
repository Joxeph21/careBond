import { useState, useRef, useEffect } from "react";

export default function useTabs<T extends string>(initialTab: T) {
  const [tab, setTab] = useState<T>(initialTab);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLButtonElement>(null);
  const [tabWidth, setTabWidth] = useState({
    width: 0,
    left: 0,
  });

  const updateTabIndicator = () => {
    if (tabRef.current && containerRef.current) {
      const tabRect = tabRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setTabWidth({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  };

  useEffect(() => {
    updateTabIndicator();

    
    window.addEventListener("resize", updateTabIndicator);
    return () => window.removeEventListener("resize", updateTabIndicator);
  }, [tab]);

  return { tab, setTab, containerRef, tabRef, tabWidth };
}
