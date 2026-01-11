"use client";
import React from "react";
import Button from "../common/Button";
import { Modal } from "@/ui/Modal";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import SearchBox from "../common/SearchBox";
import Image from "next/image";
import { useState, useMemo } from "react";
import { dummy_users } from "@/utils/dummy";
import { useSearchParams } from "next/navigation";

export default function AssignFamilyForm({ onCloseModal }: onCloseModal) {
  const [selected, setSelected] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("f") ?? "";

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const users = useMemo(() => {
    if (!query) return dummy_users;
    const lowerQuery = query.toLowerCase();
    return dummy_users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.role.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <section className="flex w-full px-5 pb-6 justify-between flex-col min-h-96 h-full">
      <div>
        <span className="size-12 border flex-center text-primary rounded-full bg-[#E6F3FF] border-grey">
          <Icon icon={ICON.ASSIGN_CARD} fontSize={30} />
        </span>

        <div className="space-y-1 my-6">
          <h4 className="text-[#15294B] font-semibold text-lg">
            Assign Family
          </h4>
          <p className="text-[#667085]">
            Select one or multiple Users to assign to this role
          </p>
        </div>

        <Modal.Trigger name="add-family">
          <Button
            config={{
              className: "py-2!",
            }}
            variants="primary"
            size="full"
          >
            Create Family Member
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
          {users && users.length > 0 ? (
            users.map((el) => {
              const isActive = selected.includes(el.id);

              return (
                <li
                  role="radio"
                  onClick={() => handleSelect(el.id)}
                  aria-checked={isActive}
                  key={el.id}
                  className={`w-full cursor-pointer ring ring-grey p-4  rounded-lg flex-between items-start! ${
                    isActive ? "bg-[#EAF5FF]" : "hover:bg-[#EAF5FF]/80"
                  }`}
                >
                  <div className="flex-center gap-3">
                    <figure className="rounded-full size-8 relative overflow-hidden">
                      <Image
                        src={el.avatar}
                        alt={`${el.name}_profile_picture`}
                        fill
                        className="object-center object-cover"
                      />
                    </figure>
                    <div>
                      <h4 className="font-medium text-[#091E42]">{el.name}</h4>
                      <div className="flex items-center text-xs font-light gap-2">
                        <p className="text-[#5E5E5E]">{el.email}</p>
                        <span className="text-primary capitalize">
                          {el.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isActive}
                    onClick={() => handleSelect(el.id)}
                  >
                    <Icon
                      className={`${
                        isActive ? "text-primary" : "text-[#D0D5DD]"
                      }`}
                      icon={isActive ? ICON.CHECKED : ICON.UNCHECKED}
                      fontSize={21}
                    />
                  </button>
                  <label htmlFor={el.id} className="sr-only">
                    select {el.name}
                  </label>
                  <input
                    className="sr-only"
                    aria-checked={isActive}
                    checked={isActive}
                    type="checkbox"
                    id={el.id}
                    onChange={() => handleSelect(el.id)}
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
              <p className="text-[#667085] font-medium">No members found</p>
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
        <Button variants="primary" size="full">
          Assign
        </Button>
      </div>
    </section>
  );
}
