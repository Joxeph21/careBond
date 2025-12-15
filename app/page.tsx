"use client"
import Button from "@/components/common/Button";
import { useLogout } from "@/hooks/auth/useAuth";
import { CONFIG } from "@/utils/config";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const { logout, isPending } = useLogout()



  return (
    <div className="col-center mx-auto px-4 max-w-lg min-h-screen gap-3">
      <Button config={{
        onClick: () => logout(undefined, {
          onSuccess: () => {
            sessionStorage.removeItem(CONFIG.ACCESS_TOKEN_IDENTIFIER);
            router.replace("/login")
          }
        })
      }} isLoading={isPending} size="full" variants="danger">Logout</Button>
    </div>
  );
}
