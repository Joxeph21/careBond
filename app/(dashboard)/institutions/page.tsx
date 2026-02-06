import { Metadata } from "next";
import React from "react";
import InstitutionContent from "./content";

export const metadata: Metadata = {
  title: "Institutions",
  description:
    "Manage and monitor healthcare institutions, their plans, and subscription statuses.",
};

export default function Page() {
  return (
    <section className="section-container h-full bg-white">
      <InstitutionContent />
    </section>
  );
}
