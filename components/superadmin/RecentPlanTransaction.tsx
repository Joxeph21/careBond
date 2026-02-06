import Table from "@/ui/Table";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import { useGetInstitutions } from "@/hooks/superadmin/useInstitutions";
import { formatDate } from "@/utils/helper-functions";

export default function RecentPlanTransaction() {
  const { institutions, isLoading } = useGetInstitutions();

  const getPlanStatusStyle = (str: Institution["plan_status"]) => {
    switch (str.toLowerCase()) {
      case "active":
        return "text-green-500";
      case "suspended":
        return "text-accent";

      default:
        return "text-blue-500";
    }
  };

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

        <Table.Body<Institution>
          isLoading={isLoading}
          data={institutions?.slice(0, 10) ?? []}
          render={(item) => (
            <Table.Row key={item.id}>
              <div className="flex items-center gap-2">
                <figure className="size-8 rounded-md bg-[#EEF3FF] shrink-0"></figure>
                <h4 className="truncate text-[#1C1C1C] text-xs font-semibold capitalize">
                  {item.name}
                </h4>
              </div>
              <p className="text-[#A9A9A9]">
                {formatDate(item.last_billed_date, "MMM d, yyyy")}
              </p>
              <p className="text-[#A9A9A9] truncate">{item?.plan_details?.name ?? "N/A"}</p>
              <p className={`${getPlanStatusStyle(item.plan_status)}`}>{item.plan_status}</p>
              <div className="flex-center gap-3">
                <button className="cursor-pointer hover:shadow-card-shadow ease-in transition-all duration-200">
                  <Icon icon={ICON.EDIT} fontSize={20} />
                </button>
                <button className="cursor-pointer text-accent hover:shadow-card-shadow ease-in transition-all duration-200">
                  <Icon icon={ICON.TRASH} fontSize={20} />
                </button>
              </div>
            </Table.Row>
          )}
        />
      </Table>
    </section>
  );
}
