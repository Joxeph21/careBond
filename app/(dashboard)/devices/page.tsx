"use client";
import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import AddCameraForm from "@/components/forms/Add-camera-form";
import CopyBtn from "@/components/common/CopyBtn";
import useDevices, { useDeleteDevice } from "@/hooks/institution/useDevices";
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
import Pagination from "@/components/common/Pagination";
import usePaginatorParams from "@/hooks/usePaginatorParams";

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
    clearSelected,
  } = useTableSelect<Camera>({
    data: cameras ?? [],
  });

  const handleBulkDelete = () => {
    selected.forEach((id) => delete_camera(id as string));
    clearSelected();
  };

  return (
    <section className="w-full flex flex-col gap-2">
      {selected.length > 0 && (
        <TableOptions
          ids={selected as string[]}
          onConfirmDelete={handleBulkDelete}
          name="camera"
        />
      )}
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
  const { page } = usePaginatorParams();
  const { devices, isLoading, total_count, prevPage, nextPage } = useDevices({
    page,
  });
  const { delete_device, isPending: isDeleting } = useDeleteDevice();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const {
    filteredData,
    selected,
    isAllSelected,
    handleSelectAll,
    handleRowSelect,
    clearSelected,
  } = useTableSelect<Device>({
    data: devices ?? [],
  });

  const handleBulkDelete = () => {
    selected.forEach((id) => delete_device(id as string));
    clearSelected();
  };

  return (
    <section className="w-full flex flex-col gap-2">
      {selected.length > 0 && (
        <TableOptions
          ids={selected as string[]}
          onConfirmDelete={handleBulkDelete}
          name="device"
        />
      )}
      <Table columns="20px 1fr 1fr 1fr 1fr 1fr 50px">
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
          <p>Device Name</p>
          <p>Type</p>
          <p>Status</p>
          <p>Battery</p>
          <p>Last Sync</p>
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
              <p className="font-medium text-[#212B36]">{item.device_name}</p>
              <p className="capitalize">{item.device_type}</p>
              <p>
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
                  {item.status}
                </span>
              </p>
              <p>
                <span
                  className={`font-medium ${
                    item.battery_level < 20
                      ? "text-red-500"
                      : item.battery_level < 50
                        ? "text-yellow-600"
                        : "text-green-600"
                  }`}
                >
                  {item.battery_level}%
                </span>
              </p>
              <p className="text-sm text-gray-500">
                {item.last_sync
                  ? new Date(item.last_sync).toLocaleString()
                  : "Never"}
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
                        <Modal.Trigger name="device-details">
                          <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
                            onClick={() => {
                              setSelectedDevice(item);
                              closepopover();
                            }}
                          >
                            <Icon icon="solar:eye-bold" fontSize={18} />
                            View
                          </button>
                        </Modal.Trigger>

                        {/* <Modal.Trigger name="edit-device">
                          <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
                            onClick={() => {
                              setSelectedDevice(item);
                              closepopover();
                            }}
                          >
                            <Icon icon={ICON.EDIT} fontSize={18} />
                            Edit
                          </button>
                        </Modal.Trigger> */}

                        <Modal.Trigger name="delete-device">
                          <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left text-danger"
                            onClick={() => {
                              setSelectedDevice(item);
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
        <Table.Footer>
          <Pagination
            totalCount={total_count ?? 0}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </Table.Footer>
      </Table>

      <Modal.Window
        className="max-w-3xl w-full"
        hasClose
        title="Device Details"
        name="device-details"
      >
        {selectedDevice && <DeviceDetails device={selectedDevice} />}
      </Modal.Window>

      <Modal.Window className="py-2! gap-0! px-1!" name="delete-device">
        <ActionPopup
          isLoading={isDeleting}
          onConfirm={() => {
            if (selectedDevice) {
              delete_device(selectedDevice.id);
            }
          }}
          type="delete"
          name="Device"
        />
      </Modal.Window>
    </section>
  );
}

function DeviceDetails({ device }: { device: Device }) {
  const formatDate = (dateStr: string | null) =>
    dateStr ? new Date(dateStr).toLocaleString() : "N/A";

  return (
    <div className="flex flex-col gap-6 p-4 max-h-[80vh] overflow-y-auto">
      {/* Header Info */}
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Device Name" value={device.device_name} />
        <DetailItem label="Device Type" value={device.device_type} />
        <DetailItem
          label="Status"
          value={
            <span
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit capitalize ${
                device.status === "online"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  device.status === "online" ? "bg-green-600" : "bg-gray-500"
                }`}
              />
              {device.status}
            </span>
          }
        />
        <DetailItem label="Battery Level" value={`${device.battery_level}%`} />
        <DetailItem label="Is Active" value={device.is_active ? "Yes" : "No"} />
        <DetailItem label="Patient ID" value={device.patient} copyable />
        <DetailItem label="Device ID" value={device.id} copyable />
        <DetailItem label="Last Sync" value={formatDate(device.last_sync)} />
        <DetailItem label="Created At" value={formatDate(device.created_at)} />
        <DetailItem label="Updated At" value={formatDate(device.updated_at)} />
      </div>

      {/* Readings Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-[#212B36] border-b pb-2">
          Readings
        </h3>
        {device.readings && device.readings.length > 0 ? (
          <div className="grid gap-3">
            {device.readings.map((reading) => (
              <div
                key={reading.id}
                className="bg-gray-50 p-3 rounded-lg border border-gray-100 grid grid-cols-2 gap-2 text-sm"
              >
                <div className="col-span-2 flex justify-between items-center border-b border-gray-200 pb-1 mb-1">
                  <span className="font-semibold text-primary capitalize">
                    {reading.reading_type.replace("_", " ")}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(reading.recorded_at)}
                  </span>
                </div>
                <div className="text-gray-600">
                  Value:{" "}
                  <span className="font-medium text-gray-900">
                    {reading.value} {reading.unit}
                  </span>
                </div>
                <div className="text-gray-600 flex items-center gap-1">
                  ID: <span className="font-mono text-xs">{reading.id}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No readings recorded.</p>
        )}
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  copyable = false,
}: {
  label: string;
  value: React.ReactNode;
  copyable?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500 uppercase font-semibold">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {copyable && typeof value === "string" && (
          <CopyBtn label={label} value={value} size={16} />
        )}
        <div className="text-sm font-medium max-w-[70%] truncate text-gray-900">
          {value}
        </div>
      </div>
    </div>
  );
}
