import React from "react";
import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import Select from "../common/Select";
import Link from "next/link";
// import { dummy_activities } from "@/utils/dummy";
import { ActivityList } from "../common/List";
import Skeleton from "../common/Skeleton";

export default function Activities({
  data,
}: {
  data: Institution_dashboard_response["recent_activities"];
}) {
  return (
    <Card className="col-span-3 flex flex-col  min-h-96">
      <Card.Header>
        <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
          <span className="flex-center size-6.5 rounded-md bg-[#EEEEEE]">
            <Icon icon={ICON.BOX} fontSize={21} />
          </span>{" "}
          Recent Activities
        </h3>

        <Select
          icon={ICON.CARET_DOWN3}
          variant="regular"
          data={[{ label: "Today", value: "today" }]}
        >
          <Icon icon={ICON.CALENDER} fontSize={18} />
        </Select>
      </Card.Header>
      <Card.Content className="flex items-center flex-col gap-3">
        {data.length === 0 ? (
          <p className="my-auto">No activities found</p>
        ) : (
          data.slice(0, 4).map((el, i) => <ActivityList {...el} key={i} />)
        )}
      </Card.Content>

      <Card.Footer className="flex-center mt-auto pb-3">
        <Link
          href={"/institutions/activities"}
          className="underline text-center text-[#212B36]"
        >
          View All
        </Link>
      </Card.Footer>
    </Card>
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
