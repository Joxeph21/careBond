"use client";
import React from "react";
import Card from "../common/Card";
import Image from "next/image";
import Button from "../common/Button";
import Table from "@/ui/Table";
import useTableSelect from "@/hooks/useTableSelect";
import { Icon } from "@iconify/react";
import { dummy_devices, dummy_family } from "@/utils/dummy";
import FamilyList from "./familylist";
import { Modal } from "@/ui/Modal";
import AddFamilyForm from "../forms/AddFamilyForm";
import DeviceList from "./device-list";
import AssignFamilyForm from "../forms/assign-family";

export default function Family_and_Devices() {
  return (
    <Modal>
      <Card className="px-6 h-full! py-6.5">
        <header className="w-full flex items-center gap-2">
          <span className="rounded-full relative overflow-hidden size-9 bg-[#657987] flex-center text-center">
            <Image
              className="object-contain object-center relative ml-1 my-0.5"
              src={"/svgs/briefcase.svg"}
              aria-hidden
              width={20}
              height={20}
              alt=""
            />
          </span>
          <div>
            <h3 className="text-lg font-bold text-[#454D5A]">
              Family, Professionals And Devices
            </h3>
            <p className="text-[#8E8E8E]">
              Manage the list of Family members that can view profile and
              reecords
            </p>
          </div>
        </header>

        <Card.Content className="px-0! flex flex-col gap-5 h-full">
          <FamilyTable />
          <DevicesTable />
        </Card.Content>
      </Card>
    </Modal>
  );
}

function FamilyTable() {
  const {
    isAllSelected,
    handleSelectAll,
    filteredData,
    selected,
    handleRowSelect,
  } = useTableSelect({
    data: dummy_family,
  });
  return (
    <Modal>
      <section className="flex flex-col gap-3.5">
        <h6 className=" font-bold text-[#23313B]">Family</h6>
        <div className="w-full">
          <Modal.Trigger name="assign-family">
            <Button
              config={{
                className: "px-0! gap-2! text-[#657987]! ring-0!",
              }}
              iconPlacement="left"
              size="medium"
              icon="mdi:plus-circle-outline"
              variants="outlined"
            >
              Add Family Member
            </Button>
          </Modal.Trigger>
        </div>
        <Table columns="20px 1.5fr 1fr 1fr 1.2fr 20px">
          <Table.Header>
            <div className="text-left">
              <input
                type="checkbox"
                className="cursor-pointer"
                name="select-all"
                id="select-all"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>
            <p>Name</p>
            <p>User ID</p>
            <p className="flex gap-1 items-center">
              Role
              <Icon
                color="#98A2B3"
                icon={"material-symbols:help-outline-rounded"}
                fontSize={18}
              />
            </p>
            <div></div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={filteredData}
            render={(item) => (
              <FamilyList
              key={item.id}
                isSelected={selected.includes(item.id)}
                handleRowSelect={handleRowSelect}
                {...item}
              />
            )}
          />
        </Table>
      </section>

      <Modal.Window
        className="w-lg!"
        hasClose={false}
        name="assign-family"
      >
        <AssignFamilyForm />
      </Modal.Window>
      <Modal.Window
        className="w-xl!"
        title="Add Family Member"
        hasClose
        name="add-family"
      >
        <AddFamilyForm />
      </Modal.Window>
    </Modal>
  );
}

const DevicesTable = () => {
  const {
    isAllSelected,
    handleSelectAll,
    filteredData,
    selected,
    handleRowSelect,
  } = useTableSelect<Devices>({
    data: dummy_devices,
    searchKeys: ["device_name"],
  });
  return (
    <section className="flex flex-col gap-3.5">
      <h6 className=" font-bold text-[#23313B]">Devices</h6>

      <Table columns="20px 1.5fr 1fr 1fr 1.2fr 20px">
        <Table.Header>
          <div className="text-left">
            <input
              type="checkbox"
              className="cursor-pointer"
              name="select-all"
              id="select-all"
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
          </div>
          <p>Name</p>
          <p>Signing Key</p>
          <p className="flex gap-1 items-center">
            Connection Mode
            <Icon
              color="#98A2B3"
              icon={"material-symbols:help-outline-rounded"}
              fontSize={18}
            />
          </p>
          <div></div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredData}
          render={(item) => (
            <DeviceList
            key={item.id}
              isSelected={selected.includes(item.id)}
              handleRowSelect={handleRowSelect}
              {...item}
            />
          )}
        />
      </Table>
    </section>
  );
};
