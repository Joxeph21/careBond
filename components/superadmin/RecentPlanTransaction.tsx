import Table from "@/ui/Table";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import {
  useDeleteInstitution,
  useGetInstitutions,
} from "@/hooks/superadmin/useInstitutions";
import { formatDate } from "@/utils/helper-functions";
import { useState } from "react";
import { Modal } from "@/ui/Modal";
import ActionPopup from "@/ui/ActionPopup";
import Link from "next/link";
import CreateInstitutionForm from "../forms/CreateInstitutionForm";
import ActionLoader from "@/ui/ActionLoader";

export default function RecentPlanTransaction() {
  const { deleteInst, isPending } = useDeleteInstitution();
  const { institutions, isLoading } = useGetInstitutions();
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  const getPlanStatusStyle = (str: Institution["plan_status"]) => {
    switch (str?.toLowerCase()) {
      case "active":
        return "text-green-500";
      case "suspended":
        return "text-accent";

      default:
        return "text-blue-500";
    }
  };

  return (
    <Modal>
      <section className="w-full bg-white py-5.5 flex flex-col gap-10 px-5 rounded-lg min-h-96 ring ring-grey">
        <div className="flex-between w-full text-[#4A4A4A]">
          <h3 className="font-medium text-lg">Institution Subscription</h3>

          {/* <button className="cursor-pointer">
            <Icon icon={ICON.ELIPSIS} fontSize={30} />
          </button> */}
        </div>

        {isPending && <ActionLoader />}

        <Table border={false} columns="1fr .5fr .5fr .5fr .4fr">
          <Table.Header className="border-b border-grey">
            <p>Institution Name</p>
            <p>Date last due</p>
            <p>Plan</p>
            <p>Status</p>
            <p></p>
          </Table.Header>

          <Table.Body<Institution>
            isLoading={isLoading}
            data={institutions?.slice(0, 10) ?? []}
            render={(item) => (
              <Table.Row key={item.id}>
                <Link
                  href={`/institutions/${item.id}`}
                  className="flex hover:underline hover:text-primary text-[#1C1C1C] items-center gap-2"
                >
                  <figure className="size-8 flex-center rounded-md bg-[#EEF3FF] shrink-0">
                    <Icon
                      icon={"solar:hospital-line-duotone"}
                      className="text-primary"
                      fontSize={18}
                    />
                  </figure>
                  <h4 className="truncate  text-xs font-semibold capitalize">
                    {item.name}
                  </h4>
                </Link>
                <p className="text-[#A9A9A9]">
                  {formatDate(item.last_billed_date, "MMM d, yyyy")}
                </p>
                <p className="text-[#A9A9A9] truncate">
                  {item?.plan_details?.name ?? "N/A"}
                </p>
                <p className={`${getPlanStatusStyle(item.plan_status)}`}>
                  {item.plan_status}
                </p>
                <div className="flex-center gap-3">
                  <Modal.Trigger
                    name="edit-institution"
                    onClick={() => setSelectedInstitution(item)}
                  >
                    <button className="cursor-pointer hover:shadow-card-shadow ease-in transition-all duration-200">
                      <Icon icon={ICON.EDIT} fontSize={20} />
                    </button>
                  </Modal.Trigger>
                  <Modal.Trigger
                    name="confirm-delete-institution"
                    onClick={() => setSelectedInstitution(item)}
                  >
                    <button className="cursor-pointer text-accent hover:shadow-card-shadow ease-in transition-all duration-200">
                      <Icon icon={ICON.TRASH} fontSize={20} />
                    </button>
                  </Modal.Trigger>
                </div>
              </Table.Row>
            )}
          />
        </Table>

      <Modal.Window className="py-2! gap-0! px-1!" name="delete-institution">
        <ActionPopup
          onConfirm={() => {
            if (selectedInstitution) {
              deleteInst(selectedInstitution.id);
            }
          }}
          type="delete"
          name="Institution"
        />
      </Modal.Window>

        <Modal.Window
          hasClose
          className="max-w-2xl w-full!"
          title="Edit Institution"
          name="edit-institution"
        >
          <CreateInstitutionForm type="edit" data={selectedInstitution!} />
        </Modal.Window>
      </section>
    </Modal>
  );
}
