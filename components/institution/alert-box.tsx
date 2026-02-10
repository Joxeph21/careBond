import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import { NotificationList } from "../common/List";
import Skeleton from "../common/Skeleton";
import useNotifications from "@/hooks/institution/useNotifications";
import { Modal } from "@/ui/Modal";
import { NotificationWindow } from "../common/NotificationTab";
import { useParams } from "next/navigation";

export default function AlertBox() {
  const {id} = useParams()
  const { notifications, isLoading } = useNotifications({institution_id: id as string, level: "critical"});

  return (
    <Modal>
      <Card className="col-span-3 h-full! overflow-hidden max-h-[550px]">
        <Card.Header>
          <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
            <span className="flex-center size-6.5 rounded-md bg-[#FFEDE9] text-danger">
              <Icon icon={ICON.ALERT_OUTLINED} fontSize={21} />
            </span>{" "}
            Important Alerts
          </h3>
          <Modal.Trigger name="all-notifications">
            <button className="underline cursor-pointer text-[#212B36]">
              View All
            </button>
          </Modal.Trigger>
        </Card.Header>
        <Card.Content className="flex items-center h-full flex-col gap-3">
          <div className="h-full w-full relative">
            {isLoading ? (
              <div className="py-10 flex-center">
                <Icon
                  icon="line-md:loading-twotone-loop"
                  className="text-primary"
                  fontSize={24}
                />
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-12 flex flex-col my-auto items-center gap-2 text-grey-dark">
                <Icon icon="solar:bell-off-outline" fontSize={32} />
                <p className="text-sm">No alerts yet</p>
              </div>
            ) : (
              <ul className="flex h-full flex-col">
                {notifications?.slice(0, 6)?.map((notif) => (
                  <NotificationList key={notif.id} {...notif} />
                ))}
              </ul>
            )}
          </div>
        </Card.Content>
      </Card>
      <NotificationWindow id={id as string} defaultTab="critical" />
    </Modal>
  );
}

AlertBox.Skeleton = function AlertBoxSkeleton() {
  return (
    <Card className="col-span-3 min-h-96">
      <Card.Header>
        <div className="flex items-center gap-2">
          <Skeleton className="size-6.5 rounded-md" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-4 w-16" />
      </Card.Header>
      <Card.Content className="flex flex-col gap-4 px-4 py-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3 w-full">
            <Skeleton className="size-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
};
