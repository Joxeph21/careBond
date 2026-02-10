import { formatRelativeTime } from "@/utils/helper-functions";
import { Icon } from "@iconify/react";
import { useOptimistic, useTransition } from "react";
import { Modal } from "@/ui/Modal";
import useNotifications from "@/hooks/institution/useNotifications";

export function ActivityList({
  activity,
  setSelected,
}: {
  activity: Activity;
  setSelected?: (id: string) => void;
}) {
  return (
    <Modal.Trigger
      name="activity-details"
      onClick={() => setSelected?.(activity.id)}
    >
      <li className="w-full ring-1 flex cursor-pointer gap-3 ring-[#0059FF40] rounded-lg py-3 px-2 hover:bg-gray-50 transition-colors">
        <span className="rounded-full relative mt-1 size-9 bg-primary flex-center text-white">
          <Icon icon={"si:info-fill"} fontSize={20} />
        </span>
        <div className="flex w-full flex-col ">
          <div className="flex items-center justify-between">
            <h4 className="text-base text-[#474747] font-bold">
              {activity.action}
            </h4>
            <p className="text-[#646B72] text-xs">
              {formatRelativeTime(activity.timestamp)}
            </p>
          </div>
          <p className="text-[#191919] text-sm">
            {activity.user_name} : {activity.action}
          </p>
        </div>
      </li>
    </Modal.Trigger>
  );
}

export function NotificationList({
  title,
  message,
  id,
  created_at,
  category,
  is_read,
}: UserNotification) {
  const { read } = useNotifications();
  const getIcon = () => {
    switch (category) {
      case "alerts":
        return "si:warning-fill";
      case "messages":
        return "solar:chat-round-dots-bold";
      case "reports":
        return "flowbite:clipboard-solid";
      default:
        return "solar:bell-bold";
    }
  };

  const [optimisticIsRead, setOptimisticIsRead] = useOptimistic(
    is_read,
    (_, newState: boolean) => newState,
  );
  const [, startTransition] = useTransition();

  const icon = getIcon();

 const handleNotificationRead = () => {
  if (optimisticIsRead) return;

  startTransition(() => {
    setOptimisticIsRead(true);
  });

  read({ id, data: { is_read: true } });
};
  return (
    <li
      role="button"
      aria-label="Read notification"
      onClick={handleNotificationRead}
      className={`flex gap-3 p-3 rounded-lg my-px transition-colors cursor-pointer border-b border-grey last:border-0 ${optimisticIsRead ? "bg-blue-50/30" : "bg-primary/10"}`}
    >
      <span
        className={`size-9 rounded-full shrink-0 flex-center text-primary bg-primary/10`}
      >
        <Icon icon={icon} fontSize={20} />
      </span>
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h5
            className={`text-sm font-semibold  line-clamp-1 ${optimisticIsRead ? "text-[#1C1C1C]/50" : "text-primary"}`}
          >
            {title}
          </h5>
          <span className="text-[10px] text-grey-dark whitespace-nowrap mt-0.5">
            {formatRelativeTime(created_at)}
          </span>
        </div>
        <p className="text-xs text-grey-dark line-clamp-2 leading-relaxed">
          {message}
        </p>
      </div>
    </li>
  );
}
