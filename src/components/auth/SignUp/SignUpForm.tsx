"use client";

import { useTranslation } from "@/app/i18n/client";
import { FormFieldInput } from "@/components/common/FormField/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import ROUTES from "@/constants/routes";
import { encryptData } from "@/lib/utils";
import { SignUpFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type SignFormData = z.infer<typeof SignUpFormSchema>;
const SignUpForm = ({
  showLoginLabel = false,
}: {
  showLoginLabel?: boolean;
}) => {
  // language
  const { t } = useTranslation();

  // router
  const router = useRouter();

  // form
  const form = useForm<SignFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // handel on submit function
  async function onSubmit(data: SignFormData) {
    console.log("data", data);

    const emailData = encryptData({
      email: data?.email,
      type: "signUp",
    });
    router.push(`${ROUTES.auth.emailVerification}?data=${emailData}`);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 px-2">
            <FormFieldInput
              name="firstName"
              type="text"
              form={form}
              placeholderText={"firstName"}
            />

            <FormFieldInput
              name="lastName"
              type="text"
              form={form}
              placeholderText={"lastName"}
            />
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
              placeholderText={"emailPlaceholder"}
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
          <div className="mt-7">
            <LoadingButton size={"lg"} type="submit" className="w-full">
              {t("button.signup")}
            </LoadingButton>
          </div>
        </form>
      </Form>
      {showLoginLabel && (
        <p className="text-center text-dark dark:text-[#CBCBCB] text-sm font-normal">
          {t("labels.alreadyHaveAnAccount")}
          <Button
            variant={"link"}
            className="p-0 no-underline text-primary"
            asChild
          >
            <Link className="font-semibold" href={ROUTES.auth.signin}>
              {t("labels.loginNow")}
            </Link>
          </Button>
        </p>
      )}
    </>
  );
};

export default SignUpForm;
