import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-exports";

export default function UserNotFound() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center bg-white gap-6 px-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
        <Icon
          icon="solar:user-broken"
          className="text-primary relative z-10"
          fontSize={120}
        />
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        <h2 className="text-3xl font-bold text-[#1C1C1C]">User Not Found</h2>
        <p className="text-grey-dark max-w-sm mx-auto">
          The user you are looking for doesn&apos;t exist or might have been
          removed. Please check the ID or return to the active users list.
        </p>
      </div>

      <Link
        href="/users"
        className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
      >
        <Icon icon={ICON.ARROW_LEFT} />
        Back to Users
      </Link>
    </section>
  );
}
