"use client";
import DashTitle from "@/components/common/DashTitle";
import UserForm from "@/components/forms/userForm";
import InstitutionPlanBanner from "@/components/institution/InstitutionPlanBanner";



export default function Page() {
  return (
    <section className="bg-white gap-3 px-3 pb-4 section-container">
      <DashTitle title="Create New User" />
      <InstitutionPlanBanner />
      <UserForm />
    </section>
  );
}

