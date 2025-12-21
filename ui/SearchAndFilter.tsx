"use client";
import SearchBox from "@/components/common/SearchBox";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useState, useMemo } from "react";
import Popover from "./Popover";

interface SearchAndFilterProps {
  filterOptions: {
    label: string;
    value: string;
  }[];
  searchPlaceholder?: string;
  hasFilter?: boolean;
}

export default function SearchAndFilter({
  filterOptions,
  searchPlaceholder,
  hasFilter,
}: SearchAndFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterKey, setFilterKey] = useState(
    searchParams.get("filterBy") || "filter"
  );

  const handleFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (value) {
        params.set("filterBy", value);
      } else {
        params.delete("filterBy");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const options = useMemo(
    () => [{ label: "Filter", value: "" }, ...filterOptions],
    [filterOptions]
  );

  return (
    <Popover>
      <section className="flex-between py-4 px-6 w-full">
        <SearchBox placeholder={searchPlaceholder} searchKey="table-q" />

        {hasFilter && (
          <Popover.Menu>
            <Popover.Trigger>
              <button
                type="button"
                className="flex-center cursor-pointer font-semibold capitalize p-3 rounded-md border-[1.4px] border-grey bg-white gap-3"
              >
                <p className="text-[#534D59] ">{filterKey}</p>
                <Icon icon={ICON.FILTER} fontSize={20} />
              </button>
            </Popover.Trigger>

            <Popover.Content>
              {(closepopover) => (
                <ul className="flex flex-col items-start gap-3 min-w-20">
                  {options.map((option, i) => (
                    <li
                      key={option.value ?? i}
                      className="text-sm w-full p-1 hover:bg-gray-100 text-grey-500 cursor-pointer"
                      onClick={() => {
                        setFilterKey(option.label);
                        handleFilter(option.value);
                        closepopover();
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </Popover.Content>
          </Popover.Menu>
        )}
      </section>
    </Popover>
  );
}
