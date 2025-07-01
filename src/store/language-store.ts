import { getCookie, setCookie } from "cookies-next";
import { create } from "zustand";
import { cookieName } from "@/app/i18n/settings";
import { ILanguageStore } from "@/types/store/langauges-store";

export const useLanguageStore = create<ILanguageStore>((set) => ({
  language: (getCookie(cookieName) as string) || "en",
  setLanguage: (language) => {
    setCookie(cookieName, language);
    set(() => ({ language }));
  },
}));
