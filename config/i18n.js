const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en', // Default language if none is detected
    preload: ['en', 'sr'], // Preload supported languages
    backend: {
      loadPath: './locales/{{lng}}.json', // Path to translation files
    },
  });

module.exports = i18next;
