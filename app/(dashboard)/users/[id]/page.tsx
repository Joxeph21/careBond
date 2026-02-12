import DashTitle from "@/components/common/DashTitle";
import EditUserForm from "@/components/forms/EditUserForm";
import { Metadata } from "next";
import Image from "next/image";
import { serverFetch } from "@/adapters/http-server";
import { capitalize } from "@/utils/helper-functions";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const user = await serverFetch<User>(`/institution/users/${id}/`);
    return {
      title: `${capitalize(user?.full_name)} | User Details`,
      description: `View and edit details for ${user?.full_name || id}`,
    };
  } catch {
    return {
      title: "User Details",
    };
  }
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  let user: User;

  try {
    user = await serverFetch<User>(`/institution/users/${id}/`);
    if (!user) notFound();
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("404")) {
      notFound();
    }
    throw error;
  }


  return (
    <section className="section-container gap-3 px-3 pb-4 flex flex-col bg-white">
      <DashTitle href="/users" title={capitalize(user?.full_name)} />
      <section className="w-full ring flex flex-col gap-3 ring-grey p-6 pb-3 rounded-2xl">
        {/* <p>Name and Photo</p> */}
        {/* <p>Change your name and photo on Atlassian</p> */}

        <div className="flex mt-5 mb-10 gap-4 items-center">
          <figure className="rounded-full relative overflow-hidden bg-gray-100 size-32">
            <Image
              src={user?.profile_image_url || "/profile.png"}
              className="object-center w-full h-full object-cover"
              fill
              alt="user_profile_picture"
            />
          </figure>
          <div className="space-y-3">
            <p className="font-medium capitalize text-[#292A2E]">{user?.full_name}</p>
            <h4 className="text-lg font-semibold text-[#292A2E]">
              {user?.display_id}
            </h4>
            <p className="text-[#292A2E] font-light capitalize">
              {user?.role_display}
            </p>
          </div>
          <div
            className={`p-1.5 px-4 rounded-full mb-auto text-xs font-medium ml-auto w-fit ${
              user.is_active
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFF1F2] text-[#E11D48]"
            }`}
          >
            {user.is_active ? "Active" : "Suspended"}
          </div>
        </div>
      </section>
      <EditUserForm user={user} isEdit inst_id={user.institution_id!} />
    </section>
  );
}

export default Page;
