"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface Identifiable {
  id: string | number;
  name?: string;
}

type HookProps<T extends Identifiable> = {
  data: T[];
  searchKeys?: (keyof T)[] | undefined;
};

export default function useTableSelect<T extends Identifiable>({
  data,
  searchKeys = undefined,
}: HookProps<T>) {
  const searchParams = useSearchParams();

  // State to store IDs of selected rows
  const [selected, setSelected] = useState<T["id"][]>([]);

  const handleRowSelect = (id: T["id"]) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredData = useMemo(() => {
    if (searchKeys === undefined) return data;
    const query = searchParams.get("table-q");

    if (!query || searchKeys.length === 0) return data;

    const lowerQuery = query.toLowerCase();

    return data.filter((item) =>
      searchKeys.some((key) => {
        const val = item[key];
        return String(val ?? "")
          .toLowerCase()
          .includes(lowerQuery);
      }),
    );
  }, [searchParams, data, searchKeys]);

  const isAllSelected =
    filteredData?.length > 0 && selected.length === filteredData?.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(filteredData.map((row) => row.id));
    }
  };

  return {
    selected,
    handleRowSelect,
    filteredData,
    isAllSelected,
    handleSelectAll,
  };
}
