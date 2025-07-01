"use client";

import { useTranslation } from "@/app/i18n/client";
import { FormFieldInput } from "@/components/common/FormField/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import ROUTES from "@/constants/routes";
import { encryptData } from "@/lib/utils";
import { SignInFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInForm = ({
  showSignUpLabel = false,
}: {
  showSignUpLabel?: boolean;
}) => {
  // language
  const { t } = useTranslation();

  // router
  const router = useRouter();

  // form
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handel on submit function
  async function onSubmit(data: z.infer<typeof SignInFormSchema>) {
    console.log("data", data);

    // type true if two factor is enabled
    const emailData = encryptData({
      email: data?.email,
      type: "twoFactor",
    });
    router.push(`${ROUTES.auth.emailVerification}?data=${emailData}`);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <FormFieldInput
              name="email"
              type="email"
              form={form}
              placeholderText={"emailPlaceholder"}
            />

            <FormFieldInput
              name="password"
              type="password"
              form={form}
              placeholderText={"passwordPlaceholder"}
              passwordInput
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-end sm:mb-3">
              <Button className="p-0 text-sm sm:text-md" variant="link" asChild>
                <Link href={ROUTES.auth.forgot}>
                  {`${t("labels.forgotPassword")}?`}
                </Link>
              </Button>
            </div>

            <LoadingButton size={"lg"} type="submit" className="w-full">
              {t("button.login")}
            </LoadingButton>
          </div>
        </form>
      </Form>
      {showSignUpLabel && (
        <p className="text-center text-dark dark:text-[#CBCBCB] text-sm font-normal">
          {t("labels.dontHaveAnAccount")}
          <Button
            variant={"link"}
            className="p-0 no-underline text-primary"
            asChild
          >
            <Link className="font-semibold" href={ROUTES.auth.signup}>
              {t("labels.registerNow")}
            </Link>
          </Button>
        </p>
      )}
    </>
  );
};

export default SignInForm;
