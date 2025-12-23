import Table from "@/ui/Table";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";

export default function RecentPlanTransaction() {
  return (
    <section className="w-full bg-white py-5.5 flex flex-col gap-10 px-5 rounded-lg min-h-96 ring ring-grey">
      <div className="flex-between w-full text-[#4A4A4A]">
        <h3 className="font-medium text-lg">Institution Subscription</h3>

        <button className="cursor-pointer">
          <Icon icon={ICON.ELIPSIS} fontSize={30} />
        </button>
      </div>

      <Table border={false} columns="1fr .5fr .5fr .5fr .4fr">
        <Table.Header className="border-b border-grey">
          <p>Institution Name</p>
          <p>Date last due</p>
          <p>Plan</p>
          <p>Status</p>
          <p></p>
        </Table.Header>

        <Table.Body
        data={[]}
        >

        </Table.Body>
      </Table>
    </section>
  );
}
