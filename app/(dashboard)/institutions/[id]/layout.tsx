import InstitutionHeader from "@/components/institution/InstitutionHeader";
import { serverFetch } from "@/adapters/http-server";
import { capitalize } from "@/utils/helper-functions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const institution = await serverFetch<Institution>(
      `/admin/institutions/${id}/`
    );
    return {
      title: capitalize(institution?.name) || `Institution - ${id}`,
      description:
        institution?.descriptor ||
        `Detailed dashboard and management for institution ${id}.`,
    };
  } catch {
    return {
      title: "Institution Not Found",
    };
  }
}

export default async function InstitutionLayout({ children, params }: Props) {
  const { id } = await params;

  let institution: Institution;

  try {
    institution = await serverFetch<Institution>(`/admin/institutions/${id}/`);

    if (!institution) notFound();
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("404")) {
      notFound();
    }
    throw error;
  }

  return (
    <section className="w-full bg-white section-container">
      <InstitutionHeader data={institution} />
      {children}
    </section>
  );
}
