import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import Link from "next/link";
import { dummy_alerts } from "@/utils/dummy";
import { AlertList } from "../common/List";

export default function AlertBox({ data }: { data: [] }) {
  return (
    <Card className="col-span-3 min-h-96">
      <Card.Header>
        <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
          <span className="flex-center size-6.5 rounded-md bg-[#FFEDE9] text-danger">
            <Icon icon={ICON.ALERT_OUTLINED} fontSize={21} />
          </span>{" "}
          Important Alerts
        </h3>
        <Link href={"/institutions/alert"} className="underline text-[#212B36]">
          View All
        </Link>
      </Card.Header>
      <Card.Content className="flex items-center flex-col gap-3">
        {data?.length === 0 ? (
          <p>No alerts found</p>
        ) : (
          dummy_alerts.slice(0, 4).map((el, i) => <AlertList {...el} key={i} />)
        )}
      </Card.Content>
    </Card>
  );
}
