"use client";
import Button from "../common/Button";
import { Modal } from "@/ui/Modal";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import SearchBox from "../common/SearchBox";
import Image from "next/image";
import { useState, useMemo } from "react";
import usePaginatorParams from "@/hooks/usePaginatorParams";
import useIUsers from "@/hooks/superadmin/useIUsers";
import useAdmin from "@/hooks/auth/useAdmin";
import Skeleton from "../common/Skeleton";
import { useAssignMember } from "@/hooks/institution/usePatients";
import useQueueMutation from "@/hooks/useQueueMutation";
import { useRouter } from "next/navigation";
import { useGetIUsers } from "@/hooks/institution/useInstitutionsUsers";

function useAUsers({
  isSuperAdmin,
  query,
  isFetched,
  institutionId,
}: {
  isSuperAdmin: boolean;
  query: string;
  isFetched: boolean;
  institutionId?: string | null;
}) {
  const superAdminHook = useIUsers(isSuperAdmin && isFetched, { query });
  const instAdminHook = useGetIUsers(institutionId, { query });

  return {
    data: isSuperAdmin ? superAdminHook.users : instAdminHook.users,
    isLoading: isSuperAdmin
      ? superAdminHook.isLoading
      : instAdminHook.isLoading,
  };
}

export default function AssignUserForm({
  onCloseModal,
  patient_id,
  type = "family",
}: onCloseModal & { patient_id: string; type?: IUser["role"] }) {
  const router = useRouter();
  const {
    isSuperAdmin,
    isFetched,
    data: adminData,
  } = useAdmin();
  const { assign_member_async, isPending: isAssigning } = useAssignMember(
    patient_id,
    type,
  );

  const { query } = usePaginatorParams({ searchKey: "f" });
  const { data, isLoading } = useAUsers({
    isSuperAdmin,
    query,
    isFetched,
    institutionId: adminData?.institution_id,
  });
  const [selected, setSelected] = useState<string[]>([]);

  const typeLabel = useMemo(() => {
    switch (type) {
      case "family":
        return "Family Member";
      case "patient":
        return "Patient";
      case "professional":
        return "Professional";
      default:
        return "User";
    }
  }, [type]);

  const { startQueue, isProcessing } = useQueueMutation(
    selected,
    (id) => assign_member_async({ member_id: id }),
    {
      loadingMessage: `Assigning ${typeLabel}s...`,
      successMessage: `All ${typeLabel}s assigned successfully`,
      onSuccess: () => {
        onCloseModal?.();
        router.refresh();
      },
    },
  );

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };


  const users = useMemo(() => {
    return data.filter((el) => el.role === type);
  }, [data, type]);

  return (
    <section className="flex w-full px-5 pb-6 justify-between flex-col min-h-96 h-full">
      <div>
        <span className="size-12 border flex-center text-primary rounded-full bg-[#E6F3FF] border-grey">
          <Icon icon={ICON.ASSIGN_CARD} fontSize={30} />
        </span>

        <div className="space-y-1 my-6">
          <h4 className="text-[#15294B] font-semibold text-lg">
            Assign {typeLabel}
          </h4>
          <p className="text-[#667085]">
            Select one or multiple {typeLabel}s to assign to this role
          </p>
        </div>

        <Modal.Trigger name={`add-${type}`}>
          <Button
            config={{
              className: "py-2!",
            }}
            variants="primary"
            size="full"
          >
            Create {typeLabel}
          </Button>
        </Modal.Trigger>
      </div>

      <section className="flex flex-col mt-5 gap-3 w-full">
        <SearchBox
          searchKey="f"
          placeholder="Search for an individual"
          className="max-w-full! p-2.5!"
        />
        <ul className="p-2 rounded-xl ring ring-grey w-full flex flex-col gap-3 min-h-20 justify-center">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <li
                key={i}
                className="w-full ring ring-grey p-4 rounded-lg flex gap-3"
              >
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </li>
            ))
          ) : users && users.length > 0 ? (
            users.map((el) => {
              const isActive = selected.includes(el.id!);

              return (
                <li
                  role="radio"
                  onClick={() => handleSelect(el.id!)}
                  aria-checked={isActive}
                  key={el.id}
                  className={`w-full cursor-pointer ring ring-grey p-4  rounded-lg flex-between items-start! ${
                    isActive ? "bg-[#EAF5FF]" : "hover:bg-[#EAF5FF]/80"
                  }`}
                >
                  <div className="flex-center gap-3">
                    <figure className="rounded-full size-8 relative overflow-hidden">
                      <Image
                        src={el.profile_image_url || "/profile.png"}
                        alt={`${el.full_name}_profile_picture`}
                        fill
                        className="object-center object-cover"
                      />
                    </figure>
                    <div>
                      <h4 className="font-medium text-[#091E42]">
                        {el.full_name}
                      </h4>
                      <div className="flex items-center text-xs font-light gap-2">
                        <p className="text-[#5E5E5E]">{el.email}</p>
                        <span className="text-primary capitalize">
                          {el.role_display}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isActive}
                    onClick={() => handleSelect(el.id!)}
                  >
                    <Icon
                      className={`${
                        isActive ? "text-primary" : "text-[#D0D5DD]"
                      }`}
                      icon={isActive ? ICON.CHECKED : ICON.UNCHECKED}
                      fontSize={21}
                    />
                  </button>
                  <label htmlFor={el.id!} className="sr-only">
                    select {el.full_name}
                  </label>
                  <input
                    className="sr-only"
                    aria-checked={isActive}
                    checked={isActive}
                    type="checkbox"
                    id={el.id!}
                    onChange={() => handleSelect(el.id!)}
                  />
                </li>
              );
            })
          ) : (
            <div className="py-4 flex flex-col items-center justify-center text-center">
              <Icon
                icon={ICON.SEARCH}
                fontSize={40}
                className="text-grey mb-3"
              />
              <p className="text-[#667085] font-medium">No {typeLabel}s found</p>
              <p className="text-[#959595] text-sm px-4">
                Try adjusting your search to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </ul>
      </section>

      <div className="w-full mt-5 gap-4 flex-between">
        <Button
          config={{
            onClick: () => onCloseModal?.(),
          }}
          variants="outlined"
          size="full"
        >
          Cancel
        </Button>
        <Button
          config={{
            disabled: selected.length === 0,
            onClick: startQueue,
          }}
          variants="primary"
          size="full"
          isLoading={isProcessing || isAssigning}
        >
          Assign
        </Button>
      </div>
    </section>
  );
}
