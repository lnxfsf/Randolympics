import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";


let S3_BUCKET_CDN_BASE_URL =
import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
process.env.VITE_S3_BUCKET_CDN_BASE_URL;







i18n
.use(initReactI18next)
.use(LanguageDetector)
.use(Backend)
.init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: `${S3_BUCKET_CDN_BASE_URL}/locales/{{lng}}/{{ns}}.json`, // Path to the translation files
  },
  
});

export default i18n;
