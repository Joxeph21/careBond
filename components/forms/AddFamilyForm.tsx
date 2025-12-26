import React from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";

export default function AddFamilyForm() {
  return (
    <FormInput
      config={{
        className: "max-w-full!",
      }}
    >
      <section className="w-full grid gap-6 grid-cols-2">
        <InputText
          config={{
            placeholder: "Enter first name",
            className: "py-3!"
          }}
          label="First Name"
        />
        <InputText
          config={{
            placeholder: "Enter last name",
            className: "py-3!"

          }}
          label="Last Name"
        />
        <div className="col-span-2">
          <InputText
            config={{
              type: "email",
              placeholder: "Enter email address",
            className: "py-3!"

            }}
            label="Email"
          />
        </div>
        <InputText
          config={{
            placeholder: "Enter phone number",
            className: "py-3!"

          }}
          label="Phone number"
        />
        <InputText
          config={{
            placeholder: "Enter address line 1",
            className: "py-3!"

          }}
          label="Address Line 1"
        />
        <div className="col-span-2">
 <InputText
          config={{
            placeholder: "Enter address line 2",
            className: "py-3!"

          }}
          label="Address Line 2 (optional)"
        />
        </div>
      </section>
      <div className="flex-center gap-2 self-end">
        <Button
          config={{
            className: "text-primary!",
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
