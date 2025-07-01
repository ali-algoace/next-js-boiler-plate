// === STORE TYPES ===

export interface ILanguageStore {
  language: string;
  setLanguage: (payload: string) => void;
}
