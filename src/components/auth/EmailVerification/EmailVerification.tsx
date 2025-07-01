"use client";

import { decryptData } from "@/lib/utils";
import { UserCredentials } from "@/types/auth/EmailVerificationForm/EmailVerificationForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EmailVerificationForm, { VerifyType } from "./EmailVerificationForm";

export default function EmailVerificationPage() {
  // using quey params
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  // handle user credentials
  const [userCredentials, setUserCredentials] = useState<
    Partial<UserCredentials>
  >({
    email: "",
  });

  // checking verify type
  const [verifyType, setVerifyType] = useState<string>("");

  // router
  const { back } = useRouter();

  // decryptData using this effect
  useEffect(() => {
    if (!data) {
      back(); // or router.push("/some-fallback-page");
      return;
    }

    try {
      const credentials = decryptData(data) as Partial<UserCredentials>;
      console.log("credentials", credentials);

      if (!credentials?.email) {
        back(); // or router.push("/some-fallback-page");
        return;
      }

      setUserCredentials({
        email: credentials.email,
      });
      setVerifyType(String(credentials.type));
    } catch (error) {
      console.error("Failed to decrypt data:", error);
      back(); // or router.push("/some-fallback-page");
    }
  }, [data]); // Depend on `data` to handle changes

  return (
    <EmailVerificationForm
      userCredentials={userCredentials}
      verifyType={verifyType as VerifyType}
    />
  );
}
