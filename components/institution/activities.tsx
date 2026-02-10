import React, { useState } from "react";
import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import { ActivityList } from "../common/List";
import Skeleton from "../common/Skeleton";
import { useParams } from "next/navigation";
import {
  useGetActivities,
  useGetActivityById,
} from "@/hooks/institution/useActivities";
import { Modal } from "@/ui/Modal";
import { GeneralSeeAllModal } from "../superadmin/SuperAdminTab";
import ActivityIndicator from "../common/ActivityIndicator";
import { format } from "date-fns";
import { getDeviceDetails } from "@/utils/helper-functions";

export default function Activities() {
  const { id } = useParams();
  const { activities, isLoading } = useGetActivities({
    institution_id: id as string,
  });
  const [selected, setSelected] = useState<string | null>(null);
  const { activity: data, isLoading: activityLoading } = useGetActivityById(
    selected!,
  );
  if (isLoading) return <Activities.Skeleton />;

  return (
    <Modal>
      <Card className="col-span-3 flex flex-col overflow-hidden  max-h-[550px]">
        <Card.Header>
          <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
            <span className="flex-center size-6.5 rounded-md bg-[#EEEEEE]">
              <Icon icon={ICON.BOX} fontSize={21} />
            </span>{" "}
            Recent Activities
          </h3>

         <Modal.Trigger name="see-all">
            <button className="underline text-center text-[#212B36] cursor-pointer">
              View All
            </button>
          </Modal.Trigger>
        </Card.Header>
        <Card.Content className="flex items-center flex-col gap-3">
          {activities?.length === 0 ? (
            <p className="my-auto">No activities found</p>
          ) : (
            <ul className="flex flex-col gap-3 w-full">
              {activities?.slice(0, 4).map((el, i) => (
                <ActivityList activity={el} setSelected={setSelected} key={i} />
              ))}
            </ul>
          )}
        </Card.Content>

        <Card.Footer className="flex-center mt-auto pb-3">
         
        </Card.Footer>
      </Card>

      <Modal.Window
        className="w-2xl! min-h-[60vh]"
        noClose
        hasClose
        name="see-all"
        title="Recent Activities"
      >
        <GeneralSeeAllModal
          setSelected={setSelected}
          institution_id={id as string}
        />
      </Modal.Window>

      <Modal.Window
        className="w-xl!"
        noClose
        hasClose
        name="activity-details"
        title={data?.user_name || "Loading..."}
      >
        {activityLoading && (
          <div className="flex-center text-primary w-full py-14">
            <ActivityIndicator />
          </div>
        )}

        {data && (
          <div className="flex flex-col w-full gap-6 p-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-[#999999] uppercase font-semibold">
                  User
                </p>
                <p className="text-[#1C1C1C] font-medium">{data.user_name}</p>
                <p className="text-sm text-[#646464]">{data.user_email}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-[#999999] uppercase font-semibold">
                  Role
                </p>
                <span className="inline-block text-[10px] font-bold text-primary uppercase px-2 py-0.5 bg-[#EEF3FF] rounded border border-[#CBD5FF]">
                  {data.role.split("_").join(" ")}
                </span>
              </div>
            </div>

            <div className="h-px bg-[#E6EBF4]" />

            <div className="space-y-2">
              <p className="text-xs text-[#999999] uppercase font-semibold">
                Action
              </p>
              <p className="text-[#1C1C1C] text-sm leading-relaxed">
                {data.action}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-[#999999] uppercase font-semibold">
                  IP Address
                </p>
                <p className="text-sm text-[#646464] font-mono">
                  {data.ip_address}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-[#999999] uppercase font-semibold">
                  Time
                </p>
                <p className="text-sm text-[#646464]">
                  {format(new Date(data.timestamp), "MMM dd, yyyy • hh:mm a")}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-[#999999] uppercase font-semibold">
                Device Info
              </p>
              <div className="bg-[#F9FAFB] p-3 rounded border border-[#E6EBF4] space-y-2">
                <p className="text-sm font-medium text-[#1C1C1C]">
                  {getDeviceDetails(data.user_agent)}
                </p>
                <p className="text-[10px] text-[#646464] font-mono break-all line-clamp-2">
                  {data.user_agent}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal.Window>
    </Modal>
  );
}

Activities.Skeleton = function ActivitiesSkeleton() {
  return (
    <Card className="col-span-3 flex flex-col min-h-96">
      <Card.Header>
        <div className="flex items-center gap-2">
          <Skeleton className="size-6.5 rounded-md" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
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
      <Card.Footer className="flex justify-center pb-3">
        <Skeleton className="h-4 w-20" />
      </Card.Footer>
    </Card>
  );
};
