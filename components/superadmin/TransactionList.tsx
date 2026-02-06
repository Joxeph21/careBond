import Table from "@/ui/Table";
import { formatDate, formatValue } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";

export default function TransactionList({
  amount,
  clear_date,
  id,
  transaction_date,
  transaction_id,
  handleRowSelect,
  isSelected,
  index,
  ...rest
}: {
  handleRowSelect: (id: string) => void;
  isSelected: boolean;
  index: number;
} & Transaction) {
  return (
    <Table.Row isHighlighted={isSelected}>
      <div>
        <input
          type="checkbox"
          className="cursor-pointer"
          name="select-row"
          id="select-row"
          checked={isSelected}
          onChange={() => handleRowSelect(id)}
        />
      </div>
      <p>{index}</p>
      <p>{rest?.institution_details?.name ?? "--:--"}</p>
      <p>{transaction_id}</p>
      <p className="capitalize">{rest?.plan_details?.name ?? "--:--"} Plan</p>
      <p>{formatDate(transaction_date)}</p>
      <p>{formatDate(clear_date)}</p>
      <p>{formatValue(Number(amount ?? 0))}</p>
      <button className="cursor-pointer">
        <Icon icon={ICON.MENU} fontSize={21} />
      </button>
    </Table.Row>
  );
}
