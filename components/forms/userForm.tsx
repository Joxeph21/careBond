"use client";
import React, { Activity, useState } from "react";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";
import Select from "../common/Select";
import InputText from "../common/InputText";
import InputTextArea from "../common/InputTextArea";
import NextImage from "next/image";

import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
  Resolver,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { USER_SCHEMA, UserFormData } from "@/schema/user-schema";
import toast from "react-hot-toast";

const ROLES: OptionsType<string>[] = [
  { label: "Professional", value: "proffessional" },
  { label: "Patient", value: "patient" },
  { label: "Family", value: "family" },
];

export default function UserForm({ data }: { data?: User }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  console.log(data);

  // Extract first and last name from full_name if available
  const names = data?.full_name?.split(" ") || ["", ""];
  const firstName = names[0];
  const lastName = names.slice(-1).join("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<UserFormData>({
    resolver: yupResolver(USER_SCHEMA) as Resolver<UserFormData>,
    defaultValues: {
      first_name: firstName ?? "",
      last_name: lastName ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      role: data?.role ?? "",
      dob: data?.dob ?? "",
      address: data?.address ?? "",
      gender: data?.gender ?? "",
      description: data?.description ?? "",
    },
  });

  const onSubmit: SubmitHandler<UserFormData> = (formData) => {
    console.log("Form Data:", formData);
  };

  return (
    <FormInput
      config={{
        className: "max-w-full! w-full",
        onSubmit: handleSubmit(
          onSubmit as unknown as SubmitHandler<FieldValues>,
        ),
      }}
    >
      <section className="w-full ring flex flex-col gap-3 ring-grey p-6 rounded-2xl">
        <h4>{data?.full_name || "User name"}</h4>

        <div className="w-full flex-center p-4">
          <figure className="bg-[#000000B0] rounded-full size-30.5 overflow-hidden relative">
            <NextImage
              src={"/user.png"}
              fill
              alt="user avatar"
              className="object-cover"
            />
          </figure>
        </div>

        <Card>
          <Card.Header>
            <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
              <span className="flex-center text-primary size-6.5 rounded-md">
                <Icon icon={ICON.INFO} fontSize={21} />
              </span>{" "}
              Contact Info
            </h3>
            <button
              type="button"
              className={`transition-all cursor-pointer ease-in ${
                isOpen && "rotate-180"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icon icon={ICON.CARET_CIRCLE_UP} fontSize={20} />
            </button>
          </Card.Header>

          <Card.Content>
            <Activity mode={isOpen ? "visible" : "hidden"}>
              <section className="w-full gap-4 grid grid-cols-2">
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      required
                      variant="regular"
                      size="full"
                      label="Choose Role"
                      data={ROLES}
                      onChange={(val) => field.onChange(val)}
                      defaultValue={field.value}
                      placeholder={"Choose Role"}
                      icon={ICON.CARET_DOWN3}
                      error={!!errors.role}
                      errorMessage={errors.role?.message}
                    />
                  )}
                />
                <InputText
                  config={{
                    placeholder: "Enter email address",
                    type: "email",
                    className: "py-2!",
                    ...register("email"),
                  }}
                  label="Email"
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                />
                <InputText
                  config={{
                    placeholder: "Enter first name",
                    type: "text",
                    className: "py-2!",
                    ...register("first_name"),
                  }}
                  label="First Name"
                  error={!!errors.first_name}
                  errorMessage={errors.first_name?.message}
                />
                <InputText
                  config={{
                    placeholder: "Enter last name",
                    type: "text",
                    className: "py-2!",
                    ...register("last_name"),
                  }}
                  label="Last Name"
                  error={!!errors.last_name}
                  errorMessage={errors.last_name?.message}
                />
                <InputText
                  config={{
                    placeholder: "Enter phone",
                    type: "text",
                    className: "py-2!",
                    ...register("phone"),
                  }}
                  label="Phone"
                  error={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
                <InputText
                  config={{
                    placeholder: "Enter Date of Birth",
                    type: "text",
                    className: "py-2!",
                    ...register("dob"),
                  }}
                  label="Date of Birth"
                  error={!!errors.dob}
                  errorMessage={errors.dob?.message}
                />
                <InputText
                  config={{
                    placeholder: "Enter address",
                    type: "text",
                    className: "py-2!",
                    ...register("address"),
                  }}
                  label="Address"
                  error={!!errors.address}
                  errorMessage={errors.address?.message}
                />
                <InputText
                  config={{
                    placeholder: "Enter Gender",
                    type: "text",
                    className: "py-2!",
                    ...register("gender"),
                  }}
                  label="Gender"
                  error={!!errors.gender}
                  errorMessage={errors.gender?.message}
                />
                <InputTextArea
                  className="col-span-2"
                  label="Description"
                  message="Maximum 60 words"
                  config={{
                    ...register("description"),
                  }}
                  error={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              </section>
            </Activity>
          </Card.Content>
        </Card>
      </section>

      <div className="flex-center gap-3 self-end">
        <Button
          config={{
            className: "text-primary",
            type: "button",
          }}
          variants="outlined"
        >
          Reset
        </Button>
        <Button
          config={{
            type: "submit",
            disabled: !isValid || !isDirty,
            onClick: () => {
              toast.success("User profile edited successfully");
            },
          }}
        >
          Submit
        </Button>
      </div>
    </FormInput>
  );
}
