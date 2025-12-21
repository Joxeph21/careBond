import React, { PropsWithChildren } from "react";

interface TitleProps extends PropsWithChildren {
  title: string;
}

export default function DashTitle({ title, children }: TitleProps) {
  return <div className="w-full border-b border-[#E4E4E4] p-6 flex-between">
    <h2 className="text-dark text-2xl font-semibold font-utendo">{title}</h2>
    {children}
  </div>;
}
