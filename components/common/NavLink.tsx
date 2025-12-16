import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface NavLink_Props {
  isActive: boolean;
  href: string;
  label: string;
  icon: string | React.ReactNode;
}

export default function NavLink({
  isActive,
  href,
  label,
  icon: IconNode,
}: NavLink_Props) {
  const baseClass = `flex items-center py-2 px-2.5 cursor-pointer rounded-sm gap-5 w-full ${
    isActive ? "bg-primary text-white" : "text-[#A9A9A9]"
  }`;

  return (
    <Link href={href} className={baseClass}>
      <span className="shrink-0">
        {typeof IconNode === "string" ? (
          <Icon icon={IconNode} fontSize={24} />
        ) : (
          IconNode
        )}
      </span>
      {label}
    </Link>
  );
}
