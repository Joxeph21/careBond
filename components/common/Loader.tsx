
import React from "react";
import ActivityIndicator from "./ActivityIndicator";

export default function Loader() {
  return (
    <section className="flex-center w-full h-screen fixed inset-0 z-60 bg-white text-primary">
      <ActivityIndicator className="text-primary" />
    </section>
  );
}
