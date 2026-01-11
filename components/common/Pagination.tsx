"use client";
import { ICON } from "@/utils/icon-exports";
import Button from "./Button";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type PaginationProps = {
  totalPages?: number;
};

export default function Pagination({ totalPages = 10 }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const defaultPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);

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

 

  return (
    <div className="w-full flex-between">
      <Button
        config={{
          disabled: currentPage <= 1,
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
        {(() => {
          if (totalPages <= 6) {
            return Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <li key={page}>
                  <Button
                    config={{
                      className: `${
                        currentPage === page
                          ? "text-white! bg-primary!"
                          : "text-[#667085]"
                      } size-8! ring-0!`,
                      onClick: () => {
                        if (page === currentPage) return;
                        updatePage(page);
                      },
                    }}
                    variants="outlined"
                    size="medium"
                  >
                    {page}
                  </Button>
                </li>
              )
            );
          }

          return [
            1,
            2,
            3,
            "...",
            totalPages - 2,
            totalPages - 1,
            totalPages,
          ].map((item, index) =>
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
            )
          );
        })()}
      </ul>

      <Button
        config={{
          disabled: currentPage >= totalPages,
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
