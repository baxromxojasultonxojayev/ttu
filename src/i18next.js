import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next'


i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    whiteList: ["en", "ru", "uz"],
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: "/locales/{{lng}}.json",
    }
  })

  export default i18next;