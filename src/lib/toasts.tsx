import ICONS from "@/assets/icons";
import Image from "next/image";
import { toast } from "sonner";

export const successSonner = (successMsg: string) => {
  toast(
    <div className="flex items-center gap-4 text-sm bg-green-600 text-white p-4 rounded-lg">
      <div className="flex items-center justify-center bg-white rounded-full w-8 h-8 min-w-[32px]">
        <Image src={ICONS.circleCheck} alt="success" width={20} height={20} />
      </div>
      <div className="flex-grow">
        <span className="font-semibold">Success</span>
        <p className="font-normal min-w-[300px]">{successMsg}</p>
      </div>
    </div>,
    {
      duration: 3000,
      className: "bg-green-500 text-white border-none",
    }
  );
};

export const errorSonner = (errorMsg: string) => {
  toast(
    <div className="flex items-center gap-4 text-sm bg-red-600 text-white p-4 rounded-lg">
      <div className="flex items-center justify-center bg-white rounded-full w-8 h-8 min-w-[32px]">
        <Image src={ICONS.circleCross} alt="success" width={20} height={20} />
      </div>
      <div className="flex-grow">
        <span className="font-semibold">Error</span>
        <p className="font-normal min-w-[300px]">{errorMsg}</p>
      </div>
    </div>,
    {
      duration: 3000,
      className: "bg-destructive text-destructive-foreground border-none",
    }
  );
};
