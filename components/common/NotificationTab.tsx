import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";

type NotifcationProps = {
  hasUnread?: boolean;
};

export default function NotificationTab({ hasUnread }: NotifcationProps) {
  return (
    <button
      type="button"
      className="icon-btn"
      role="switch"
      aria-checked={false}
    >
      {hasUnread && (
        <span className="size-2 absolute top-2 left-1/2 rounded-full bg-[#C50226]"></span>
      )}
      <Icon color="#A9A9A9" icon={ICON.BELL} fontSize={24} />
    </button>
  );
}
