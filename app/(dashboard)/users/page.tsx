"use client";
import DashTitle from "@/components/common/DashTitle";
import UsersTable from "@/components/institution/users-table";
import useAdmin from "@/hooks/auth/useAdmin";
import useIUsers from "@/hooks/superadmin/useIUsers";
import usePaginatorParams from "@/hooks/usePaginatorParams";
import React from "react";

export default function Page() {
  const { isSuperAdmin } = useAdmin();
  const { query, page } = usePaginatorParams({searchKey: "table-q"});
  const { users, isLoading, total_count, prevPage, nextPage } = useIUsers(isSuperAdmin, {
    query,
    page,
  });


  return (
    <section className="w-full pb-5 bg-white section-container col-start gap-5 px-4">
      <DashTitle title="Users" />
      <UsersTable
        users={users ?? []}
        isLoading={isLoading}
        total_count={total_count ?? 0}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </section>
  );
}
