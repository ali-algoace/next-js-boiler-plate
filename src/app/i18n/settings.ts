export const fallbackLng = "en";
export const defaultNS = "translation";
export const cookieName = "i18next";
export const languages = [
  { code: "en", label: "English", icon: "🇬🇧" },
  { code: "es", label: "Spanish", icon: "🇪🇸" },
  // other language
];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages.map((l) => l.code),
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
