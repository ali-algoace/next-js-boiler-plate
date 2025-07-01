import { useTranslation } from "@/app/i18n/client";
import { FormFieldInput } from "@/components/common/FormField/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { formatTime } from "@/lib/utils";
import { EmailVerificationFormSchema } from "@/lib/validations";
import { EmailVerificationFormProps } from "@/types/auth/EmailVerificationForm/EmailVerificationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type VerifyType = "twoFactor" | "signUp";

const EmailVerificationForm = ({
  userCredentials,
  verifyType,
}: EmailVerificationFormProps) => {
  // language
  const { t } = useTranslation();

  // otp timer
  const [timeLeft, setTimeLeft] = useState(60);

  console.log("userCredentials", userCredentials);

  // handle otp timer
  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // handle resend code function
  const handleResendCode = async () => {
    setTimeLeft(60);
  };

  // form
  const form = useForm<z.infer<typeof EmailVerificationFormSchema>>({
    resolver: zodResolver(EmailVerificationFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // handle if two factor is enabled
  const handleTwoFactor = (
    data: z.infer<typeof EmailVerificationFormSchema>
  ) => {
    console.log("data", data);
  };

  // handle if type is signup
  const handleSignUp = (data: z.infer<typeof EmailVerificationFormSchema>) => {
    console.log("data", data);
  };

  // handle submit function
  async function onSubmit(data: z.infer<typeof EmailVerificationFormSchema>) {
    console.log("data", data);

    // verifyType is twoFactor if two factor is enabled
    if (verifyType === "twoFactor") {
      handleTwoFactor(data);
    } else if (verifyType === "signUp") {
      handleSignUp(data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <FormFieldInput
            name="pin"
            form={form}
            placeholderText={"confirmPassword"}
            otpInput
          />
        </div>
        <div className="space-y-4 mt-6">
          <LoadingButton size={"lg"} type="submit" className="w-full">
            {t("button.verifyCode")}
          </LoadingButton>
        </div>

        <div className="flex flex-col items-center justify-center mt-6 sm:mt-10 sm:gap-3">
          {/* timer */}
          <p className="font-urbanist font-normal text-sm sm:text-base text-grayText">
            {t("labels.codeText")} {formatTime(timeLeft)}
          </p>
          {/* resend button */}
          <Button
            type="button"
            onClick={handleResendCode}
            disabled={timeLeft !== 0}
            variant={"none"}
            className=" text-secondary font-bold text-base sm:text-2xl underline "
          >
            {t("button.resend")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmailVerificationForm;
