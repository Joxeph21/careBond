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

export default function UserForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <FormInput
      config={{
        className: "max-w-full! w-full",
      }}
    >
      <section className="w-full ring flex flex-col gap-3 ring-grey p-6 rounded-2xl">
        <h4>User name</h4>

        <div className="w-full flex-center p-4">
          <figure className="bg-[#000000B0] rounded-full size-30.5"></figure>
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
                <Select
                  required
                  variant="regular"
                  size="full"
                  label="Choose Role"
                  data={[]}
                  icon={ICON.CARET_DOWN3}
                />
                <InputText
                  config={{
                    placeholder: "Enter email address",
                    type: "email",
                    className: "py-2!",
                    required: true,
                  }}
                  label="Email"
                />
                <InputText
                  config={{
                    placeholder: "Enter first name",
                    type: "text",
                    className: "py-2!",
                    required: true,
                  }}
                  label="First Name"
                />
                <InputText
                  config={{
                    placeholder: "Enter last name",
                    type: "text",
                    className: "py-2!",
                    required: true,
                  }}
                  label="Last Name"
                />
                <InputText
                  config={{
                    placeholder: "Enter phone",
                    type: "text",
                    className: "py-2!",
                    required: true,
                  }}
                  label="Phone"
                />
                <InputText
                  config={{
                    placeholder: "Enter Date of Birth",
                    type: "text",
                    className: "py-2!",
                    required: true,
                  }}
                  label="Date of Birth"
                />
                <InputText
                  config={{
                    placeholder: "Enter address",
                    type: "text",
                    className: "py-2!",
                    required: true,
                  }}
                  label="Address"
                />
                <InputText
                  config={{
                    placeholder: "Enter Gender",
                    type: "text",
                    className: "py-2!",
                    required: true,
                  }}
                  label="Gender"
                />
                <InputTextArea
               
                  className="col-span-2"
                  label="Description"
                  message="Maximum 60 words"
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
          }}
          variants="outlined"
        >
          Reset
        </Button>
        <Button>Submit</Button>
      </div>
    </FormInput>
  );
}
