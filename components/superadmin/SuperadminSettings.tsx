"use client";
import Card from "@/components/common/Card";
import DashTitle from "@/components/common/DashTitle";
import Select from "@/components/common/Select";
import Switch from "@/components/common/Switch";
import { ICON } from "@/utils/icon-exports";
import useTabs from "@/hooks/useTabs";
import useAdminConfig from "@/hooks/superadmin/useAConfig";
import useAdmin from "@/hooks/auth/useAdmin";
import { useModifyConfig } from "@/hooks/useModifyConfig";
import toast from "react-hot-toast";
import { normalizeDate } from "@/utils/helper-functions";
import TimeInput from "../common/TimeInput";
import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";

const tabs = ["general_settings", "user's_settings", "maintenance", "security"];

export default function SuperAdminSettings() {
  const { tab, setTab, containerRef, tabRef, tabWidth } = useTabs(tabs[0]);
  const { config, isLoading } = useAdminConfig();
  const { data, isSuperAdmin } = useAdmin();
  const { mutateAsync: updateConfig, isPending: isUpdatingConfig } =
    useModifyConfig(data?.id ?? "", isSuperAdmin);

  const handleUpdate = async (
    update: Partial<Admin_Config | InstitutionConfig>,
  ) => {
    try {
      await updateConfig(update);
      toast.success("Settings updated successfully");
    } catch {
      toast.error("Failed to update settings");
    }
  };

  const renderTab = () => {
    switch (tab) {
      case "general_settings":
        return (
          <AllSettings
            {...config}
            isLoading={isLoading || isUpdatingConfig}
            handleUpdate={handleUpdate}
          />
        );
      case "user's_settings":
        return (
          <UserSettings
            {...config}
            isLoading={isLoading || isUpdatingConfig}
            handleUpdate={handleUpdate}
          />
        );
      case "maintenance":
        return (
          <MaintenanceSettings
            {...config}
            isLoading={isLoading || isUpdatingConfig}
            handleUpdate={handleUpdate}
          />
        );
      case "security":
        return (
          <SecuritySettings
            {...config}
            isLoading={isLoading || isUpdatingConfig}
            handleUpdate={handleUpdate}
          />
        );
      default:
        return <AllSettings {...config} handleUpdate={handleUpdate} />;
    }
  };

  return (
    <section className="w-full section-container bg-white px-4 col-start gap-3">
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

function AllSettings({
  isLoading,
  handleUpdate,
  ...config
}: {
  isLoading?: boolean;
  handleUpdate: (
    data: Partial<Admin_Config | InstitutionConfig>,
  ) => Promise<void>;
} & Partial<Admin_Config>) {
  return (
    <>
      <GeneralSettings
        isLoading={isLoading}
        handleUpdate={handleUpdate}
        {...config}
      />
      <UserSettings
        isLoading={isLoading}
        handleUpdate={handleUpdate}
        {...config}
      />
      <MaintenanceSettings
        isLoading={isLoading}
        handleUpdate={handleUpdate}
        {...config}
      />
      <SecuritySettings
        isLoading={isLoading}
        handleUpdate={handleUpdate}
        {...config}
      />
    </>
  );
}

export function GeneralSettings({
  system_language,
  allow_user_signup,
  default_app_language,
  currency,
  allow_system_notifications,
  security_notifications_frequency,
  isLoading,
  handleUpdate,
}: Partial<Admin_Config | InstitutionConfig> & {
  isLoading?: boolean;
  handleUpdate?: (
    data: Partial<Admin_Config | InstitutionConfig>,
  ) => Promise<void>;
}) {
  return (
    <section className="w-full flex flex-col border-b-2 border-grey pb-8 gap-4">
      <h3 className="text-[#454D5A] text-lg font-bold">General</h3>
      <ul className="w-full grid grid-cols-3 gap-8">
        <Select
          isLoading={isLoading}
          defaultValue={system_language}
          icon={ICON.CARET_DOWN3}
          size="full"
          type="optimistic"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[
            { label: "Back", value: "en-bc" },
            { label: "English", value: "English" },
          ]}
          label="System Language"
          onChange={(newValue) => handleUpdate?.({ system_language: newValue })}
        />
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            User Sign up
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow new users to sign up</p>
            <Switch
              type="optimistic"
              disabled={isLoading}
              checked={allow_user_signup}
              onChange={(newValue) =>
                handleUpdate?.({ allow_user_signup: newValue })
              }
            />
          </div>
        </li>
        <Select
          defaultValue={default_app_language}
          isLoading={isLoading}
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[
            { label: "Back", value: "en-bc" },
            { label: "English", value: "English" },
          ]}
          label="Default App Language"
          onChange={(newValue) =>
            handleUpdate?.({ default_app_language: newValue })
          }
        />
        <Select
          isLoading={isLoading}
          defaultValue={currency}
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[{ label: "USD ($)", value: "USD ($)" }]}
          label="Currency"
          onChange={(newValue) => handleUpdate?.({ currency: newValue })}
        />
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Notifications
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow system notifications</p>
            <Switch
              checked={allow_system_notifications}
              disabled={isLoading}
              onChange={(newValue) =>
                handleUpdate?.({ allow_system_notifications: newValue })
              }
            />
          </div>
        </li>
        <Select
          isLoading={isLoading}
          defaultValue={security_notifications_frequency}
          icon={ICON.CARET_DOWN3}
          size="full"
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[
            { label: "Weekly", value: "Weekly" },
            { label: "Monthly", value: "Monthly" },
            { label: "Yearly", value: "Yearly" },
          ]}
          label="Security Checks Notifications Frequency"
          onChange={(newValue) =>
            handleUpdate?.({ security_notifications_frequency: newValue })
          }
        />
      </ul>
    </section>
  );
}
export function UserSettings({
  allow_profile_pictures,
  isLoading,
  allow_profile_edit,
  send_notifications_to_users,
  handleUpdate,
}: {
  isLoading?: boolean;
  handleUpdate?: (
    data: Partial<Admin_Config | InstitutionConfig>,
  ) => Promise<void>;
} & Partial<Admin_Config>) {
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
            <Switch
              disabled={isLoading}
              checked={allow_profile_pictures}
              onChange={(newValue) =>
                handleUpdate?.({ allow_profile_pictures: newValue })
              }
            />
          </div>
        </li>
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Profile Edit
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow users to edit their profile</p>
            <Switch
              disabled={isLoading}
              checked={allow_profile_edit}
              onChange={(newValue) =>
                handleUpdate?.({ allow_profile_edit: newValue })
              }
            />
          </div>
        </li>
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Notifications
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Send notifications to users</p>
            <Switch
              disabled={isLoading}
              checked={send_notifications_to_users}
              onChange={(newValue) =>
                handleUpdate?.({ send_notifications_to_users: newValue })
              }
            />
          </div>
        </li>
      </ul>
    </section>
  );
}
export function MaintenanceSettings({
  isLoading,
  enable_log_backup,
  allow_admins_view_logs,
  maintenance_frequency,
  maintenance_time,
  handleUpdate,
}: {
  isLoading?: boolean;
  handleUpdate?: (
    data: Partial<Admin_Config | InstitutionConfig>,
  ) => Promise<void>;
} & Partial<Admin_Config>) {
  const timeZ = normalizeDate(maintenance_time ?? "");
  const [time, setTime] = useState(timeZ);

  const debouncedUpdate = useMemo(
    () =>
      debounce((val: string) => {
        handleUpdate?.({ maintenance_time: val });
      }, 1000),
    [handleUpdate],
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

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
            <Switch
              disabled={isLoading}
              checked={enable_log_backup}
              onChange={(newValue) =>
                handleUpdate?.({ enable_log_backup: newValue })
              }
            />
          </div>
        </li>
        <li className="w-full flex flex-col gap-2">
          <h3 className="pb-2 text-[#353B45] border-b border-primary">
            Show System Logs
          </h3>
          <div className="w-full flex-between">
            <p className="text-[#667185]">Allow Admins to view logs</p>
            <Switch
              disabled={isLoading}
              checked={allow_admins_view_logs}
              onChange={(newValue) =>
                handleUpdate?.({ allow_admins_view_logs: newValue })
              }
            />
          </div>
        </li>
        <Select
          icon={ICON.CARET_DOWN3}
          size="full"
          isLoading={isLoading}
          defaultValue={maintenance_frequency}
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[
            { label: "Weekly", value: "Weekly" },
            { label: "Monthly", value: "Monthly" },
            { label: "Yearly", value: "Yearly" },
          ]}
          label="Scheduled Maintenance Frequency"
          onChange={(newValue) =>
            handleUpdate?.({ maintenance_frequency: newValue })
          }
        />

        <TimeInput
          label="Scheduled Maintenance Time"
          value={time}
          onChange={(val) => {
            if (!val) return;
            setTime(val);
            debouncedUpdate(val.toString());
          }}
        />
      </ul>
    </section>
  );
}
export function SecuritySettings({
  require_2fa,
  max_login_attempts,
  isLoading,
  handleUpdate,
}: {
  isLoading?: boolean;
  handleUpdate?: (
    data: Partial<Admin_Config | InstitutionConfig>,
  ) => Promise<void>;
} & Partial<Admin_Config>) {
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
            <Switch
              disabled={isLoading}
              checked={require_2fa}
              onChange={(newValue) => handleUpdate?.({ require_2fa: newValue })}
            />
          </div>
        </li>
        <Select
          icon={ICON.CARET_DOWN3}
          size="full"
          isLoading={isLoading}
          defaultValue={max_login_attempts}
          variant="themed"
          themedClass="ring ring-[#BBD2EC] text-[#98A2B3]"
          data={[
            { label: "5", value: 5 },
            { label: "6", value: 6 },
            { label: "7", value: 7 },
          ]}
          label="Login Attempts before Account Lockout"
          onChange={(newValue) =>
            handleUpdate?.({ max_login_attempts: newValue })
          }
        />
      </ul>
    </section>
  );
}
