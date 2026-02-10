"use client";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import useNotifications from "@/hooks/institution/useNotifications";
import { NotificationList } from "./List";
import { Modal } from "@/ui/Modal";
import NotificationPopup from "@/ui/NotificationPopup";

type NotifcationProps = {
  hasUnread?: number;
};

export default function NotificationTab({
  hasUnread: initialHasUnread,
}: NotifcationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { notifications, isLoading } = useNotifications();

  const hasUnread = initialHasUnread || notifications.some((n) => !n.is_read);

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
                      <NotificationList key={notif.id} {...notif} />
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

      <NotificationWindow />
    </Modal>
  );
}

export function NotificationWindow({
  defaultTab,
  id,
}: {
  defaultTab?: NotificationLevel | undefined;
  id?: string;
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
      <NotificationPopup defaultTab={defaultTab} id={id} />
    </Modal.Window>
  );
}
