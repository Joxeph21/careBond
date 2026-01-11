import DashTitle from "@/components/common/DashTitle";
import EditUserForm from "@/components/forms/EditUserForm";
import React from "react";

function Page() {
  return (
    <section className="section-container gap-3 px-3 pb-4 flex flex-col bg-white">
      <DashTitle title="User Details" />
      <section className="w-full ring flex flex-col gap-3 ring-grey p-6 pb-3 rounded-2xl">
        <p>Name and Photo</p>
        <p>Change your name and photo on Atlassian</p>

        <div className="flex mt-5 mb-10 gap-4 items-center">
          <figure className="rounded-full bg-primary/30 size-32"></figure>
          <div className="space-y-3">
            <p className="font-medium text-[#292A2E]">Full name</p>
            <h4 className="text-lg font-semibold text-[#292A2E]">User Name</h4>
            <p className="text-[#292A2E] font-light capitalize">professional</p>
          </div>
        </div>

      </section>
        <EditUserForm />
    </section>
  );
}

export default Page;
