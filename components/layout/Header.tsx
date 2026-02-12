import React from "react";
import SearchBox from "../common/SearchBox";
import UserTab from "./UserTab";

import NotificationBanner from "../common/NotificationBanner";

export default function Header() {
  return (
    <header className="w-full flex flex-col border-b border-grey">
      <NotificationBanner />
      <div className="w-full py-2 px-6 flex-between">
        <SearchBox />
        <UserTab />
      </div>
    </header>
  );
}
