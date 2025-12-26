import InstitutionHeader from "@/components/institution/InstitutionHeader";
import { PropsWithChildren } from "react";

export default function InstitutionLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <section className="w-full bg-white section-container">
      <InstitutionHeader />
      {children}
    </section>
  );
}
