import { LANGUAGES } from "@/shared/constants/languages";

type Language = LANGUAGES;

export const languages: Record<Language, { nativeName: string }> = {
  en: { nativeName: "English" },
  ru: { nativeName: "Русский" },
};
