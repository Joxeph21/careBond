"use client";
import { useEffect } from "react";

type ScrollBehaviorType = ScrollBehavior;

export default function useScrollToTop(
  page: string | number,
  query?: string,
  behavior: ScrollBehaviorType = "smooth",
) {
  useEffect(() => {
    const mainContent = document.getElementById("dashboard-main");
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        left: 0,
        behavior,
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior,
      });
    }
  }, [page, query, behavior]);
}
