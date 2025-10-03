// utils/i18n.ts
export type Messages = Record<string, string>;

const uiModules = import.meta.glob<Messages>("../data/i18n/*.json", {
  eager: true,
  import: "default",
});

console.log("[i18n] glob keys:", Object.keys(uiModules))

const LOCALES: Record<string, Messages> = Object.fromEntries(
  Object.entries(uiModules).map(([p, mod]) => {
    const m = p.match(/\.{1,2}\/data\/i18n\/([A-Za-z-]+)\.json$/);
    const code = m?.[1];
    // DEBUG: mapear archivo -> código
    console.log("[i18n] map:", p, "->", code);
    return [code!, mod as Messages];
  }),
);

console.log("[i18n] available locales:", Object.keys(LOCALES));

export const SUPPORTED_LOCALES = Object.keys(LOCALES);
export const DEFAULT_LOCALE =
  SUPPORTED_LOCALES.includes("en") ? "en" : SUPPORTED_LOCALES[0] ?? "en";

export function loadUIStrings(locale: string): Messages {
  const effective = LOCALES[locale] ? locale : DEFAULT_LOCALE;
  // DEBUG: cuál locale se usó finalmente
  console.log("[i18n] loadUIStrings locale:", locale, "->", effective);
  return LOCALES[effective] ?? {};
}
