"use client";
import React from "react";
import Logo from "../common/Logo";
import LogoutIcon from "../icons/LogoutIcon";
import NavLink from "../common/NavLink";
import { ICON } from "@/utils/icon-exports";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/hooks/auth/useAuth";
import { CONFIG } from "@/utils/config";
import { Icon } from "@iconify/react";
import UserIcon from "../icons/UserIcon";
import ChartIcon from "../icons/ChartIcon";
import SettingsIcon from "../icons/SettingsIcon";

const links = [
  {
    href: "/",
    label: "Dashboard",
    icon: ICON.DASHBOARD,
  },
  {
    href: "/institutions",
    label: "Institutions",
    icon: ICON.FIRST_AID,
  },
  {
    href: "/users",
    label: "Users",
    icon: <UserIcon />,
  },
  {
    href: "/plans",
    label: "Plans",
    icon: ICON.PLAN,
  },
  {
    href: "/logs",
    label: "Logs",
    icon: <ChartIcon />,
  },

  {
    href: "/config",
    label: "Config",
    icon: <SettingsIcon  />,
  },
];

export default function Sidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const { logout, isPending } = useLogout();

  return (
    <aside
      className="row-span-2 col-start w-full 
    px-11.5 pr-9 pt-10 gap-[66px]
    h-full border-r border-grey items-start!"
    >
      <Logo />
      <nav className="w-full gap-6 col-start">
        {links.map((el, i) => {
          const isActiveRoute = (path: string) => {
            if (path === "/") return pathName === path;
            return pathName.startsWith(path);
          };

          return <NavLink {...el} key={i} isActive={isActiveRoute(el.href)} />;
        })}
        <button
          onClick={() =>
            logout(undefined, {
              onSuccess: () => {
                sessionStorage.removeItem(CONFIG.ACCESS_TOKEN_IDENTIFIER);
                router.replace("/login");
              },
            })
          }
          className="flex py-2 px-2.5 items-center cursor-pointer rounded-sm gap-5 w-full text-[#A9A9A9]"
        >
          {isPending ? (
            <Icon icon={ICON.SPINNER} className="animate-spin" fontSize={21} />
          ) : (
            <>
              <span>
                <LogoutIcon />
              </span>
              Logout
            </>
          )}
        </button>
      </nav>
    </aside>
  );
}
