import ICONS from "@/assets/icons";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const LoadingComponent = () => {
  return (
    // replace the bg color according to your theme
    <div className="bg-amber-300 min-h-screen grid place-content-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <Image
          src={ICONS.circleCheck} // replace your logo here
          alt="logo"
          width={150}
          height={150}
          priority
        />
        <LoaderCircle className="w-8 h-8 animate-spin text-white" />
      </div>
    </div>
  );
};

export default LoadingComponent;
