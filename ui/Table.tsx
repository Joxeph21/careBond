"use client";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { createContext, type PropsWithChildren } from "react";

type tableContextType = {
  columns: string;
  border?: boolean;
};

const TableContext = createContext<tableContextType>({
  columns: "",
  border: false,
});

interface contextProps extends PropsWithChildren {
  columns: string;
  border?: boolean;
}

const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error("useTable must be used within a Table");
  return context;
};

export default function Table({
  children,
  columns,
  border = true,
}: contextProps) {
  return (
    <TableContext.Provider value={{ columns, border }}>
      <div className="rounded-lg w-full ring ring-grey overflow-hidden">
        {children}
      </div>
    </TableContext.Provider>
  );
}

Table.Header = function Header({ children, className }: {className?: string}& PropsWithChildren) {
  const { columns, border } = useTable();
  return (
    <div
      role="row"
      style={{ display: "grid", gridTemplateColumns: columns }}
      className={`gap-6 items-center p-3 bg-white capitalize font-semibold text-[#534D59] ${
        border && "border-b border-[#E1E1E1]"
      } ${className}`}
    >
      {children}
    </div>
  );
};

Table.Row = function Row({
  children,
  isHighlighted,
}: { isHighlighted?: boolean } & PropsWithChildren) {
  const { columns, border } = useTable();
  return (
    <div
      role="row"
      style={{ display: "grid", gridTemplateColumns: columns }}
      className={`gap-6 truncate items-center cursor-pointer  px-3 text-[#474747] text-sm py-4 ${
        border && "border-b border-[#E1E1E1]"
      } ${isHighlighted && "bg-[#F9FAFC]!"}`}
    >
      {children}
    </div>
  );
};

Table.Body = function Body<T>({
  data,
  render,
  isLoading,
  name = "Results",
  icon,
}: {
  data: T[];
  render: (item: T, id?: number | string) => React.ReactElement;
  isLoading?: boolean;
  name?: string;
  icon?: string;
}) {
  if (isLoading) return <div>Loading....</div>;

  if (data.length === 0)
    return (
      <div className="col-center gap-3 h-[200px] p-3">
        <Icon icon={icon ?? ICON.SEARCH} fontSize={60} />
        <h4 className="text-lg font-semibold">No {name} Found</h4>
        <p className="text-grey-dark max-w-[60%] text-center">
          Your search did not match any result, try a different search term or try adjusting the filter.
        </p>
      </div>
    );

  return (
    <section className="">
      {data?.map((item, index) => render(item, index))}
    </section>
  );
};

Table.Footer = function Footer({ children }: PropsWithChildren) {
  return (
    <footer
      className={`flex items-center my-3 px-2 justify-end ${!children ? "hidden" : ""}`}
    >
      {children}
    </footer>
  );
};
