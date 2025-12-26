import Button from "@/components/common/Button";
import DashTitle from "@/components/common/DashTitle";
import Switch from "@/components/common/Switch";
import UserForm from "@/components/forms/userForm";
import InstitutionPlanBanner from "@/components/institution/InstitutionPlanBanner";
import Family_and_Devices from "@/components/institution/family-devices";
import React from "react";

const settings = [
  {
    title: "Users uploading Profile Picture",
    description: "Allow profile pictures",
  },
  {
    title: "Profile Edit",
    description: "Allow users to edit their profile",
  },
  {
    title: "Notifications",
    description: "Send notifications to users",
  },
  {
    title: "Accept Messages",
    description: "Accept messages from family and patients",
  },
];

export default function Page() {
  return (
    <section className="bg-white gap-3 px-3 pb-4 section-container h-full">
      <DashTitle title="Create New User" />
      <InstitutionPlanBanner />
      <UserForm />
      <Family_and_Devices />

      <section className="w-full mt-2 border-b-2 border-[#0B122824] flex flex-col gap-3">
        <h3 className="text-lg font-bold text-[#454D5A]">
          User&apos;s Settings
        </h3>
        <ul className="w-full grid grid-cols-3 pb-8 gap-8.5">
          {settings.map((el, i) => (
            <li key={i} className="w-full flex flex-col gap-2">
              <h3 className="pb-2 text-[#353B45] border-b border-primary">
                {el.title}
              </h3>
              <div className="w-full flex-between">
                <p className="text-[#667185]">{el.description}</p>
                <Switch />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-full flex flex-col gap-3">
        <h4 className="font-medium text-base">Delete Account</h4>
        <p className="text-[#292A2E]">
          Your account is connected to Atlassian.
        </p>
        <Button variants="danger">Delete Account</Button>
      </section>
    </section>
  );
}
