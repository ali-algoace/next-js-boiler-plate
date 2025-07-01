/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAPIParams } from "@/types/fetch/fetch";
import i18next from "i18next";
import { errorSonner } from "./toasts";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Define your BASE_URL here

export const API = async (params: IAPIParams) => {
  const {
    method,
    endpoint = "",
    payload = null,
    isToken = true,
    isFormData = false,
    headers = {},
    mode = "",
    options: nextOptions = {},
    cache = "no-store",
    signal,
  } = params;
  const URL = `${BASE_URL}/${endpoint}`;
  let accessToken;
  const payloadData =
    method !== "GET" && method !== "DELETE"
      ? JSON.stringify(payload)
      : undefined;

  // eslint-disable-next-line prefer-const
  let options: RequestInit = {
    method,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...headers,
    },
    body: payloadData,
    ...(signal ? { signal } : {}), // ✅ Conditionally include signal
    next: nextOptions,
    cache: cache,
  };

  if (isToken) {
    const session = ""; // your session function;
    accessToken = session && ""; // add JWT token (Note: session && "" ====> for temporary add this replace with your token)
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  try {
    let response: Response;
    if (mode === "auth") {
      response = await fetch(`${BASE_URL}/auth${URL}`, options);
    } else {
      response = await fetch(URL, options);
    }

    if (!response.ok) {
      if (response.status === 401) {
        const errorMessage = await response.text();
        console.log("errorMessage", errorMessage);
        const parsedErrorMessage = JSON.parse(errorMessage); // Parse the error message
        console.log("parsedErrorMessage", parsedErrorMessage);
        const msg =
          parsedErrorMessage?.message === "Token user not found"
            ? i18next.t("errors.sessionExpired")
            : i18next.t(`errors.${parsedErrorMessage?.code}`);
        errorSonner(msg);
        // onLogout(); // Handle logout on 401 errors
        throw new Error(errorMessage);
      }

      if (response.status === 500) {
        throw new Error("Internal Server Error");
      }

      throw new Error(await response.text());
    }

    const responseData = await response.json();
    return [true, responseData];
  } catch (error: any) {
    console.debug(`:x: API ERR [${endpoint}] =====> `, error.message);
    throw new Error(error.message);
  }
};
