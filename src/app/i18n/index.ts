/* eslint-disable @typescript-eslint/no-explicit-any */
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng: string | undefined, ns: string | undefined) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: any, namespace: any) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(
  lng: string | readonly string[] | null | undefined,
  ns?: string | any[] | undefined,
  options?: { keyPrefix: string }
) {
  const i18nextInstance = await initI18next(lng as string, ns as string);
  return {
    t: i18nextInstance.getFixedT(
      lng as string,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix ? options.keyPrefix : ""
    ),
    i18n: i18nextInstance,
  };
}
