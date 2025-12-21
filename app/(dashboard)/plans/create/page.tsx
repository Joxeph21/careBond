import DashTitle from "@/components/common/DashTitle";
import CreatePlanForm from "@/components/forms/CreatePlanForm";
import React from "react";

export default function Page() {
  return (
    <section className="section-container bg-white ">
      <DashTitle title="Create Plan" />

      <CreatePlanForm />
    </section>
  );
}
