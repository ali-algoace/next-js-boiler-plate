"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTranslation } from "@/app/i18n/client";
import { FormFieldInput } from "@/components/common/FormField/FormField";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import ROUTES from "@/constants/routes";
import { encryptData } from "@/lib/utils";
import { ForgotPasswordFormSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  // language
  const { t } = useTranslation();

  // router
  const router = useRouter();

  // form
  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // handle submit function
  async function onSubmit(data: z.infer<typeof ForgotPasswordFormSchema>) {
    console.log("data", data);
    const emailData = encryptData({
      email: data?.email,
    });
    router.push(`${ROUTES.auth.reset}?data=${emailData}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldInput
          name="email"
          type="email"
          form={form}
          placeholderText={"emailPlaceholder"}
        />
        <div className="pt-5 sm:pt-7">
          <LoadingButton size={"lg"} className="w-full" type="submit">
            {t("button.sendEmail")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
