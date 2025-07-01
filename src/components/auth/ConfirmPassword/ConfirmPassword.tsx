"use client";

import { decryptData } from "@/lib/utils";
import { UserCredentials } from "@/types/auth/EmailVerificationForm/EmailVerificationForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmPasswordForm from "./ConfirmPasswordForm";

export default function ConfirmPasswordPage() {
  // using quey params
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  // router
  const { back } = useRouter();

  // handle user credentials
  const [userCredentials, setUserCredentials] = useState<
    Partial<UserCredentials>
  >({
    email: "",
  });

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
    } catch (error) {
      console.error("Failed to decrypt data:", error);
      back(); // or router.push("/some-fallback-page");
    }
  }, [data]); // Depend on `data` to handle changes

  return <ConfirmPasswordForm userCredentials={userCredentials} />;
}
