"use client";

import { AuthUser } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export default function useAdmin() {
  const { data, isLoading, refetch, error, isFetched } = useQuery({
    queryKey: ["user-me"],
    queryFn: AuthUser,
  });


  const isSuperAdmin = data?.role === "super_admin";

  

  return { isSuperAdmin, data, isLoading, refetch, error, isFetched };
}
