"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { getSiteContent } from "@/lib/siteContent";

export default function Footer() {
  const { locale } = useLanguage();
  const site = getSiteContent(locale);

  return (
    <footer className="border-t border-white/10 bg-[#09111f]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 py-8 text-sm text-white/62 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="title-font text-2xl tracking-[0.12em] text-[#f0d0ad]">СПУТНИК</p>
          <p className="mt-2 max-w-xl leading-7">{site.address}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/#accommodation" className="transition hover:text-white">
            {t(locale, { ru: "Проживание", en: "Stay", zh: "住宿" })}
          </Link>
          <Link href="/#spa" className="transition hover:text-white">
            {t(locale, {
              ru: "SPA и термальные источники",
              en: "SPA & thermal springs",
              zh: "SPA 与温泉热源",
            })}
          </Link>
          <Link href="/menu" className="transition hover:text-white">
            {t(locale, { ru: "Меню", en: "Menu", zh: "菜单" })}
          </Link>
          <Link href="/#restaurant" className="transition hover:text-white">
            {t(locale, { ru: "Ресторан", en: "Dining", zh: "餐饮" })}
          </Link>
          <Link href="/#contacts" className="transition hover:text-white">
            {t(locale, { ru: "Контакты", en: "Contacts", zh: "联系" })}
          </Link>
        </div>
      </div>
    </footer>
  );
}
