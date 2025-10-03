// utils/content.ts
import { DEFAULT_LOCALE } from "./i18n.ts";
export type Content = unknown;

const contentModules = import.meta.glob<Record<string, unknown>>(
  "../data/*/*.json",
  { eager: true, import: "default" },
);

// DEBUG: llaves encontradas por el glob
console.log("[content] glob keys:", Object.keys(contentModules));

const INDEX: Record<string, Record<string, Content>> = {};
for (const [p, mod] of Object.entries(contentModules)) {
  const m = p.match(/\.{1,2}\/data\/([^/]+)\/([^/]+)\.json$/);
  if (!m) {
    console.warn("[content] path did not match expected pattern:", p);
    continue;
  }
  const [, locale, key] = m;
  INDEX[locale] ??= {};
  INDEX[locale][key] = mod as Content;
  // DEBUG: mapeo archivo -> (locale,key)
  console.log("[content] map:", p, "->", locale, key);
}

// DEBUG: resumen de locales disponibles y sus keys
for (const [loc, map] of Object.entries(INDEX)) {
  console.log("[content] locale:", loc, "keys:", Object.keys(map));
}

export async function loadContent(locale: string, key: string): Promise<Content> {
  const exact = INDEX[locale]?.[key];
  if (exact != null) {
    console.log("[content] HIT:", locale, key);
    return exact;
  }
  const fallback = INDEX[DEFAULT_LOCALE]?.[key];
  if (fallback != null) {
    console.warn("[content] MISS -> FALLBACK:", locale, "->", DEFAULT_LOCALE, key);
    return fallback;
  }
  console.error("[content] MISS and NO FALLBACK:", locale, key);
  return {};
}

