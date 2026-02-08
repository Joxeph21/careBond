"use client";
import SearchAndFilter from "@/ui/SearchAndFilter";
import { ICON } from "@/utils/icon-exports";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Button from "../common/Button";
import Table from "@/ui/Table";
import useTableSelect from "@/hooks/useTableSelect";
import UserList from "./user-list";
import TableOptions from "@/ui/TableOptions";
import Pagination from "../common/Pagination";
import { Modal } from "@/ui/Modal";
import ActionPopup from "@/ui/ActionPopup";

const tabs = ["all-users", "proffesionals", "patients", "families"];

export default function UsersTable({
  users,
  isLoading,
  total_count,
  prevPage,
  nextPage,
}: {
  isLoading: boolean;
  total_count: number;
  users: IUser[];
  prevPage?: number | null;
  nextPage?: number | null;
}) {
  const [tab, setTab] = useState(tabs[0]);
  const containerRef = useRef(null);
  const tabRef = useRef(null);
  const [tabWidth, setTabWidth] = useState({
    width: 0,
    left: 0,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const data = useMemo(() => {
    if (tab === "all-users") return users;

    if (tab === "proffesionals")
      return users.filter((el) => el.role === "professional");

    if (tab === "patients") return users.filter((el) => el.role === "patient");

    if (tab === "families") return users.filter((el) => el.role === "family");

    return [];
  }, [tab, users]);

  const {
    isAllSelected,
    selected,
    handleRowSelect,
    handleSelectAll,
    filteredData,
  } = useTableSelect({
    data,
  });

  useEffect(() => {
    if (tabRef.current && containerRef.current) {
      const tabRect = (
        tabRef.current as HTMLButtonElement
      ).getBoundingClientRect();
      const containerRect = (
        containerRef.current as HTMLDivElement
      ).getBoundingClientRect();

      setTabWidth({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  }, [tab]);

  return (
    <Modal>
      <section className="w-full flex flex-col gap-5">
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
                {el.split("-").join(" ")}
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

        <SearchAndFilter
          searchPlaceholder="Search User by name, role, ID or any related keywords"
          hasFilter
          iconPlacement="left"
          icon={ICON.FILTER2}
          filterOptions={[
            { label: "Plan (Active)", value: "p-active" },
            { label: "Plan (Inactive)", value: "p-inactive" },
          ]}
        >
          <Button
            config={{
              className: "pr-4!",
            }}
            size="medium"
            icon={ICON.DOWNLOAD}
            iconPlacement="left"
            variants="outlined"
          >
            Export
          </Button>
        </SearchAndFilter>
        <section className="w-full col-start gap-3 items-start!">
          {selected.length > 1 && <TableOptions ids={selected} />}
          <Table border columns="40px 1.5fr .5fr .5fr .5fr .5fr .5fr 40px">
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
              <p>Role</p>
              <p>Associated User</p>
              <p>All Devices</p>
              <p>Date</p>
              <div></div>
            </Table.Header>

            <Table.Body
              isLoading={isLoading}
              data={filteredData}
              render={(item) => (
                <UserList
                  key={item.id}
                  isSelected={selected.includes(item.id)}
                  handleRowSelect={handleRowSelect}
                  setSelectedItem={setSelectedUser}
                  {...item}
                />
              )}
            />
            {/* {Boolean(total_count && total_count > 20) && ( */}
            <Table.Footer>
              <Pagination
                totalCount={total_count}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            </Table.Footer>
            {/* )} */}
          </Table>
        </section>

        <Modal.Window className="py-2! gap-0! px-1!" name="confirm-suspend-user">
          <ActionPopup
            onConfirm={() => {
              // Confirm logic for suspend/activate
            }}
            type="suspend"
            title={`${selectedUser?.is_active ? "Suspend" : "Activate"} User`}
            name="User"
            description={`Are you sure you want to ${selectedUser?.is_active ? "suspend" : "activate"} this user?`}
          />
        </Modal.Window>

        <Modal.Window className="py-2! gap-0! px-1!" name="confirm-delete-user">
          <ActionPopup
            onConfirm={() => {
              // Confirm logic for delete
            }}
            type="delete"
            name="User"
            description={`Are you sure you want to delete this user?`}
          />
        </Modal.Window>
      </section>
    </Modal>
  );
}
