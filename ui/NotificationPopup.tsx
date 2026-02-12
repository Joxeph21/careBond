import { NotificationList } from "@/components/common/List";
import useNotifications from "@/hooks/institution/useNotifications";
import { Icon } from "@iconify/react";
import { useState } from "react";

const tabs: { label: string; value: NotificationLevel | undefined }[] = [
  {
    label: "All",
    value: undefined,
  },
  {
    label: "Important",
    value: "important",
  },
  {
    label: "Warning",
    value: "warning",
  },
  {
    label: "Critical",
    value: "critical",
  },
];

export default function NotificationPopup({
  defaultTab,
  id,
  setSelected,
}: {
  defaultTab?: NotificationLevel | undefined;
  id?: string;
  setSelected?: (notif: UserNotification) => void;
}) {
  const [activeTab, setActiveTab] = useState<NotificationLevel | undefined>(
    defaultTab,
  );

  const {
    notifications,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotifications({ level: activeTab, institution_id: id });

  const getTabColor = (
    value: NotificationLevel | undefined,
    isActive: boolean,
  ) => {
    if (!isActive) return "bg-white text-grey-dark ring-grey";

    switch (value) {
      case "important":
        return "bg-[#0E9384] text-white ring-[#0E9384]";
      case "warning":
        return "bg-[#F59E0B] text-white ring-[#F59E0B]";
      case "critical":
        return "bg-[#EF4444] text-white ring-[#EF4444]";
      default:
        return "bg-primary text-white ring-primary";
    }
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <header className="w-full backdrop-blur-sm  sticky top-0 flex item-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 cursor-pointer py-2 rounded-lg text-sm font-medium transition-all ring-1 ${getTabColor(tab.value, activeTab === tab.value)}`}
          >
            {tab.label}
          </button>
        ))}
      </header>
      <div className="flex flex-col w-full h-full min-h-[40vh]">
        <div className="flex-1 overflow-y-auto pr-1">
          {isLoading ? (
            <div className="py-20 flex-center w-full">
              <Icon
                icon="line-md:loading-twotone-loop"
                className="text-primary"
                fontSize={32}
              />
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-20 flex flex-col items-center gap-3 text-grey-dark w-full">
              <Icon icon="solar:bell-off-outline" fontSize={48} />
              <p className="text-base font-medium">No notifications yet</p>
              <p className="text-xs max-w-[200px] text-center">
                When you get notifications, they&apos;ll show up here.
              </p>
            </div>
          ) : (
            <ul className="flex w-full flex-col gap-1">
              {notifications.map((notif) => (
                <NotificationList
                  key={notif.id}
                  {...notif}
                  setSelected={setSelected}
                />
              ))}
            </ul>
          )}
        </div>

        {hasNextPage && (
          <div className="pt-4 mt-auto border-t border-grey flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="text-sm text-primary font-semibold py-2 px-6 rounded-lg hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isFetchingNextPage ? (
                <>
                  <Icon icon="line-md:loading-twotone-loop" />
                  Loading...
                </>
              ) : (
                "Load More Activities"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
