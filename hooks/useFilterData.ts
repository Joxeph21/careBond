import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface UseFilterDataProps<T> {
  data: T[];
  searchKeys: (keyof T)[];
  searchQuery?: string;
}

export default function useFilterData<T>({
  data,
  searchKeys,
  searchQuery = "table-q"
}: UseFilterDataProps<T>) {
  const searchParams = useSearchParams();
  const filteredData = useMemo(() => {
    const query = searchParams.get(searchQuery);

    if (!query || searchKeys.length === 0) return data;

    const lowerQuery = query.toLowerCase();

    return data.filter((item) =>
      searchKeys.some((key) => {
        const val = item[key];
        return String(val ?? "")
          .toLowerCase()
          .includes(lowerQuery);
      })
    );
  }, [searchParams, data, searchKeys, searchQuery]);

  return filteredData;
}
