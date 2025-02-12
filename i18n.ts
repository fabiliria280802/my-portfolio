import i18next from 'https://deno.land/x/i18next/index.js';
import i18nextMiddleware from "https://deno.land/x/i18next_http_middleware/index.js";

import translationPt from "./locales/pt/translation.json" with { type: "json" };
import translationDe from "./locales/de/translation.json" with { type: "json" };
import translationFi from "./locales/fi/translation.json" with { type: "json" };
import transformerEs from "./locales/es/translation.json" with { type: "json" };
import transformerEn from "./locales/en/translation.json" with { type: "json" };
import transformerFr from "./locales/fr/translation.json" with { type: "json" };

const resources = {
  pt: { translation: translationPt },
  de: { translation: translationDe },
  fi: { translation: translationFi },
  es: { translation: transformerEs },
  en: { translation: transformerEn },
  fr: { translation: transformerFr }
};
  
  await i18next.init({
    lng: 'en', // Idioma por defecto
    fallbackLng: 'en',
    debug: true,
    resources,
    preload: ["en", "es", "fi", "de", "fr", "pt"],
  });

const i18n = i18next;
const handle = i18nextMiddleware.handle(i18next);

export default i18n;
export { handle };