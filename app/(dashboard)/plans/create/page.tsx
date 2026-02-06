import DashTitle from "@/components/common/DashTitle";
import CreatePlanForm from "@/components/forms/CreatePlanForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Plan | CareBond",
  description: "Create new subscription plans for institutions on CareBond.",
};

export default function Page() {
  return (
    <section className="section-container bg-white ">
      <DashTitle title="Create Plan" />

      <CreatePlanForm />
    </section>
  );
}
