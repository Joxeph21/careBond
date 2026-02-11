"use client";
import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import AddCameraForm from "@/components/forms/Add-camera-form";
import {
  useDeleteCamera,
  useGetCameras,
} from "@/hooks/institution/usePatients";
import useTableSelect from "@/hooks/useTableSelect";
import useTabs from "@/hooks/useTabs";
import ActionPopup from "@/ui/ActionPopup";
import { Modal } from "@/ui/Modal";
import Popover from "@/ui/Popover";
import Table from "@/ui/Table";
import TableOptions from "@/ui/TableOptions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { Activity, useState } from "react";

const tabs = ["camera", "others"];

export default function DevicesPage() {
  const { tab, setTab, tabRef, tabWidth, containerRef } = useTabs(tabs[0]);

  return (
    <Modal>
      <section className="w-full pb-5 bg-white section-container col-start gap-5 px-4">
        <DashTitle title="Devices">
          <Modal.Trigger name="add-camera">
            <Button icon={ICON.PLUS}>Add Camera</Button>
          </Modal.Trigger>
        </DashTitle>

        <header className="w-full flex flex-col gap-1">
          <div className="w-full flex items-center gap-3">
            {tabs.map((el, i) => (
              <button
                ref={tab === el ? tabRef : null}
                onClick={() => setTab(el)}
                key={i}
                className={`px-5 py-2 cursor-pointer capitalize transition-colors ${
                  tab === el ? "text-primary font-medium" : "text-gray-500"
                }`}
              >
                {el}
              </button>
            ))}
          </div>
          <div
            ref={containerRef}
            className="relative w-full bg-[#E5E5E5] h-[2px]"
          >
            <span
              style={{
                width: tabWidth.width,
                left: tabWidth.left,
              }}
              className="absolute bg-primary rounded-full h-full transition-all duration-300 ease-out"
            />
          </div>
        </header>

        <section className="w-full">
          <Activity mode={tab === "camera" ? "visible" : "hidden"}>
            <CameraTable />
          </Activity>
          <Activity mode={tab === "others" ? "visible" : "hidden"}>
            <Devices />
          </Activity>
        </section>
      </section>

      <Modal.Window
        hasClose
        className="max-w-2xl w-full!"
        title="Add Camera"
        name="add-camera"
      >
        <AddCameraForm />
      </Modal.Window>
    </Modal>
  );
}

function CameraTable() {
  const { cameras, isLoading } = useGetCameras();
  const { delete_camera, isPending: isDeleting } = useDeleteCamera();
  const [selectedItem, setSelectedItem] = useState<Camera | null>(null);

  const {
    filteredData,
    selected,
    isAllSelected,
    handleSelectAll,
    handleRowSelect,
  } = useTableSelect<Camera>({
    data: cameras ?? [],
  });

  return (
    <section className="w-full flex flex-col gap-2">
      {selected.length > 0 && <TableOptions ids={selected} />}
      <Table columns="20px .5fr .5fr .5fr .5fr .2fr 20px">
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
          <p>Camera Name</p>
          <p>Id</p>
          <p>Patient Name</p>
          <p>Location</p>
          <p>Status</p>
          <div></div>
        </Table.Header>
        <Table.Body
          isLoading={isLoading}
          data={filteredData}
          render={(item) => (
            <Table.Row isHighlighted={selected.includes(item.id)} key={item.id}>
              <p>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  name="select-row"
                  id="select-row"
                  checked={selected.includes(item.id)}
                  onChange={() => handleRowSelect(item.id)}
                />
              </p>
              <p>{item.name}</p>
              <p className="truncate">{item.id}</p>
              <Link
                href={`/users/${item.patient}`}
                className="truncate capitalize cursour-pointer underline text-primary font-medium"
              >
                {item.patient_name}
              </Link>
              <p className="truncate capitalize">{item.location}</p>
              <p className="truncate">
                <span
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit capitalize ${
                    item.status === "online"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      item.status === "online" ? "bg-green-600" : "bg-gray-500"
                    }`}
                  />
                  {item.status_display}
                </span>
              </p>
              <Popover>
                <Popover.Menu>
                  <Popover.Trigger>
                    <button
                      type="button"
                      className="cursor-pointer flex-center"
                    >
                      <Icon icon={ICON.MENU} fontSize={20} />
                    </button>
                  </Popover.Trigger>
                  <Popover.Content className="left-auto! shadow-card-shadow right-0! min-w-20!">
                    {(closepopover) => (
                      <ul className="flex flex-col gap-2">
                        <Modal.Trigger name="edit-camera">
                          <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
                            onClick={() => {
                              setSelectedItem(item);
                              closepopover();
                            }}
                          >
                            <Icon icon={ICON.EDIT} fontSize={18} />
                            Edit
                          </button>
                        </Modal.Trigger>

                        <Modal.Trigger name="delete-camera">
                          <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left text-danger"
                            onClick={() => {
                              setSelectedItem(item);
                              closepopover();
                            }}
                          >
                            <Icon icon={ICON.TRASH} fontSize={18} />
                            Delete
                          </button>
                        </Modal.Trigger>
                      </ul>
                    )}
                  </Popover.Content>
                </Popover.Menu>
              </Popover>
            </Table.Row>
          )}
        />
      </Table>

      <Modal.Window
        className="max-w-2xl w-full!"
        hasClose
        title="Edit Camera"
        name="edit-camera"
      >
        <AddCameraForm type="edit" data={selectedItem!} />
      </Modal.Window>

      <Modal.Window className="py-2! gap-0! px-1!" name="delete-camera">
        <ActionPopup
          isLoading={isDeleting}
          onConfirm={() => {
            if (selectedItem) {
              delete_camera(selectedItem.id);
            }
          }}
          type="delete"
          name="Camera"
        />
      </Modal.Window>
    </section>
  );
}

function Devices() {
  return (
    <Table columns="20px 1fr .5fr 1fr .5fr .5fr 20px">
      <Table.Header>
        <div className="text-left">
          <input
            type="checkbox"
            className="cursor-pointer"
            name="select-all"
            id="select-all"
            // checked={isAllSelected}
            // onChange={handleSelectAll}
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
    </Table>
  );
}
