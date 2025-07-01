import { useTranslation } from "@/app/i18n/client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import React from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import OTPInput from "react-otp-input";

interface IFormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  type?: React.HTMLInputTypeAttribute;
  placeholderText: string;
  passwordInput?: boolean;
  otpInput?: boolean;
  form: UseFormReturn<T>;
}

export const FormFieldInput = <T extends FieldValues>({
  name,
  type = "text",
  placeholderText,
  passwordInput = false,
  otpInput = false,
  form,
}: IFormFieldProps<T>) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {passwordInput ? (
              // passowrd input
              <PasswordInput
                placeholder={t(`placeholder.${placeholderText}`)}
                {...field}
              />
            ) : otpInput ? (
              // otp input
              <OTPInput
                {...field}
                numInputs={6}
                inputType="number"
                renderSeparator={<span className="text-[#FFFFFF17]">-</span>}
                renderInput={(props) => <input {...props} />}
                containerStyle="!w-full flex justify-center sm:gap-[4px]"
                inputStyle="!w-full bg-inputBg border-inputBorder h-14 md:h-14 font-poppins text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
              />
            ) : (
              // input
              <Input
                type={type}
                placeholder={t(`placeholder.${placeholderText}`)}
                {...field}
              />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
