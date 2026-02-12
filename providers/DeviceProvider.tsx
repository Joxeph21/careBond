"use client";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";

export const DeviceProvider = ({ children }: PropsWithChildren) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  if (!isDesktopOrLaptop) return <UnOptimizedDevice />;

  return <>{children}</>;
};

function UnOptimizedDevice() {
  return (
    <section className="w-full h-screen z-70 text-white text-center fixed flex flex-col items-center justify-center inset-0 bg-black">
      <figure className="col-center gap-1">
        <Image
          width={40}
          height={40}
          src="/favicon-32x32.png"
          alt="Carebond Logo"
        />
        <figcaption className="font-bold text-lg">Carebond</figcaption>
      </figure>

      <div className="flex flex-col mt-8">
        <h4 className="text-2xl">This site is not optimized for your device</h4>
        <p className="text-sm">
          Please use a desktop or laptop to access this site
        </p>
      </div>
    </section>
  );
}
