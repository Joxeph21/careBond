"use client";
import Table from "@/ui/Table";
import { formatDate, getRandomHexColor } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import Popover from "@/ui/Popover";
import { Modal } from "@/ui/Modal";

export default function UserList({
  isSelected,
  full_name,
  email,
  display_id,
  role_display: role,
  associated_users_count,
  connected_devices_count,
  created_at,
  id,
  handleRowSelect,
  setSelectedItem,
  is_active,
  ...rest
}: {
  handleRowSelect: (id: string) => void;
  isSelected: boolean;
  setSelectedItem: (item: User) => void;
} & IUser) {
  const userObj = {
    id,
    full_name,
    email,
    display_id,
    role_display: role,
    associated_users_count,
    connected_devices_count,
    created_at,
    is_active,
    ...rest,
  } as User;

  return (
    <Table.Row isHighlighted={isSelected}>
      <div>
        <input
          type="checkbox"
          className="cursor-pointer"
          name="select-row"
          id="select-row"
          checked={isSelected}
          onChange={() => handleRowSelect(id)}
        />
      </div>
      <Link
        href={`/users/${encodeURIComponent(id)}`}
        className="flex group cursor-pointer items-center w-full gap-2"
      >
        <figure
          className={`rounded-full size-10 bg-[${getRandomHexColor()}] relative overflow-hidden`}
        >
          <Image
            fill
            src={rest?.profile_image_url || "/profile.png"}
            alt={`${full_name}_avatar`}
            className="object-cover object-center w-full h-full"
          />
        </figure>
        <div>
          <h4 className="font-medium group-hover:underline text-[#101828] capitalize">
            {full_name}
          </h4>
          <p className="text-[#6B788E]">{email}</p>
        </div>
      </Link>
      <p className="p-1.5 rounded-full font-medium text-xs bg-[#F5F6F7] text-[#091E42]">
        {display_id}
      </p>
      <p className="text-[#42526D] capitalize">{role}</p>
      <p className="rounded-lg w-fit bg-[#ECFDF3] px-1.5 text-[#027A48]">
        {associated_users_count}
      </p>
      <p className="rounded-lg px-2 w-fit bg-[#ECFDF3]  text-[#027A48]">
        {connected_devices_count}
      </p>
      <p>{formatDate(created_at ?? "")}</p>
      <Popover>
        <Popover.Menu>
          <Popover.Trigger>
            <button className="cursor-pointer">
              <Icon icon={ICON.MENU} fontSize={21} />
            </button>
          </Popover.Trigger>
          <Popover.Content className="left-auto! shadow-card-shadow right-0! min-w-20!">
            {(closepopover) => (
              <ul className="flex flex-col gap-2">
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
                  onClick={() => {
                    closepopover();
                  }}
                >
                  <Icon icon={ICON.EDIT} fontSize={18} />
                  Edit
                </button>
                <Modal.Trigger name="confirm-suspend-user">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
                    onClick={() => {
                      setSelectedItem(userObj);
                      closepopover();
                    }}
                  >
                    <Icon icon={ICON.SUSPEND} fontSize={18} />
                    {is_active ? "Suspend" : "Activate"}
                  </button>
                </Modal.Trigger>
                <Modal.Trigger name="confirm-delete-user">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors w-full text-left text-danger"
                    onClick={() => {
                      setSelectedItem(userObj);
                      closepopover();
                    }}
                  >
                    <Icon icon={ICON.TRASH} fontSize={18} />
                    Delete
                  </button>
                </Modal.Trigger>
              </ul>
            )}
          </Popover.Content>
        </Popover.Menu>
      </Popover>
    </Table.Row>
  );
}
