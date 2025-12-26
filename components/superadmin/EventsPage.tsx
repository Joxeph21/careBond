import React from 'react'
import Button from "../common/Button";
import { ICON } from "@/utils/icon-exports";
import Table from "@/ui/Table";
import { dummy_events } from '@/utils/dummy';
import EventList from './EventList';

export default function EventsPage() {
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
          <p>Action taken</p>
          <p>Country</p>
          <p>IP address</p>
          <p>Service</p>
        </Table.Header>
        <Table.Body
        data={dummy_events}
        render={(item) => <EventList {...item} key={item.id} />}
        />
      </Table>
    </section>
  )
}
