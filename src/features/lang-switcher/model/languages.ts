import { LANGUAGES } from "@/shared/constants/languages";

type LanguageType = (typeof LANGUAGES)[keyof typeof LANGUAGES];
type Languages = {
  label: string;
  value: LanguageType;
};

export const languages: Languages[] = [
  {
    label: "English",
    value: LANGUAGES.EN,
  },
  {
    label: "Русский",
    value: LANGUAGES.RU,
  },
];
