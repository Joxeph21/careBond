import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface TitleProps extends PropsWithChildren {
  title: string;
  href?: string;
}

export default function DashTitle({ title, children, href }: TitleProps) {
  return (
    <div className="w-full border-b border-[#E4E4E4] p-6 flex-between">
      <div className="flex items-center gap-2">
        {href && <Link href={href} className="cursor-pointer">
        <Icon fontSize={28} icon={"cuida:caret-left-outline"} />
        </Link>}
        <h2 className="text-dark text-2xl font-semibold font-utendo">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
