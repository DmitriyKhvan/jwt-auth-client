import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: true,
    supportedLngs: ["en", "ru"],
    nonExplicitSupportedLngs: true,
    fallbackLng: "en",
    load: "languageOnly",

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    ns: ["auth"],
    // defaultNS: "auth",
  });
