"use client";
import Button from "@/components/common/Button";
import { useLogout } from "@/hooks/auth/useAuth";
import { CONFIG } from "@/utils/config";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div className="col-center mx-auto px-4 max-w-lg h-full  gap-3">
      <Button config={{}} size="full" variants="danger">
        Logout
      </Button>
    </div>
  );
}
