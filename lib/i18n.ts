export const locales = ["ru", "en", "zh"] as const;

export type Locale = (typeof locales)[number];

export type LocalizedValue<T> = Record<Locale, T>;

export const localeMeta: Record<
  Locale,
  { shortLabel: string; nativeLabel: string; htmlLang: string }
> = {
  ru: { shortLabel: "RU", nativeLabel: "Русский", htmlLang: "ru" },
  en: { shortLabel: "EN", nativeLabel: "English", htmlLang: "en" },
  zh: { shortLabel: "中文", nativeLabel: "中文", htmlLang: "zh-CN" },
};

export function t<T>(locale: Locale, value: LocalizedValue<T>): T {
  return value[locale];
}
