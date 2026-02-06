import React from "react";
import Button from "../common/Button";
import { ICON } from "@/utils/icon-exports";
import Table from "@/ui/Table";
import EventList from "./EventList";
import useCloudLogs from "@/hooks/superadmin/useLogs";
import Pagination from "../common/Pagination";

export default function EventsPage() {
  
  
  const { logs, total_count, nextPage, prevPage, isLoading } = useCloudLogs();


  return (
    <section className="section-container h-full flex flex-col gap-3">
      <div className="w-full flex-between">
        <h3 className="font-semibold text-[#313131]">Sampled logs</h3>

        <div className="flex-center gap-2">
          <Button
            config={{
              className: "ring-primary! gap-1! font-semibold!  text-primary!",
            }}
            iconPlacement="left"
            icon={ICON.DOWNLOAD2}
            variants={"outlined"}
            size="medium"
          >
            Export
          </Button>
          <Button
            config={{
              className: "ring-primary! gap-1! font-semibold!  text-primary!",
            }}
            iconPlacement="left"
            icon={ICON.SETTINGS}
            variants={"outlined"}
            size="medium"
          >
            Edit columns
          </Button>
        </div>
      </div>
      <Table columns="20px 1fr .8fr .5fr .8fr .8fr">
        <Table.Header>
          <div></div>
          <p>Date</p>
          <p>Method</p>
          <p>Country</p>
          <p>IP address</p>
          <p>Host</p>
        </Table.Header>
        <Table.Body
          isLoading={isLoading}
          data={logs ?? []}
          render={(item) => <EventList {...item} key={item.id} />}
        />
        <Table.Footer>
          <Pagination
            totalCount={total_count}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </Table.Footer>
      </Table>
    </section>
  );
}
