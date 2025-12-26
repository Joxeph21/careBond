import React from "react";
import Card from "../common/Card";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";

export default function PatientsOverview() {
  return (
    <Card className="col-span-2">
      <Card.Header>
        <h3 className="font-bold flex items-center gap-2 text-lg text-[#212B36]">
          <span className="flex-center size-7.5 rounded-md bg-[#E7F0FF] text-primary">
            <Icon icon={ICON.INFO} fontSize={21} />
          </span>{" "}
         Overall Information
        </h3>
      </Card.Header>
      <Card.Content>
        
      </Card.Content>
    </Card>
  );
}
