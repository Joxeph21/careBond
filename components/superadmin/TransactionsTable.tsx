"use client";
import React from "react";
import DashTitle from "../common/DashTitle";
import SearchAndFilter from "@/ui/SearchAndFilter";
import Table from "@/ui/Table";
import useTableSelect from "@/hooks/useTableSelect";
import { dummy_transactions } from "@/utils/dummy";
import TransactionList from "./TransactionList";

export default function TransactionsTable() {
  const {
    isAllSelected,
    selected,
    handleRowSelect,
    handleSelectAll,
    filteredData,
  } = useTableSelect({
    data: dummy_transactions,
  });
  return (
    <section className="col-start gap-3 h-full w-full">
      <DashTitle title="Transactions" />
      <SearchAndFilter searchPlaceholder="Search Transactions" hasFilter />
      <section className="w-full px-4">
        <Table columns="20px .5fr 1fr 1fr .8fr .5fr .5fr .5fr 20px">
          <Table.Header>
            <div className="text-left">
              <input
                type="checkbox"
                className="cursor-pointer"
                name="select-all"
                id="select-all"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>
            <p>Index</p>
            <p>Payee/Payer</p>
            <p>Transaction ID</p>
            <p>Plan</p>
            <p>Trans Date</p>
            <p>Clear Date</p>
            <p>Amount</p>
            <div></div>
          </Table.Header>

          <Table.Body
            data={filteredData}
            render={(item) => (
              <TransactionList
                isSelected={selected.includes(item.id)}
                handleRowSelect={handleRowSelect}
                {...item}
                key={item.id}
              />
            )}
          />
        </Table>
      </section>
    </section>
  );
}
