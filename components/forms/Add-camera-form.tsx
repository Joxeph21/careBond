import React from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CAMERA_SCHEMA, CameraFormData } from "@/schema/camera-schema";
import Select from "../common/Select";
import usePaginatorParams from "@/hooks/usePaginatorParams";
import usePatients, { useAddCameras } from "@/hooks/institution/usePatients";
import Switch from "../common/Switch";
import useAdmin from "@/hooks/auth/useAdmin";

export default function AddCameraForm({ onCloseModal }: onCloseModal) {
  const { data: institution } = useAdmin();
  const { add_camera, isPending } = useAddCameras();
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
      patient_id: "",
      fall_detection_enabled: false,
    },
  });

  const onSubmit = (data: CameraFormData) => {
    if (!institution?.institution_id) return;
    add_camera(
      { institution_id: institution.institution_id, data },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
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
          name="patient_id"
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
              error={!!errors.patient_id}
              errorMessage={errors.patient_id?.message}
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
      <div className="flex-row-reverse flex col-span-2 items-center justify-end gap-2 p-3  rounded-lg">
        <label
          htmlFor="fall_detection_enabled"
          className="cursor-pointer font-medium text-[#353B45]"
        >
          Enable Fall Detection
        </label>
        <Controller
          name="fall_detection_enabled"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={(val) => field.onChange(val)}
            />
          )}
        />
      </div>
      <div className="col-span-2 mt-4 flex justify-end">
        <Button
          isLoading={isPending}
          config={{
            type: "submit",
            disabled: !isValid || !isDirty || isPending,
          }}
        >
          Add Camera
        </Button>
      </div>
    </FormInput>
  );
}
