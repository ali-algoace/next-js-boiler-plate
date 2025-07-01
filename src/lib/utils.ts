import { clsx, type ClassValue } from "clsx";
import i18next from "i18next";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

// secret key for data validation
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// handle catch error
export const catchError = (error: unknown) => {
  let errorMessage = i18next.t("errors.someThingWentWrongTryAgain");

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  return errorMessage;
};

// encrypt params data
export function encryptData(data: object): string {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY!
  ).toString();
  return encodeURIComponent(ciphertext); // Encode to make it URL-safe
}

// decrypt params data
export function decryptData(ciphertext: string): object {
  const bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(ciphertext),
    SECRET_KEY!
  );
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
}

// otp time formater
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};
