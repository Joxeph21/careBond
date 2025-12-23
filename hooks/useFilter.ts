import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

interface UseFilterOptions {
  filterOptions: FilterOption[];
  paramKey?: string;
  hasInitial?: boolean;
}

interface UseFilterReturn {
  filterKey: string;
  setFilterKey: (key: string) => void;
  handleFilter: (value: string) => void;
  options: FilterOption[];
  currentFilterValue: string | null;
  clearFilter: () => void;
}

export function useFilter({
  hasInitial = true,
  filterOptions,
  paramKey = "filterBy",
}: UseFilterOptions): UseFilterReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilterValue = searchParams.get(paramKey);

  const filterKey = currentFilterValue ?? "filter";

  const handleFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value == "") {
        params.delete(paramKey);
      } else {
        params.set(paramKey, value);
      }

      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.sort();

      const newParams = new URLSearchParams(params.toString());
      newParams.sort();

      if (currentParams.toString() === newParams.toString()) return;

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    [router, pathname, searchParams, paramKey]
  );

  const clearFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramKey);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, [router, pathname, searchParams, paramKey]);

  const options = useMemo(() => {
    const filtered = filterOptions.filter((opt) => opt.label !== filterKey);

    if (!hasInitial || filterKey === "Reset Filter") {
      return filtered;
    }

    return [{ label: "Reset Filter", value: "" }, ...filtered];
  }, [filterOptions, hasInitial, filterKey]);

  return {
    filterKey,
    setFilterKey: handleFilter,
    handleFilter,
    options,
    currentFilterValue,
    clearFilter,
  };
}
