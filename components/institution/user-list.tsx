import Table from "@/ui/Table";
import { formatDate, getRandomHexColor } from "@/utils/helper-functions";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function UserList({
  isSelected,
  all_devices,
  associated_user,
  avatar,
  createdAt,
  email,
  id,
  name,
  role,
  handleRowSelect,
}: { handleRowSelect: (id: string) => void; isSelected: boolean } & User) {


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
      <div className="flex items-center w-full gap-1">
        <figure
          className={`rounded-full size-10 bg-[${getRandomHexColor()}] relative overflow-hidden`}
        >
          <Image
            fill
            src={avatar}
            alt={`${name}_avatar`}
            className="object-cover object-center w-full h-full"
          />
        </figure>
        <div>
          <h4 className="font-medium text-[#101828] capitalize">{name}</h4>
          <p className="text-[#6B788E]">@{email}</p>
        </div>
      </div>
      <p className="p-1.5 rounded-full font-medium text-xs bg-[#F5F6F7] text-[#091E42]">
        {id}
      </p>
      <p className="text-[#42526D] capitalize">{role}</p>
      <p className="rounded-lg w-fit bg-[#ECFDF3] px-1.5 text-[#027A48]">
        {associated_user}
      </p>
      <p className="rounded-lg px-2 w-fit bg-[#ECFDF3]  text-[#027A48]">
        {all_devices}
      </p>
      <p>{formatDate(createdAt)}</p>
      <button className="cursor-pointer">
        <Icon icon={ICON.MENU} fontSize={21} />
      </button>
    </Table.Row>
  );
}
