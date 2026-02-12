"use client";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import useNotifications from "@/hooks/institution/useNotifications";
import { NotificationList } from "./List";
import { Modal, useModal } from "@/ui/Modal";
import NotificationPopup from "@/ui/NotificationPopup";
import { useBrowserNotification } from "@/hooks/useBrowserNotification";
import { useEffect, useRef } from "react";

type NotifcationProps = {
  hasUnread?: number;
};

export default function NotificationTab({
  hasUnread: initialHasUnread,
}: NotifcationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { notifications, isLoading } = useNotifications();
  const [selectedNotif, setSelectedNotif] = useState<UserNotification | null>(
    null,
  );
  const { permission, requestPermission, sendNotification } =
    useBrowserNotification();
  const notifiedIds = useRef<Set<string>>(new Set());

  const hasUnread = initialHasUnread || notifications.some((n) => !n.is_read);

  useEffect(() => {
    if (permission === "default") {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    if (notifications.length > 0 && permission === "granted") {
      const latestUnread = notifications.filter((n) => !n.is_read);

      latestUnread.forEach((notif) => {
        if (!notifiedIds.current.has(notif.id)) {
          sendNotification(notif.title, {
            body: notif.message,
            icon: "/logo.svg",
          });
          notifiedIds.current.add(notif.id);
        }
      });
    }
  }, [notifications, permission, sendNotification]);

  return (
    <Modal>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          className="icon-btn"
          role="switch"
          aria-checked={false}
        >
          {hasUnread && (
            <span className="size-2.5 flex-center text-white absolute top-2 right-2 rounded-full bg-danger z-10 "></span>
          )}
          <Icon color="#A9A9A9" icon={ICON.BELL} fontSize={24} />
        </button>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-lg bg-white rounded-xl shadow-card-shadow border border-grey overflow-hidden z-50 origin-top-right"
            >
              <header className="px-4 py-3 border-b border-grey flex-between bg-white sticky top-0 z-10">
                <h4 className="font-bold text-[#212B36] text-base">
                  Notifications
                </h4>

                {/* Dummy button to Trigger test Notifications */}
                {/* <button
                  type="button"
                  onClick={() =>
                    sendNotification("Test Notification", {
                      body: "This is a dummy notification to test browser functionality!",
                      icon: "/logo.svg",
                    })
                  }
                  className="text-[10px] font-bold text-primary uppercase px-2 py-0.5 bg-primary/10 rounded border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  Test
                </button> */}
              </header>

              <div className="max-h-[350px] overflow-y-auto scrollbar-hide bg-white">
                {isLoading ? (
                  <div className="py-10 flex-center">
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-primary"
                      fontSize={24}
                    />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="py-12 flex flex-col items-center gap-2 text-grey-dark">
                    <Icon icon="solar:bell-off-outline" fontSize={32} />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                ) : (
                  <ul className="flex flex-col">
                    {notifications.slice(0, 6).map((notif) => (
                      <NotificationList
                        setSelected={setSelectedNotif}
                        key={notif.id}
                        {...notif}
                      />
                    ))}
                  </ul>
                )}
              </div>

              <footer className="p-2 border-t border-grey bg-gray-50/50">
                <Modal.Trigger name="all-notifications">
                  <button
                    aria-label="View all notifications"
                    className="block cursor-pointer w-full py-2 text-center text-sm text-[#212B36] font-medium hover:bg-white rounded-lg transition-colors border border-transparent hover:border-grey"
                  >
                    View all notifications
                  </button>
                </Modal.Trigger>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NotificationWindow setSelected={setSelectedNotif} />

      <Modal.Window
        className="w-xl!"
        hasClose
        name="notification-details"
        title={selectedNotif?.title || "Notification Details"}
      >
        {selectedNotif && <NotificationDetails notif={selectedNotif} />}
      </Modal.Window>
    </Modal>
  );
}

function NotificationDetails({ notif }: { notif: UserNotification }) {
  const { read } = useNotifications();
  const { closeModal } = useModal();

  const handleMarkUnread = () => {
    read({ id: notif.id, data: { is_read: false } });
    closeModal?.("notification-details");
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <span className="size-12 rounded-full flex-center bg-primary/10 text-primary">
          <Icon
            icon={
              notif.category === "alerts"
                ? "si:warning-fill"
                : notif.category === "messages"
                  ? "solar:chat-round-dots-bold"
                  : notif.category === "reports"
                    ? "flowbite:clipboard-solid"
                    : "solar:bell-bold"
            }
            fontSize={28}
          />
        </span>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-[#212B36]">{notif.title}</h3>
          <p className="text-xs text-grey-dark">
            {new Date(notif.created_at).toLocaleDateString()} at{" "}
            {new Date(notif.created_at).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl border border-grey flex flex-col gap-4">
        <p className="text-[#474747] leading-relaxed whitespace-pre-wrap">
          {notif.message}
        </p>

        {notif.is_read && (
          <button
            onClick={handleMarkUnread}
            className="w-fit text-primary py-1 px-3 rounded-md hover:bg-primary/5 transition-colors text-sm font-semibold cursor-pointer border border-primary/20"
          >
            Mark as unread
          </button>
        )}
      </div>

      {notif.extra_data && Object.keys(notif.extra_data).length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-grey-dark uppercase tracking-wider">
            Additional Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(notif.extra_data).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-xs text-grey-dark capitalize">
                  {key.replace("_", " ")}
                </p>
                <p className="text-sm font-medium text-[#212B36]">
                  {String(value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function NotificationWindow({
  defaultTab,
  id,
  setSelected,
}: {
  defaultTab?: NotificationLevel | undefined;
  id?: string;
  setSelected?: (notif: UserNotification) => void;
}) {
  return (
    <Modal.Window
      noClose
      titleLeft
      className="w-3xl!"
      title="Notifications"
      hasClose
      name="all-notifications"
    >
      <NotificationPopup
        setSelected={setSelected}
        defaultTab={defaultTab}
        id={id}
      />
    </Modal.Window>
  );
}
