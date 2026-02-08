"use client";
import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import UsersTable from "@/components/institution/users-table";
import useAdmin from "@/hooks/auth/useAdmin";
import { useGetIUsers } from "@/hooks/institution/useInstitutionsUsers";
import useIUsers from "@/hooks/superadmin/useIUsers";
import usePaginatorParams from "@/hooks/usePaginatorParams";
import { ICON } from "@/utils/icon-exports";
import React from "react";

interface Props {
  isSuperAdmin: boolean;
  data?: IUser;
  query?: string;
  page?: number;
}

export default function Page() {
  const { isSuperAdmin, data } = useAdmin();
  const { query, page } = usePaginatorParams({ searchKey: "table-q" });

  const dataProps = {
    isSuperAdmin,
    data,
    query,
    page,
  };
  return (
   
    <section className="w-full pb-5 bg-white section-container col-start gap-5 px-4">
      <DashTitle title="Users">
        <Button link href="/users/create" icon={ICON.PLUS}>Create User</Button>
      </DashTitle>
      {isSuperAdmin ? (
        <AllUsersTable {...dataProps} />
      ) : (
        <IUsersTable {...dataProps} />
      )}
    </section>
  );
}

function AllUsersTable({ isSuperAdmin, query, page }: Props) {
  const { users, isLoading, total_count, prevPage, nextPage } = useIUsers(
    isSuperAdmin,
    {
      query,
      page,
    },
  );
  return (
    <UsersTable
      users={users ?? []}
      isLoading={isLoading}
      total_count={total_count ?? 0}
      prevPage={prevPage}
      nextPage={nextPage}
    />
  );
}

function IUsersTable({ data, query, page }: Props) {
  const { users, isLoading, total_count, prevPage, nextPage } = useGetIUsers(
    data?.institution_id,
    {query, page}
  );
  return (
    <UsersTable
      users={users ?? []}
      isLoading={isLoading}
      total_count={total_count ?? 0}
      prevPage={prevPage}
      nextPage={nextPage}
    />
  );
}
