import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

let S3_BUCKET_CDN_BASE_URL =
  import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
  process.env.VITE_S3_BUCKET_CDN_BASE_URL;




async function fetchGeoIPLanguage() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    

    const data = await response.json();

    console.log("GeoIP Response:", )
    console.log(data);

    if (data && data.country_code) {
      const countryToLanguage = {
        US: "en",
        RS: "sr",
        ME: "sr",
      };


      // this geoIP should run only once.  Store detected language in localStorage
      const detectedLanguage = countryToLanguage[data.country_code] || "en";
      localStorage.setItem("i18nextLng", detectedLanguage);




      return countryToLanguage[data.country_code] || "en";
    }
  } catch (error) {
    console.error("GeoIP lookup failed:", error);
  }
  return "en";
}

async function detectLanguage() {
  // First check localStorage, navigator, etc.

  const detectedLanguage = localStorage.getItem("i18nextLng");

  if (detectedLanguage) {
    return detectedLanguage;
  }

  // check GeoIP
  return await fetchGeoIPLanguage();

  // this detects, based on Accept-Language header. we may not need this right now
  // navigator?.languages[0] ||
  // navigator.language;
}

export const i18nPromise = detectLanguage().then((language) =>


 

  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      /*   lng: localStorage.getItem("i18nextLng") || navigator.languages[0] || "sr", */

      lng: language,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to the translation files

        // loadPath: 'https://randolympics.fra1.digitaloceanspaces.com/locales/{{lng}}/{{ns}}.json', // Path to the translation files
        //  crossDomain: true
      },
    })

  );



 







export default i18n;
