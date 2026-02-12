import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import InputText from "@/components/common/InputText";
import { ICON } from "@/utils/icon-exports";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full  col-center gap-5">
      <div className="text-center space-y-1">
        <h2 className="text-foreground font-ut text-[20px] font-medium">
          Register
        </h2>
        <p className="text-grey-dark">
          Please enter your details to create account
        </p>
      </div>
      <FormInput>
        <InputText
          label="Full Name"
          prefix={ICON.USER}
          config={{
            type: "email",
            placeholder: "Enter Name",
          }}
        />
        <InputText
          label="Email Address"
          prefix={ICON.MAIL}
          config={{
            type: "email",
            placeholder: "Enter Email Address",
          }}
        />
        <InputText
          prefix={ICON.LOCK}
          label="Password"
          config={{
            type: "password",
          }}
        />
        <InputText
          prefix={ICON.LOCK}
          label="Confirm Password"
          config={{
            type: "password",
          }}
        />

        <div className="flex w-full items-center gap-2">
          <label htmlFor="terms">
            I agree to the{" "}
            <Link className="underline text-primary" href={"#"}>
              Terms of Service
            </Link>{" "}
            <span className="text-primary">&</span>{" "}
            <Link className="underline text-primary" href={"#"}>
              Privacy Policy
            </Link>
          </label>
          <input
            type="checkbox"
            aria-label="Remember me"
            name="terms"
            className="-order-1 cursor-pointer accent-primary"
          />
        </div>

        <div className="w-full flex-center relative">
          <p className="bg-white z-1 px-5">OR</p>
          <div className="top-1/2 absolute w-full h-px bg-grey rounded-full"></div>
        </div>

        <ul className=" w-full gap-4 flex-between">
          <li className="w-full">
            <Button
              config={{
                className: "py-2!",
              }}
              variants="outlined"
              size="full"
            >
              <Icon icon={ICON.FACEBOOK} color="#2F80ED" fontSize={24} />
            </Button>
          </li>
          <li className="w-full">
            <Button
              config={{
                className: "py-2!",
              }}
              variants="outlined"
              size="full"
            >
              <Icon icon={ICON.GOOGLE} fontSize={24} />
            </Button>
          </li>
          <li className="w-full">
            <Button
              config={{
                className: "py-2!",
              }}
              variants="outlined"
              size="full"
            >
              <Icon icon={ICON.APPLE} fontSize={24} />
            </Button>
          </li>
        </ul>

        <Button size="full">Register</Button>
        <p className="font-medium">
          Already have an account?{" "}
          <Link className="text-primary hover:underline" href={"/login"}>
            Login
          </Link>
        </p>
      </FormInput>
    </div>
  );
}
