"use client";
import SearchBox from "@/components/common/SearchBox";
import { useFilter, FilterOption } from "@/hooks/useFilter";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Popover from "./Popover";

interface SearchAndFilterProps {
  filterOptions: FilterOption[];
  searchPlaceholder?: string;
  hasFilter?: boolean;
}

export default function SearchAndFilter({
  filterOptions,
  searchPlaceholder,
  hasFilter,
}: SearchAndFilterProps) {
  const { filterKey,  handleFilter, options } = useFilter({
    filterOptions,
  });

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
                <p className="text-[#534D59] ">{filterKey === "Reset Filter" ? "Filter": filterKey}</p>
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
                        // setFilterKey(option.label);
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
