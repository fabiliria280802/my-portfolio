import i18next from 'https://deno.land/x/i18next/index.js';
import Backend from 'https://deno.land/x/i18next_fs_backend/index.js';

await i18next
  .use(Backend)
  .init({
    lng: 'en', // Idioma por defecto
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

export default i18next;
