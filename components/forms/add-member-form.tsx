import { get_user_schema, UserFormData } from "@/schema/user-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import InputTextArea from "../common/InputTextArea";
import Button from "../common/Button";
import { useCreateIUser } from "@/hooks/institution/useInstitutionsUsers";

type MemberProps = {
  type: IUser["role"];
};

export default function AddMemberForm({
  type,
  onCloseModal,
}: onCloseModal & MemberProps) {
  const { createUser, isCreating } = useCreateIUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UserFormData>({
    resolver: yupResolver(get_user_schema(false)) as Resolver<UserFormData>,
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role: type,
      date_of_birth: "",
      address: "",
      gender: "",
      description: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserFormData> = (formData) => {
    createUser(formData, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  };

  return (
    <FormInput
      config={{
        className: "grid grid-cols-2",
        onSubmit: handleSubmit(
          onSubmit as unknown as SubmitHandler<FieldValues>,
        ),
      }}
    >
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
          placeholder: "Enter password",
          type: "password",
          className: "py-2!",
          ...register("password"),
        }}
        label="Create Password"
        error={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <InputText
        config={{
          placeholder: "Enter phone number",
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
          placeholder: "Enter date of birth",
          type: "date",
          className: "py-2!",
          ...register("date_of_birth"),
        }}
        label="Date of Birth"
        error={!!errors.date_of_birth}
        errorMessage={errors.date_of_birth?.message}
      />
      <InputText
        config={{
          placeholder: "Enter gender",
          type: "text",
          className: "py-2!",
          ...register("gender"),
        }}
        label="Gender"
        error={!!errors.gender}
        errorMessage={errors.gender?.message}
      />
      {/* <div className="col-span-2"> */}
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
      {/* </div> */}

      <div className="w-full col-span-2">
        <InputTextArea
          config={{
            placeholder: "Enter description",
            className: "py-2!",
            ...register("description"),
          }}
          label="Description"
          error={!!errors.description}
          errorMessage={errors.description?.message}
        />
      </div>
      <div className="flex-center gap-3 col-span-2 w-full justify-end!">
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
          isLoading={isCreating}
          config={{
            type: "submit",
            disabled: !isValid || !isDirty,
          }}
        >
          Create {type}
        </Button>
      </div>
    </FormInput>
  );
}
