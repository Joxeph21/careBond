import ActivityIndicator from "@/components/common/ActivityIndicator";
import React from "react";

export default function ActionLoader() {
  return (
    <section className="w-full z-50 cursor-wait fixed inset-0 bg-white/20 backdrop-blur-sm flex-center">
      <div className="size-20 text-primary rounded-md bg-white flex-center">
        <ActivityIndicator />
      </div>
    </section>
  );
}
