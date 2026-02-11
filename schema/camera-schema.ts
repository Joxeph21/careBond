import * as Yup from "yup";

export const CAMERA_SCHEMA = Yup.object({
  name: Yup.string().required("Camera name is required"),
  location: Yup.string().required("Camera location is required"),
  brand: Yup.string().required("Brand is required"),
  protocol: Yup.string().required("Protocol is required"),
  host: Yup.string().required("Host is required"),
  rtsp_port: Yup.string().required("RTSP port is required"),
  onvif_port: Yup.string().required("ONVIF port is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  patient_id: Yup.string().required("Patient is required"),
  fall_detection_enabled: Yup.boolean().default(false),
});

export const CAMERA_EDIT_SCHEMA = Yup.object({
  name: Yup.string().required("Camera name is required"),
  location: Yup.string().required("Camera location is required"),
  brand: Yup.string().required("Brand is required"),
  protocol: Yup.string().required("Protocol is required"),
  host: Yup.string().required("Host is required"),
  rtsp_port: Yup.string().required("RTSP port is required"),
  onvif_port: Yup.string().required("ONVIF port is required"),
  patient_id: Yup.string().required("Patient is required"),
  fall_detection_enabled: Yup.boolean().default(false),
});

export type CameraFormData = Yup.InferType<typeof CAMERA_SCHEMA>;
export type CameraEditFormData = Yup.InferType<typeof CAMERA_EDIT_SCHEMA>;
