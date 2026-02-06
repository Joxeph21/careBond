"use client";
import DashTitle from "../common/DashTitle";
import SearchAndFilter from "@/ui/SearchAndFilter";
import Table from "@/ui/Table";
import useTableSelect from "@/hooks/useTableSelect";
import TransactionList from "./TransactionList";
import TableOptions from "@/ui/TableOptions";
import useTransactions from "@/hooks/superadmin/useTransactions";
import Pagination from "../common/Pagination";
import usePaginatorParams from "@/hooks/usePaginatorParams";

export default function TransactionsTable() {
  const {query} = usePaginatorParams({searchKey: "table-q"})
  const { transactions, isLoading, total_count, prevPage, nextPage } = useTransactions({query});
  const {
    isAllSelected,
    selected,
    handleRowSelect,
    handleSelectAll,
    filteredData,
  } = useTableSelect({
    data: transactions ?? [],
    
  });



  return (
    <section className="col-start gap-3 h-full w-full">
      <DashTitle title="Transactions" />
      <SearchAndFilter searchPlaceholder="Search Transactions" hasFilter />
      <section className="w-full flex flex-col gap-3 px-4">
        {selected.length > 0 && <TableOptions ids={selected} />}
        <Table columns="20px 50px 1fr 1fr .8fr .5fr .5fr .5fr 20px">
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
          isLoading={isLoading}
            data={filteredData}
            render={(item, index) => (
              <TransactionList
                index={index ? Number(index) + 1 : 1}
                isSelected={selected.includes(item.id)}
                handleRowSelect={handleRowSelect}
                {...item}
                key={item.id}
              />
            )}
          />
          <Table.Footer>
            <Pagination totalCount={total_count} prevPage={prevPage} nextPage={nextPage} />
          </Table.Footer>
        </Table>

      </section>
    </section>
  );
}
