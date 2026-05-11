import { LANGUAGES } from "@/shared/constants/languages";

type Languages = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const languages: Record<Languages, { nativeName: string }> = {
  en: { nativeName: "English" },
  ru: { nativeName: "Русский" },
};
