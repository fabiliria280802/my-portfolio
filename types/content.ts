// /types/content.ts
export type Messages = Record<string, string>;
export type Content = unknown; // o pon aquí la forma real de tu JSON si quieres más seguridad

export interface LoadContent {
  (locale: string, key: string): Promise<Content>;
}
