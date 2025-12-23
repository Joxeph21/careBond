"use client";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

type SearchBoxProps = {
  placeholder?: string;
  searchKey?: string;
};

export default function SearchBox({
  placeholder = "Global Search",
  searchKey = "q",
}: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get(searchKey) ?? "");

  const updateQueryParam = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (value) {
        params.set(searchKey, value);
      } else {
        params.delete(searchKey);
      }

      if (params.toString() === searchParams?.toString()) return;

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, searchKey]
  );

  // Update 6 seconds after the user types
  const debouncedUpdate = useMemo(
    () => debounce(updateQueryParam, 600),
    [updateQueryParam]
  );

  // Trigger debounced search when typing
  useEffect(() => {
    debouncedUpdate(query);

    return () => {
      debouncedUpdate.cancel();
    };
  }, [query, debouncedUpdate]);

  //   Doing this so the users can press enter anythime to trigger the search
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedUpdate.cancel(); // cancel existing debounce
    updateQueryParam(query);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full gap-3 max-w-87.5 ring px-4.5 py-3 ring-[#E4E4E4] rounded-[10px] flex items-center"
    >
      <button type="submit" className="shrink-0 cursor-pointer">
        <Icon icon={ICON.SEARCH} color="#959595" fontSize={21} />
      </button>
      <input
        type="search"
        name=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="outline-0 w-full placeholder:text-[#959595]"
        id=""
        placeholder={placeholder}
      />
    </form>
  );
}
