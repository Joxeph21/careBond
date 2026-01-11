import Table from "@/ui/Table";
import { formatDate } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";

export default function TransactionList({
  amount,
  clearDate,
  id,
  index,
  payeePayer,
  plan,
  transactionDate,
  transactionId,
  handleRowSelect,
  isSelected,
}: {
  handleRowSelect: (id: string) => void;
  isSelected: boolean;
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
      <p>{payeePayer}</p>
      <p>{transactionId}</p>
      <p className="capitalize">{plan} Plan</p>
      <p>{formatDate(transactionDate)}</p>
      <p>{formatDate(clearDate)}</p>
      <p>{amount}</p>
      <button className="cursor-pointer">
        <Icon icon={ICON.MENU} fontSize={21} />
      </button>
    </Table.Row>
  );
}
