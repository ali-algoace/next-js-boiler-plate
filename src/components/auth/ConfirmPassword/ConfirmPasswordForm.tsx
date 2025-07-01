import { useTranslation } from "@/app/i18n/client";
import { FormFieldInput } from "@/components/common/FormField/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import ROUTES from "@/constants/routes";
import { formatTime } from "@/lib/utils";
import { ResetPasswordFormSchema } from "@/lib/validations";
import { UserCredentials } from "@/types/auth/EmailVerificationForm/EmailVerificationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ConfirmPasswordFormProps {
  userCredentials: Partial<UserCredentials>;
}

const ConfirmPasswordForm = ({ userCredentials }: ConfirmPasswordFormProps) => {
  // language
  const { t } = useTranslation();

  // otp timer
  const [timeLeft, setTimeLeft] = useState(60);

  // user email
  console.log("userCredentials", userCredentials);

  // router
  const router = useRouter();

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
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // handle submit function
  async function onSubmit(data: z.infer<typeof ResetPasswordFormSchema>) {
    console.log("data", data);

    router.replace(ROUTES.auth.signin);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6 sm:space-y-8">
          <FormFieldInput
            name="pin"
            form={form}
            placeholderText={"confirmPassword"}
            otpInput
          />
          <div className="flex flex-col items-center justify-center mt-10 sm:gap-3">
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
              className=" text-secondary font-bold text-base sm:text-2xl"
            >
              {t("button.resend")}
            </Button>
          </div>
          <FormFieldInput
            name="password"
            type="password"
            form={form}
            placeholderText={"passwordPlaceholder"}
            passwordInput
          />
          <FormFieldInput
            name="confirmPassword"
            type="password"
            form={form}
            placeholderText={"confirmPassword"}
            passwordInput
          />
        </div>
        <div className="space-y-4 mt-3">
          <LoadingButton size={"lg"} type="submit" className="w-full">
            {t("button.verifyResetPassword")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default ConfirmPasswordForm;
