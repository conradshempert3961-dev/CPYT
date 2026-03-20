"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { localeMeta, locales, t } from "@/lib/i18n";

export default function LanguageSwitcher({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { locale, setLocale } = useLanguage();
  const label = t(locale, {
    ru: "Язык",
    en: "Language",
    zh: "语言",
  });

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-white/12 bg-white/6 p-1 backdrop-blur ${
        compact ? "" : "shadow-[0_14px_40px_rgba(3,8,20,0.18)]"
      }`}
      aria-label={label}
      role="group"
    >
      {locales.map((item) => {
        const active = item === locale;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            aria-pressed={active}
            title={localeMeta[item].nativeLabel}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
              active
                ? "bg-[linear-gradient(135deg,#d49358,#b76b32)] text-white shadow-[0_10px_24px_rgba(183,107,50,0.26)]"
                : "text-white/72 hover:bg-white/8 hover:text-white"
            }`}
          >
            {localeMeta[item].shortLabel}
          </button>
        );
      })}
    </div>
  );
}
