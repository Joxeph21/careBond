import React, { Suspense } from "react";
import ForgotPasswordContent from "./content";
import ActivityIndicator from "@/components/common/ActivityIndicator";

export default function Page() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
