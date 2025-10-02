export type UIStrings = Record<string, string>;

export async function loadUIStrings(locale: string): Promise<UIStrings> {
    // @ts-ignore
    const mod = await import(`../data/i18n/${locale}.json`, { assert: { type: "json" } });
    return mod.default as UIStrings;
}

export async function loadContent<T = unknown>(locale: string, file: string): Promise<T> {
    // @ts-ignore
    const mod = await import(`../data/${locale}/${file}.json`, { assert: { type: "json" } });
    return mod.default as T;
}