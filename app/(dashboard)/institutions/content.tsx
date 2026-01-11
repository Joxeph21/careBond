"use client";
import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import FilmIcon from "@/components/icons/FilmIcon";
import { ICON } from "@/utils/icon-exports";
import { Modal } from "@/ui/Modal";
import CreateInstitutionForm from "@/components/forms/CreateInstitutionForm";
import SearchAndFilter from "@/ui/SearchAndFilter";
import Table from "@/ui/Table";
import { institutionData } from "@/utils/dummy";
import {
  formatDate,
  formatTime24h,
  getStatusStyle,
} from "@/utils/helper-functions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useTableSelect from "@/hooks/useTableSelect";
import Pagination from "@/components/common/Pagination";

const FILTER_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A-Z", value: "a-z" },
  { label: "Z-A", value: "z-a" },
];

export default function InstitutionContent() {
  const {
    filteredData,
    selected,
    handleRowSelect,
    handleSelectAll,
    isAllSelected,
  } = useTableSelect({
    data: institutionData,
  });

  return (
    <Modal>
      <DashTitle title="Institutions">
        <div className="flex-center gap-4">
          <button className="icon-btn">
            <FilmIcon />
          </button>
          <Modal.Trigger name="create-institution">
            <Button icon={ICON.PLUS}>Create Institution</Button>
          </Modal.Trigger>
        </div>
      </DashTitle>

      <SearchAndFilter
        searchPlaceholder="Search Institutions..."
        hasFilter={true}
        filterOptions={FILTER_OPTIONS}
      />

      <section className="w-full px-6">
        <Table columns="40px 1.5fr 1.2fr .7fr .7fr 1.5fr .6fr 0.6fr 20px">
          <Table.Header className="text-center">
            <p className="text-left">
              <input
                type="checkbox"
                className="cursor-pointer"
                name="select-all"
                id="select-all"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </p>
            <p>Institution Name</p>
            <p>Description</p>
            <p>Plan Status</p>
            <p>Active Status</p>
            <p>Contact E-mail</p>
            <p className="text-left">Last Billed</p>
            <p className="text-left">Billed Time</p>
            <p></p>
          </Table.Header>

          <Table.Body
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
                  className="font-medium text-primary underline cursor-pointer"
                >
                  {item.name}
                </Link>
                <p>{item.description}</p>
                <span
                  className={`${getStatusStyle(item.planStatus as STATUS_TYPE)}
                  flex-center  rounded-full px-2 py-1
                  `}
                >
                  <Icon icon={ICON.DOT} fontSize={20} />
                  {item.planStatus}
                </span>
                <span
                  className={`${getStatusStyle(
                    item.activeStatus as STATUS_TYPE
                  )}
                  flex-center  rounded-full px-2 py-1
                  `}
                >
                  <Icon icon={ICON.DOT} fontSize={20} />
                  {item.activeStatus}
                </span>
                <p>{item.contactEmail}</p>
                <p>{formatDate(item.lastBilled)}</p>
                <p>{formatTime24h(item.billedTime)}</p>
                <button type="button" className="cursor-pointer flex-center">
                  <Icon icon={ICON.MENU} fontSize={20} />
                </button>
              </Table.Row>
            )}
          />
          <Table.Footer>
            <Pagination />
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
    </Modal>
  );
}
