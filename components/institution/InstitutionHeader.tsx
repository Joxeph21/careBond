import React from "react";
import DashTitle from "../common/DashTitle";
import { capitalize } from "@/utils/helper-functions";

export default function InstitutionHeader({ data }: { data: Institution }) {
  return <DashTitle title={capitalize(data?.name)} />;
}
