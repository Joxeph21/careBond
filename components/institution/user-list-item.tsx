import { useToggleCameraAccess } from "@/hooks/institution/usePatients";
import Table from "@/ui/Table";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import React from "react";
import Switch from "../common/Switch";

export default function UserListItem({
  handleRowSelect,
  isSelected,
  full_name: name,
  id,
  email,
  role_display: role,
  patients_id,
  can_view_stream,
  user_role,
  ...rest
}: {
  can_view_stream?: boolean;
  user_role?: IUser["role"];
  role?: IUser["role"];
} & {
  handleRowSelect: (id: string) => void;
  isSelected: boolean;
  full_name: string;
  id: string;
  email: string;
  role_display: string;
  patients_id?: string;
}) {
  const { toggle_camera_access, isPending } = useToggleCameraAccess(
    patients_id!,
    can_view_stream!,
  );

  console.log(can_view_stream);

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
        <div
          className={`rounded-full flex-center size-10 bg-[#EAF1FF] text-[#0051C3] relative overflow-hidden`}
        >
          {name
            .split(" ")
            .map((el: string) => el[0])
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <h4 className="font-medium text-[#101828] capitalize">{name}</h4>
          <p className="text-[#6B788E]">@{email}</p>
        </div>
      </div>
      <p className="p-1.5 rounded-full truncate max-w-[50%] w-fit font-medium text-xs bg-[#F5F6F7] text-[#091E42]">
        {id}
      </p>
      <p className="text-[#42526D] capitalize">{role}</p>
      <div>
        {user_role === "patient" && (
          <Switch
            type="optimistic"
            disabled={isPending}
            checked={can_view_stream}
            onChange={() =>
              toggle_camera_access({
                can_view_stream: !can_view_stream,
                user_id: id,
                role: rest.role! as "family" | "professional",
              })
            }
          />
        )}
      </div>
      <button className="cursor-pointer">
        <Icon icon={ICON.MENU} fontSize={21} />
      </button>
    </Table.Row>
  );
}
