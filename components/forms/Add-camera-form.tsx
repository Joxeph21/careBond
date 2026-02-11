import React, { useEffect } from "react";
import FormInput from "../common/FormInput";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CAMERA_SCHEMA,
  CAMERA_EDIT_SCHEMA,
  CameraFormData,
  CameraEditFormData,
} from "@/schema/camera-schema";
import Select from "../common/Select";
import usePaginatorParams from "@/hooks/usePaginatorParams";
import {
  useAddCameras,
  useUpdateCamera,
} from "@/hooks/institution/usePatients";
import Switch from "../common/Switch";
import useAdmin from "@/hooks/auth/useAdmin";
import { useGetIUsers } from "@/hooks/institution/useInstitutionsUsers";
import useIUsers from "@/hooks/superadmin/useIUsers";

export default function AddCameraForm({
  onCloseModal,
  type = "create",
  data,
}: {
  type?: "create" | "edit";
  data?: Camera;
} & onCloseModal) {
  const { isSuperAdmin, data: adminData } = useAdmin();
  const { add_camera, isPending } = useAddCameras();
  const { update_camera, isPending: isUpdating } = useUpdateCamera();

  const { query } = usePaginatorParams({ searchKey: "sq" });

  const {
    users: superAdminPatients,
    isLoading: isSuperLoading,
    total_count: superAdminCount,
  } = useIUsers(isSuperAdmin, { query, role: "patient" });

  const {
    users: institutionPatients,
    isLoading: isInstLoading,
    total_count: institutionCount,
  } = useGetIUsers(!isSuperAdmin ? adminData?.institution_id : null, {
    query,
    role: "patient",
  });

  const patients = isSuperAdmin ? superAdminPatients : institutionPatients;
  const isLoading = isSuperAdmin ? isSuperLoading : isInstLoading;
  const count = isSuperAdmin ? superAdminCount : institutionCount;

  const isEdit = type === "edit";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<CameraFormData | CameraEditFormData>({
    mode: "all",
    resolver: yupResolver(isEdit ? CAMERA_EDIT_SCHEMA : CAMERA_SCHEMA),
    defaultValues: {
      name: data?.name ?? "",
      location: data?.location ?? "",
      brand: data?.brand ?? "",
      protocol: data?.protocol ?? "",
      host: data?.host ?? "",
      rtsp_port: data?.rtsp_port?.toString() ?? "",
      onvif_port: data?.onvif_port?.toString() ?? "",
      ...(isEdit
        ? {}
        : {
            username: "",
            password: "",
          }),
      patient_id: data?.patient ?? "",
      fall_detection_enabled: data?.fall_detection_enabled ?? false,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name ?? "",
        location: data.location ?? "",
        brand: data.brand ?? "",
        protocol: data.protocol ?? "",
        host: data.host ?? "",
        rtsp_port: data.rtsp_port?.toString() ?? "",
        onvif_port: data.onvif_port?.toString() ?? "",
        ...(isEdit
          ? {}
          : {
              username: "",
              password: "",
            }),
        patient_id: data.patient ?? "",
        fall_detection_enabled: data.fall_detection_enabled ?? false,
      });
    }
  }, [data, reset, isEdit]);

  const onSubmit = (formData: CameraFormData | CameraEditFormData) => {
    if (!adminData?.institution_id) return;

    if (type === "edit") {
      if (!data?.id) return;
      update_camera(
        { id: data.id, data: formData as CameraEditFormData },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        },
      );
    } else {
      add_camera(
        {
          institution_id: adminData.institution_id,
          data: formData as CameraFormData,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        },
      );
    }
  };

  const isMutating = isPending || isUpdating;

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
              data={
                patients?.map(({ id, full_name, ...rest }) => ({
                  label: full_name,
                  value: id,
                  metadata: rest,
                })) ?? []
              }
              totalCount={count}
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
      {!isEdit && (
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Enter username",
            ...register("username"),
          }}
          label="Username"
          error={!!(errors as FieldErrors<CameraFormData>).username}
          errorMessage={
            (errors as FieldErrors<CameraFormData>).username?.message
          }
        />
      )}
      {!isEdit && (
        <InputText
          config={{
            className: "py-3!",
            placeholder: "Enter password",
            type: "password",
            ...register("password"),
          }}
          label="Password"
          error={!!(errors as FieldErrors<CameraFormData>).password}
          errorMessage={
            (errors as FieldErrors<CameraFormData>).password?.message
          }
        />
      )}
      <div className="flex-row-reverse flex col-span-2 items-center justify-end gap-2 p-3 rounded-lg">
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
      <div className="col-span-2 mt-4 flex justify-end gap-3">
        <Button
          variants="outlined"
          config={{ type: "button", onClick: () => reset() }}
        >
          Reset
        </Button>
        <Button
          isLoading={isMutating}
          config={{
            type: "submit",
            disabled: !isValid || !isDirty || isMutating,
          }}
        >
          {type === "edit" ? "Save Changes" : "Add Camera"}
        </Button>
      </div>
    </FormInput>
  );
}
