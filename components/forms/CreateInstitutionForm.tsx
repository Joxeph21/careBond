import React from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";

export default function CreateInstitutionForm() {
  return (
    <FormInput
      config={{
        className: "grid! grid-cols-2",
      }}
    >
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Comapany Name",
        }}
        label="Company Name"
      />
      <InputText
        config={{
          className: "py-3!",

          placeholder: "For proffessionals & team",
        }}
        label="Director"
      />
      <div className="col-span-2">

      <InputText
        config={{
            className: "py-3!",
            placeholder: "Standard",
        }}
        label="Email"
        />
        </div>
      <InputText
        config={{
          className: "py-3!",

          placeholder: "For proffessionals & team",
        }}
        label="Phone Number"
      />
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Standard",
        }}
        label="Location"
      />
      <div className="col-span-2">

      <InputText
        config={{
          className: "py-3!",

          placeholder: "For proffessionals & team",
        }}
        label="Institution Address"
      />
      </div>


      <div className="col-span-2 gap-3 flex flex-col">
<p>Choose Plan (optional)</p>
       <section className="w-full flex-center bg-blue-50 rounded-md h-32">
        <p className="flex-center gap-1 text-[#86929E]"><Icon icon={ICON.PLUS} /> Select a Plan</p>
        </section> 
      </div>

      <section className="flex-center col-span-2 w-full justify-end! gap-4 pb-5">
        <Button variants="outlined">Reset</Button>
        <Button>Submit</Button>
      </section>
    </FormInput>
  );
}
