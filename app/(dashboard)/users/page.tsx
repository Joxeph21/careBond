import DashTitle from "@/components/common/DashTitle";
import UsersTable from "@/components/institution/users-table";
import React from "react";

export default function page() {
  return (
    <section className="w-full h-full bg-white section-container col-start gap-5 px-4">
      <DashTitle title="Users" />
      <UsersTable />
    </section>
  );
}
