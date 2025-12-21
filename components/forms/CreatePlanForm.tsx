import React from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { ICON } from "@/utils/icon-exports";

export default function CreatePlanForm() {
  return (
    <section className="w-full h-full pb-5  p-3">
      <FormInput config={{
        className: ""
      }}>
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Standard",
          }}
          label="Plan Title"
        />
        <InputText
          config={{
            className: "py-3!",

            placeholder: "For proffessionals & team",
          }}
          label="Description"
        />

        <section className="w-full col-center gap-4">
          <p className="self-start">Features</p>
          {Array.from({ length: 4 }).map((_, i) => (
            <InputText
              key={i}
              config={{
                className: "py-3!",

                placeholder: "Unlimited files",
              }}
            />
          ))}

          <Button
            config={{
              className: "rounded-full! gap-2! pr-3",
            }}
            variants="accent"
            size="medium"
            iconPlacement="left"
            icon={ICON.STARS}
          >
            Add New Plan Feature
          </Button>
        </section>
        <section className="w-full col-center gap-4">
          <p className="self-start">Promo Code (optional)</p>
          {Array.from({ length: 2 }).map((_, i) => (
            <InputText
              key={i}
              config={{
                className: "py-3!",

                placeholder: "Enter promo code",
              }}
            />
          ))}

          <Button
            config={{
              className: "rounded-full! gap-2! pr-3",
            }}
            variants="accent"
            size="medium"
            iconPlacement="left"
            icon={ICON.GIFT}
          >
            Add New Promo Code
          </Button>
        </section>

        <section className="w-full flex items-center gap-5 max-w-lg self-start">
          <InputText
            config={{
              className: "py-3!",

              placeholder: "$90",
            }}
            label="Monthly Rate (one month)"
          />
          <InputText
            config={{
              className: "py-3!",

              placeholder: "$199",
            }}
            label="Yearly Rate (one year)"
          />
        </section>

        <section className="flex-center w-full justify-end! gap-4 pb-5">
            <Button variants="outlined">Cancel</Button>
            <Button>Submit</Button>
        </section>
      </FormInput>
    </section>
  );
}
