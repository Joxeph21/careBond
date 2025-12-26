"use client";
import Card from "@/components/common/Card";
import DashTitle from "@/components/common/DashTitle";
import Select from "@/components/common/Select";
import Switch from "@/components/common/Switch";
import { ICON } from "@/utils/icon-exports";
import React, { useState, useRef, useEffect, useMemo } from "react";

const tabs = ["general_settings", "user's_settings", "maintenance", "security"];

export default function Page() {
  const [tab, setTab] = useState(tabs[0]);
  const containerRef = useRef(null);
  const tabRef = useRef(null);
  const [tabWidth, setTabWidth] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    if (tabRef.current && containerRef.current) {
      const tabRect = (
        tabRef.current as HTMLButtonElement
      ).getBoundingClientRect();
      const containerRect = (
        containerRef.current as HTMLDivElement
      ).getBoundingClientRect();

      setTabWidth({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  }, [tab]);

  const renderTab = () => {
    switch (tab) {
      case "general_settings":
        return (
          <>
            <GeneralSettings />
            <UserSettings />
            <MaintenanceSettings />
            <SecuritySettings />
          </>
        );
      case "user's_settings":
        return <UserSettings />;
      case "maintenance":
        return <MaintenanceSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return (
          <>
            <GeneralSettings />
            <UserSettings />
            <MaintenanceSettings />
            <SecuritySettings />
          </>
        );
    }
  };

  return (
    <section className="w-full section-container bg-white px-4 col-start h-full gap-3">
      <DashTitle title="Configurations" />
      <header className="w-full flex flex-col gap-1">
        <div className="w-full flex items-center gap-3">
          {tabs.map((el, i) => (
            <button
              ref={tab === el ? tabRef : null}
              onClick={() => setTab(el)}
              key={i}
              className={`px-5 py-2 cursor-pointer capitalize transition-colors ${
                tab === el ? "text-primary font-medium" : "text-gray-500"
              }`}
            >
              {el.split("_").join(" ")}
            </button>
          ))}
        </div>
        <div
          ref={containerRef}
          className="relative w-full bg-[#E5E5E5] h-[2px]"
        >
          <span
            style={{
              width: tabWidth.width,
              left: tabWidth.left,
            }}
            className="absolute bg-primary rounded-full h-full transition-all duration-300 ease-out"
          />
        </div>
      </header>

      <section className="w-full p-6">
        <Card className="rounded-2xl! ">
          <Card.Content className="flex flex-col gap-6 w-full">
            {renderTab()}
          </Card.Content>
        </Card>
      </section>
    </section>
  );
}

function GeneralSettings() {
  return (
    <section className="w-full flex flex-col border-b-2 border-grey pb-8 gap-4">
      <h3 className="text-[#454D5A] text-lg font-bold">General</h3>
      <ul className="w-full grid grid-cols-3 gap-8">
        <Select
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[{ label: "English", value: "en-us" }]}
          label="System Language"
        />
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            User Sign up
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow new users to sign up</p>
            <Switch />
          </div>
        </li>
        <Select
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[{ label: "English", value: "en-us" }]}
          label="Default App Language"
        />
        <Select
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[{ label: "USD ($)", value: "USD" }]}
          label="Currency"
        />
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Notifications
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow system notifications</p>
            <Switch />
          </div>
        </li>
        <Select
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
          label="Security Checks Notifications Frequency"
        />
      </ul>
    </section>
  );
}
function UserSettings() {
  return (
    <section className="w-full flex flex-col border-b-2 border-grey pb-8 gap-4">
      <h3 className="text-[#454D5A] text-lg font-bold">User&apos;s Settings</h3>
      <ul className="w-full grid grid-cols-3 gap-8">
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Users uploading Profile Picture
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow profile pictures</p>
            <Switch />
          </div>
        </li>
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Profile Edit
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow users to edit their profile</p>
            <Switch />
          </div>
        </li>
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Notifications
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Send notifications to users</p>
            <Switch />
          </div>
        </li>
      </ul>
    </section>
  );
}
function MaintenanceSettings() {
  return (
    <section className="w-full flex flex-col border-b-2 border-grey pb-8 gap-4">
      <h3 className="text-[#454D5A] text-lg font-bold">Maintainance</h3>
      <ul className="w-full grid grid-cols-3 gap-8">
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Backup User Logs
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Enable Backup of logs</p>
            <Switch />
          </div>
        </li>
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Show System Logs
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow Admins to view logs</p>
            <Switch />
          </div>
        </li>
        <Select
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
          label="Scheduled Maintenance Frequency"
        />
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Scheduled Maintenance Time
          </h3>
          datenTime
        </li>
      </ul>
    </section>
  );
}
function SecuritySettings() {
  return (
    <section className="w-full flex flex-col pb-8 gap-4">
      <h3 className="text-[#454D5A] text-lg font-bold">Security</h3>
      <ul className="w-full grid grid-cols-3 gap-8">
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Two Factor Authentication (2FA)
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Require Two Factor Authentication</p>
            <Switch />
          </div>
        </li>
        <Select
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "7", value: "7" },

          ]}
          label="Login Attempts before Account Lockout"
        />
      </ul>
    </section>
  );
}
