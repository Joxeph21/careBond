"use client";
import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import { ICON } from "@/utils/icon-exports";
import { Modal } from "@/ui/Modal";
import CreateInstitutionForm from "@/components/forms/CreateInstitutionForm";
import React, { useState, useMemo } from "react";
import SearchAndFilter from "@/ui/SearchAndFilter";
import Table from "@/ui/Table";
import {
  formatDate,
  formatTime24h,
  getStatusStyle,
} from "@/utils/helper-functions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useTableSelect from "@/hooks/useTableSelect";
import Pagination from "@/components/common/Pagination";
import {
  useDeleteInstitution,
  useEditInstitution,
  useGetInstitutions,
} from "@/hooks/superadmin/useInstitutions";
import TableOptions from "@/ui/TableOptions";
import Popover from "@/ui/Popover";
import ActionPopup from "@/ui/ActionPopup";
import ActionLoader from "@/ui/ActionLoader";
import CreateInstitutionAdminForm from "@/components/forms/create-institution-admin";

const FILTER_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A-Z", value: "a-z" },
  { label: "Z-A", value: "z-a" },
];

export default function InstitutionContent() {
  const { institutions, isLoading, total_count, prevPage, nextPage } =
    useGetInstitutions();
  const { deleteInst, isPending } = useDeleteInstitution();
  const [selectedItem, setSelectedItem] = useState<Institution | null>(null);
  const { edit, isPending: isSuspending } = useEditInstitution(
    selectedItem?.status === "Active" ? "suspend" : "activate",
  );

  const {
    filteredData,
    selected,
    handleRowSelect,
    handleSelectAll,
    isAllSelected,
    clearSelected,
  } = useTableSelect<Institution>({
    data: institutions ?? [],
  });

  const handleBulkDelete = () => {
    selected.forEach((id) => deleteInst(id as string));
    clearSelected();
  };

  const handleBulkSuspend = () => {
    selected.forEach((id) => {
      const inst = institutions?.find((item: Institution) => item.id === id);
      if (inst) {
        edit({
          id: inst.id,
          data: {
            status: inst.status === "Active" ? "Inactive" : "Active",
          },
        });
      }
    });
    clearSelected();
  };

  const { canSuspend, isInactive } = useMemo(() => {
    const selectedItems = institutions?.filter((item: Institution) =>
      selected.includes(item.id),
    );
    if (!selectedItems || selectedItems.length === 0)
      return { canSuspend: false, isInactive: false };
    const firstStatus = selectedItems[0].status;
    const isInactive = firstStatus !== "Active";
    return {
      canSuspend: selectedItems.every(
        (item: Institution) => item.status === firstStatus,
      ),
      isInactive,
    };
  }, [selected, institutions]);

  return (
    <Modal>
      <DashTitle title="Institutions">
        <div className="flex-center gap-4">
          {/* <button className="icon-btn">
            <FilmIcon />
          </button> */}
          <Modal.Trigger name="create-institution">
            <Button icon={ICON.PLUS}>Create Institution</Button>
          </Modal.Trigger>
          <Modal.Trigger name="create-institution-admin">
            <Button variants="outlined" icon={ICON.PLUS}>
              Create Institution Admin
            </Button>
          </Modal.Trigger>
        </div>
      </DashTitle>

      <SearchAndFilter
        searchPlaceholder="Search Institutions..."
        hasFilter={true}
        filterOptions={FILTER_OPTIONS}
      />

      {isPending || (isSuspending && <ActionLoader />)}

      <section className="w-full flex gap-3 flex-col px-6">
        {selected.length > 0 && (
          <TableOptions
            ids={selected as string[]}
            onConfirmDelete={handleBulkDelete}
            onConfirmSuspend={handleBulkSuspend}
            hasSuspend={canSuspend}
            suspendLabel={isInactive ? "Activate" : "Suspend"}
            name="institution"
          />
        )}
        <Table columns="40px 1.5fr 1.2fr .7fr .7fr 1.5fr .6fr 0.6fr 20px">
          <Table.Header className="text-center">
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
            <p className="text-left">Institution Name</p>
            <p className="text-left">Description</p>
            <p>Plan Status</p>
            <p>Active Status</p>
            <p>Contact E-mail</p>
            <p className="text-left">Last Billed</p>
            <p className="text-left">Billed Time</p>
            <p></p>
          </Table.Header>

          <Table.Body<Institution>
            isLoading={isLoading}
            data={filteredData}
            render={(item) => (
              <Table.Row
                isHighlighted={selected.includes(item.id)}
                key={item.id}
              >
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
                <Link
                  href={`institutions/${item.id}`}
                  className="font-medium truncate text-primary underline cursor-pointer"
                >
                  {item.name}
                </Link>
                <p className="truncate">{item.description ?? "--"}</p>
                <span
                  className={`${getStatusStyle(item.plan_status as STATUS_TYPE)}
                  flex-center  rounded-full px-2 py-1
                  `}
                >
                  <Icon icon={ICON.DOT} fontSize={20} />
                  {item.plan_status}
                </span>
                <span
                  className={`${getStatusStyle(item.status as STATUS_TYPE)}
                  flex-center  rounded-full px-2 py-1
                  `}
                >
                  <Icon icon={ICON.DOT} fontSize={20} />
                  {item.status}
                </span>
                <p className="truncate">{item.contact_email}</p>
                <p>{formatDate(item.last_billed_date)}</p>
                <p>{formatTime24h(item.last_billed_date)}</p>
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
                      {(closepopover) => {
                        const isActive = item.status === "Active";
                        return (
                          <ul className="flex flex-col gap-2">
                            <Modal.Trigger name="edit-institution">
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
                            <Modal.Trigger
                              disabled={isSuspending}
                              name="suspend-institution"
                            >
                              <button
                                disabled={isSuspending}
                                type="button"
                                className="flex disabled:opacity-50 disabled:cursor-wait cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
                                onClick={() => {
                                  setSelectedItem(item);
                                  closepopover();
                                }}
                              >
                                <Icon icon={ICON.SUSPEND} fontSize={18} />
                                {isActive ? "Suspend" : "Activate"}
                              </button>
                            </Modal.Trigger>
                            <Modal.Trigger name="delete-institution">
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
                        );
                      }}
                    </Popover.Content>
                  </Popover.Menu>
                </Popover>
              </Table.Row>
            )}
          />
          {/* {total_count && total_count > 20 && ( */}
          <Table.Footer>
            <Pagination
              totalCount={total_count}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          </Table.Footer>
        </Table>
      </section>

      <Modal.Window
        hasClose
        className="max-w-2xl w-full!"
        title="Create Institution"
        name="create-institution"
      >
        <CreateInstitutionForm />
      </Modal.Window>

      <Modal.Window
        hasClose
        className="max-w-2xl w-full!"
        title="Edit Institution"
        name="edit-institution"
      >
        <CreateInstitutionForm type="edit" data={selectedItem!} />
      </Modal.Window>

      <Modal.Window className="py-2! gap-0! px-1!" name="suspend-institution">
        <ActionPopup
          onConfirm={() => {
            if (selectedItem) {
              edit({
                id: selectedItem.id,
                data: {
                  name: selectedItem.name,
                  status:
                    selectedItem.status === "Active" ? "Inactive" : "Active",
                },
              });
            }
          }}
          type="suspend"
          title={`${selectedItem?.status === "Active" ? "Suspend" : "Activate"} Institution`}
          name="Institution"
          description={`Are you sure you want to ${selectedItem?.status === "Active" ? "suspend" : "activate"} this institution?`}
        />
      </Modal.Window>

      <Modal.Window className="py-2! gap-0! px-1!" name="delete-institution">
        <ActionPopup
          onConfirm={() => {
            if (selectedItem) {
              deleteInst(selectedItem.id);
            }
          }}
          type="delete"
          name="Institution"
        />
      </Modal.Window>

      <Modal.Window
        hasClose
        className="max-w-2xl w-full!"
        title="Create Institution Admin"
        name="create-institution-admin"
      >
        <CreateInstitutionAdminForm />
      </Modal.Window>
    </Modal>
  );
}
