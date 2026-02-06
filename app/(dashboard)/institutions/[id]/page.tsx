import InstitutionDashboard from "@/components/institution/institutionDashboard";
import { serverFetch } from "@/adapters/http-server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 0; // Disables caching for this layout/page

export default async function Page({ params }: Props) {
  const { id } = await params;

  let institution: Institution;
  try {
    institution = await serverFetch<Institution>(`/admin/institutions/${id}/`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) {
      notFound();
    }
    throw error;
  }

  return <InstitutionDashboard id={id} data={institution} />;
}
  