import React from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CAMERA_SCHEMA, CameraFormData } from "@/schema/camera-schema";
import Select from "../common/Select";
import usePaginatorParams from "@/hooks/usePaginatorParams";
import usePatients from "@/hooks/institution/usePatients";

export default function AddCameraForm() {
  const { query } = usePaginatorParams({ searchKey: "sq" });
  const {
    patients,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePatients({ query });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<CameraFormData>({
    mode: "all",
    resolver: yupResolver(CAMERA_SCHEMA),
    defaultValues: {
      name: "",
      location: "",
      brand: "",
      protocol: "",
      host: "",
      rtsp_port: "",
      onvif_port: "",
      username: "",
      password: "",
      patient: "",
    },
  });

  const onSubmit = (data: CameraFormData) => {
    console.log("Camera Form Data:", data);
  };

  return (
    <FormInput
      config={{
        className: "grid! grid-cols-2",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <div className="col-span-2">
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Enter camera Name",
            ...register("name"),
          }}
          label="Camera Name"
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />
      </div>
      <div className="col-span-2">
        <Controller
          name="patient"
          control={control}
          render={({ field }) => (
            <Select
              isLoading={isLoading}
              name="Patients"
              variant="regular"
              hasSearch
              size="full"
              defaultValue={field.value}
              onChange={(val) => field.onChange(val)}
              hasInfinteQuery={hasNextPage}
              fetchingNextPage={isFetchingNextPage}
              onIntersect={() => fetchNextPage()}
              data={
                patients?.map(({ id, full_name, ...rest }) => ({
                  label: full_name,
                  value: id,
                  metadata: rest,
                })) ?? []
              }
              placeholder="Select Patient"
              label="Select Patient"
              error={!!errors.patient}
              errorMessage={errors.patient?.message}
            />
          )}
        />
      </div>
      <div className="col-span-2">
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Enter camera location",
            ...register("location"),
          }}
          label="Camera Location"
          error={!!errors.location}
          errorMessage={errors.location?.message}
        />
      </div>
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter brand",
          ...register("brand"),
        }}
        label="Brand"
        error={!!errors.brand}
        errorMessage={errors.brand?.message}
      />
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter protocol",
          ...register("protocol"),
        }}
        label="Protocol"
          error={!!errors.protocol}
        errorMessage={errors.protocol?.message}
      />
      <div className="col-span-2">
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Enter host (e.g. 192.168.1.10)",
            ...register("host"),
          }}
          label="Host"
          error={!!errors.host}
          errorMessage={errors.host?.message}
        />
      </div>
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter RTSP port",
          ...register("rtsp_port"),
        }}
        label="RTSP Port"
        error={!!errors.rtsp_port}
        errorMessage={errors.rtsp_port?.message}
      />
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter ONVIF port",
          ...register("onvif_port"),
        }}
        label="ONVIF Port"
        error={!!errors.onvif_port}
        errorMessage={errors.onvif_port?.message}
      />
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter username",
          ...register("username"),
        }}
        label="Username"
        error={!!errors.username}
        errorMessage={errors.username?.message}
      />
      <InputText
        config={{
          className: "py-3!",
          placeholder: "Enter password",
          type: "password",
          ...register("password"),
        }}
        label="Password"
        error={!!errors.password}
        errorMessage={errors.password?.message}
      />

      <div className="col-span-2 mt-4 flex justify-end">
        <Button
          config={{
            type: "submit",
            disabled: !isValid || !isDirty,
          }}
        >
          Add Camera
        </Button>
      </div>
    </FormInput>
  );
}
