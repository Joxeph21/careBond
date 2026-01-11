"use client"
import UserForm from "@/components/forms/userForm";
import Button from "@/components/common/Button";
import Switch from "@/components/common/Switch";
import Family_and_Devices from "@/components/institution/family-devices";
import ActionPopup from "@/ui/ActionPopup";
import React, { useState } from "react";

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


function EditUserForm() {
  const [deletePopup, setDeletePopup] = useState(false);

  return (
   <>
      <UserForm />
      <Family_and_Devices />

      <section className="w-full mt-2 border-b-2 h-full border-[#0B122824] flex flex-col gap-3">
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
        <Button
          config={{
            onClick: () => setDeletePopup(true),
          }}
          variants="danger"
        >
          Delete Account
        </Button>
      </section>

      <ActionPopup
        mode={deletePopup}
        onCancel={() => setDeletePopup(false)}
        type="delete"
        name="account"
      />
   </>
  )
}

export default EditUserForm
