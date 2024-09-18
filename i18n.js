import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";


/* 


const enTranslations = {


  welcomeMessage: "ENGLISH",
  instructions: "ENGLISH todo Real People.\nRandomly Selected.\nCompeting in Olympic Sports",


};

const frTranslations = {
  welcomeMessage: "FRANCE ",
  instructions: "Click here to see intruction",
}; */





i18n
.use(initReactI18next)
.use(LanguageDetector)
.use(Backend)
.init({
    /* 
  resources: {
    en: { translation: enTranslations },
    fr: { translation: frTranslations },
  }, */
 /*  lng: "en", */
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to the translation files
  },
  
});

export default i18n;
