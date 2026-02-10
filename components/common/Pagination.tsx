"use client";
import { ICON } from "@/utils/icon-exports";
import Button from "./Button";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useScrollToTop from "@/hooks/useScrollToTop";

type PaginationProps = {
  totalCount?: number;
  prevPage?: number | null;
  nextPage?: number | null;
  itemsPerPage?: number;
  className?: string;
};

export default function Pagination({
  totalCount = 0,
  prevPage,
  nextPage,
  itemsPerPage = 20,
  className
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const defaultPage = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    defaultPage ? Number(defaultPage) : 1,
  );

  useScrollToTop(currentPage)

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const updatePage = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePrevious = () => {
    if (currentPage > 1) updatePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) updatePage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={`w-full flex-between ${className}`}>
      <Button
        config={{
          disabled: currentPage <= 1 || !prevPage,
          onClick: handlePrevious,
        }}
        variants="outlined"
        iconPlacement="left"
        icon={ICON.ARROW_LEFT}
        size="medium"
      >
        Previous
      </Button>

      <ul className="flex items-center gap-1">
        {getPageNumbers().map((item, index) =>
          item === "..." ? (
            <li
              key={`ellipsis-${index}`}
              className="size-8 flex items-center justify-center text-[#667085]"
            >
              ...
            </li>
          ) : (
            <li key={item}>
              <Button
                config={{
                  className: `${
                    currentPage === item
                      ? "text-white! bg-primary!"
                      : "text-[#667085]"
                  } size-8! ring-0!`,
                  onClick: () => {
                    if (item === currentPage) return;
                    updatePage(item as number);
                  },
                }}
                variants="outlined"
                size="medium"
              >
                {item}
              </Button>
            </li>
          ),
        )}
      </ul>

      <Button
        config={{
          disabled: currentPage >= totalPages || !nextPage,
          onClick: handleNext,
        }}
        variants="outlined"
        icon={ICON.ARROW_RIGHT}
        size="medium"
      >
        Next
      </Button>
    </div>
  );
}
