"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/lib/i18n";
import { getSiteContent } from "@/lib/siteContent";

function resolveHref(pathname: string, href: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

export default function Header() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const site = getSiteContent(locale);
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "#accommodation", label: t(locale, { ru: "Проживание", en: "Stay", zh: "住宿" }) },
    {
      href: "#spa",
      label: t(locale, {
        ru: "SPA и термальные источники",
        en: "SPA & thermal springs",
        zh: "SPA 与温泉热源",
      }),
    },
    { href: "/menu", label: t(locale, { ru: "Меню", en: "Menu", zh: "菜单" }) },
    { href: "#restaurant", label: t(locale, { ru: "Ресторан", en: "Dining", zh: "餐饮" }) },
    { href: "#territory", label: t(locale, { ru: "Территория", en: "Grounds", zh: "园区" }) },
    { href: "#contacts", label: t(locale, { ru: "Контакты", en: "Contacts", zh: "联系" }) },
  ];

  const bookLabel = t(locale, {
    ru: "Забронировать",
    en: "Book now",
    zh: "立即预订",
  });
  const menuLabel = t(locale, {
    ru: "Меню",
    en: "Menu",
    zh: "菜单",
  });
  const closeLabel = t(locale, {
    ru: "Закрыть",
    en: "Close",
    zh: "关闭",
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-[1280px] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-[#0d1426]/78 px-4 py-3 shadow-[0_24px_80px_rgba(3,8,20,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href={pathname === "/" ? "#top" : "/"} className="min-w-0">
              <BrandLogo />
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={resolveHref(pathname, item.href)}
                  className="text-sm font-medium text-white/82 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <LanguageSwitcher compact />
              <a
                href={`tel:${site.bookingPhones[1].tel}`}
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                {site.bookingPhones[1].display}
              </a>
              <Link
                href={resolveHref(pathname, "#contacts")}
                className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-3 text-sm font-semibold text-white"
              >
                {bookLabel}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white lg:hidden"
            >
              {open ? closeLabel : menuLabel}
            </button>
          </div>
        </div>
      </div>

      {open ? (
          <div className="mx-auto mt-3 max-w-[1280px] px-4 sm:px-6 lg:px-8 lg:hidden">
          <div className="rounded-[28px] border border-white/10 bg-[#0d1426]/92 p-4 shadow-[0_24px_80px_rgba(3,8,20,0.3)] backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              <div className="mb-2">
                <LanguageSwitcher compact />
              </div>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={resolveHref(pathname, item.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/88"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={resolveHref(pathname, "#contacts")}
                onClick={() => setOpen(false)}
                className="btn-lux mt-2 inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-4 py-3 text-sm font-semibold text-white"
              >
                {bookLabel}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
