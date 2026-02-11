"use client";
import UserForm from "@/components/forms/userForm";
import Button from "@/components/common/Button";
import Family_and_Devices from "@/components/institution/family-devices";
import ActionPopup from "@/ui/ActionPopup";
import VitalsOverview from "../institution/vitals-overview";
import { Modal } from "@/ui/Modal";


import { useGetIUserById } from "@/hooks/institution/useInstitutionsUsers";

function EditUserForm({ user: initialUser, isEdit }:  { user: User, isEdit?: boolean}) {
  const { user: updatedUser } = useGetIUserById(initialUser.id!);
  const user = updatedUser || initialUser;

  return (
    <Modal>
      {user.role === "patient" && <VitalsOverview id={user.id!} />}
      <UserForm data={user} isEdit={isEdit} />
      <Family_and_Devices data={user} />

     
      <section className="w-full flex flex-col gap-3">
        <h4 className="font-medium text-base">Delete Account</h4>
        <p className="text-[#292A2E]">
          Your account is connected to Atlassian.
        </p>
        <Modal.Trigger name="delete-account">
          <Button config={{}} variants="danger">
            Delete Account
          </Button>
        </Modal.Trigger>
      </section>
      <Modal.Window className="py-2! gap-0! px-1!" name="delete-account">
        <ActionPopup type="delete" name="user account" />
      </Modal.Window>
    </Modal>
  );
}

export default EditUserForm;
