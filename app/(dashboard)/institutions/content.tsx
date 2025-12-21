"use client";
import React, { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import FilmIcon from "@/components/icons/FilmIcon";
import { ICON } from "@/utils/icon-exports";
import { Modal } from "@/ui/Modal";
import CreateInstitutionForm from "@/components/forms/CreateInstitutionForm";
import SearchAndFilter from "@/ui/SearchAndFilter";
import Table from "@/ui/Table";
import { useSearchParams } from "next/navigation";
import { institutionData } from "@/utils/dummy";
import { formatDate, formatTime24h, getStatusStyle } from "@/utils/helper-functions";
import { Icon } from "@iconify/react";



export default function InstitutionContent() {
  const searchParams = useSearchParams();
  const [selectedInstitutions, setSelectedInstitutions] = useState<number[]>(
    []
  );

 

  const handleSelectRow = (id: number) => {
    setSelectedInstitutions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const institutions = useMemo(() => {
    const query = searchParams.get("table-q");

    if (!query) return institutionData;

    return institutionData.filter((institution) => {
      return institution.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [searchParams]);

 const isAllSelected =
    institutions.length > 0 && selectedInstitutions.length === institutions.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedInstitutions([]);
    } else {
      setSelectedInstitutions(institutions.map((row) => row.id));
    }
  };


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
        filterOptions={[
          { label: "Newest", value: "newest" },
          { label: "Oldest", value: "oldest" },
          { label: "A-Z", value: "a-z" },
          { label: "Z-A", value: "z-a" },
        ]}
      />

      <section className="w-full px-6">
        <Table columns="40px 1.5fr 1.2fr .7fr .7fr 1.5fr .6fr 0.6fr 20px">
          <Table.Header className="text-center" >
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
            data={institutions}
            render={(item) => (
              <Table.Row
                isHighlighted={selectedInstitutions.includes(item.id)}
                key={item.id}
              >
                <p>
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    name="select-row"
                    id="select-row"
                    checked={selectedInstitutions.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                  />
                </p>
                <p>{item.name}</p>
                <p>{item.description}</p>
                <span className={`${getStatusStyle(item.planStatus as STATUS_TYPE)}
                  flex-center  rounded-full px-2 py-1
                  `}>
                    <Icon icon={ICON.DOT} fontSize={20} />
                    {item.planStatus}</span>
                <span className={`${getStatusStyle(item.activeStatus as STATUS_TYPE)}
                  flex-center  rounded-full px-2 py-1
                  `}>
                    <Icon icon={ICON.DOT} fontSize={20} />
                    {item.activeStatus}</span>
                <p>{item.contactEmail}</p>
                <p>{formatDate(item.lastBilled)}</p>
                <p>{formatTime24h(item.billedTime)}</p>
                <button type="button" className="cursor-pointer flex-center">
                  <Icon icon={ICON.MENU} fontSize={20} />
                </button>
              </Table.Row>
            )}
          />
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
