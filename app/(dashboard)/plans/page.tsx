import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import FilmIcon from "@/components/icons/FilmIcon";
import { ICON } from "@/utils/icon-exports";
import React from "react";
import PlansContent from "./content";
import TransactionsTable from "@/components/superadmin/TransactionsTable";

export const metadata = {
  title: "Plans",
  description: "View and Manage carebond subscription plans",
};

export default function Page() {
  return (
    <section className="section-container bg-white col-center gap-8 ">
      <DashTitle title="Plans">
        <div className="flex-center gap-4">
          <button className="icon-btn">
            <FilmIcon />
          </button>
          <Button link href="/plans/create" icon={ICON.PLUS}>
            Add Plan
          </Button>
        </div>
      </DashTitle>

      <PlansContent />
      <TransactionsTable />
    </section>
  );
}
