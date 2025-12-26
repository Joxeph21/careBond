import React from "react";
import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import Select from "../common/Select";
import Link from "next/link";
import { dummy_activities } from "@/utils/dummy";
import { ActivityList } from "../common/List";

export default function Activities() {
  return (
    <Card className="col-span-3">
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
      <Card.Content className="flex flex-col gap-3">
        {dummy_activities.slice(0,4).map((el, i) => (
          <ActivityList {...el} key={i} />
        ))}
      </Card.Content>

      <Card.Footer className="flex-center pb-3">
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
