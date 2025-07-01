import REGEX from "@/constants/regex";
import { z } from "zod";

// SignInForm Validation
const SignInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "emailRequired" })
    .email("validEmail"),
  password: z
    .string({
      required_error: "passwordRequired",
    })
    .nonempty({ message: "passwordRequired" })
    .min(1, { message: "passwordRequired" })
    .max(250, { message: "maxPassword" }),
});

//SignUpForm Validation
const SignUpFormSchema = z
  .object({
    firstName: z
      .string({
        required_error: "firstNameReq",
      })
      .trim()
      .nonempty({ message: "firstNameReq" })
      .min(2, "nameShort")
      .max(25, "nameLong")
      .refine((value) => value.trim().length >= 2, {
        message: "nameShort",
      })
      .refine((value) => REGEX.firstName.test(value), {
        message: "firstNameAlpha",
      }),
    lastName: z
      .string({
        required_error: "lastNameReq",
      })
      .trim()
      .nonempty({ message: "lastNameReq" })
      .min(2, "nameShort")
      .max(30, "nameLong")
      .refine((value) => value.trim().length >= 2, {
        message: "nameShort",
      })
      .refine((value) => REGEX.lastName.test(value), {
        message: "lastNameAlpha",
      }),
    email: z
      .string()
      .trim()
      .min(1, { message: "emailRequired" })
      .email("validEmail"),
    password: z
      .string({
        required_error: "passwordRequired",
      })
      .min(8, { message: "validPassword" })
      .max(250, { message: "maxPassword" })
      .refine((value) => REGEX.password.test(value), {
        message: "validPassword",
      }),
    confirmPassword: z
      .string({
        required_error: "confirmPasswordRequired",
      })
      .min(1, "confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirmPassword",
    path: ["confirmPassword"],
  });

//EmailVarificationForm Validation
const EmailVerificationFormSchema = z.object({
  pin: z
    .string({ required_error: "enterOtp" })
    .trim()
    .min(1, {
      message: "enterOtp",
    })
    .min(6, {
      message: "validOtp",
    }),
});

//ForgotPasswordForm Validation
const ForgotPasswordFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "emailRequired" })
    .email("validEmail"),
});

//ResetPasswordForm Validation
const ResetPasswordFormSchema = z
  .object({
    pin: z
      .string({ required_error: "enterOtp" })
      .trim()
      .min(1, {
        message: "enterOtp",
      })
      .min(6, {
        message: "validOtp",
      }),
    password: z
      .string({
        required_error: "passwordRequired",
      })
      .min(1, { message: "passwordRequired" })
      .max(250, { message: "maxPassword" })
      .refine((value) => REGEX.password.test(value), {
        message: "validPassword",
      }),
    confirmPassword: z
      .string({
        required_error: "confirmPasswordRequired",
      })
      .min(1, "confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirmPassword",
    path: ["confirmPassword"],
  });

export {
  SignInFormSchema,
  SignUpFormSchema,
  EmailVerificationFormSchema,
  ForgotPasswordFormSchema,
  ResetPasswordFormSchema,
};
