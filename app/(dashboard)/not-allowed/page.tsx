import Button from "@/components/common/Button";
import { Icon } from "@iconify/react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const { returnTo } = await searchParams;
  const backLink = returnTo || "/";

  return (
    <section className="w-full fixed z-60 h-screen inset-0 bg-white col-center gap-4">
      <span className="size-12 bg-primary/30 rounded-full text-primary flex-center">
        <Icon icon={"ic:baseline-back-hand"} fontSize={24} />
      </span>

      <div className="text-center col-center gap-3">
        <h2 className="text-foreground text-[20px] font-ut font-medium">
          Not Allowed!
        </h2>
        <p className="text-grey-dark max-w-[60%] mx-auto">
          You don&apos;t have the required permissions to access this page.
          Please contact your administrator for assistance.
        </p>
        <Button link href={backLink}>
          Back to safety
        </Button>
      </div>
    </section>
  );
}
