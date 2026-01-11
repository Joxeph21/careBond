"use client";
import DashTitle from "@/components/common/DashTitle";
import EditUserForm from "@/components/forms/EditUserForm";
import InstitutionPlanBanner from "@/components/institution/InstitutionPlanBanner";



export default function Page() {
  return (
    <section className="bg-white gap-3 px-3 pb-4 section-container">
      <DashTitle title="Create New User" />
      <InstitutionPlanBanner />
      <EditUserForm />
    </section>
  );
}
