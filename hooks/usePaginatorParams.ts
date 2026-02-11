"use client";
import { useSearchParams } from "next/navigation";
export default function usePaginatorParams(options?: {
  searchKey?: string;
  pageKey?: string;
  roleKey?: string;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get(options?.searchKey ?? "query") ?? "";
  const page = searchParams.get(options?.pageKey ?? "page") ?? 1;
  const role = searchParams.get(options?.roleKey ?? "role") ?? "";

  return {
    query,
    page: Number(page),
    role: role as USER_ROLE,
  };
}
