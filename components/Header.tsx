"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/siteData";

const nav = [
  { href: "#accommodation", label: "Проживание" },
  { href: "#spa", label: "SPA и термы" },
  { href: "/menu", label: "Меню" },
  { href: "#restaurant", label: "Ресторан" },
  { href: "#territory", label: "Территория" },
  { href: "#contacts", label: "Контакты" },
];

function resolveHref(pathname: string, href: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-[#0d1426]/78 px-4 py-3 shadow-[0_24px_80px_rgba(3,8,20,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href={pathname === "/" ? "#top" : "/"} className="min-w-0">
              <p className="title-font text-2xl tracking-[0.16em] text-[#f0d0ad] sm:text-[2.1rem]">СПУТНИК</p>
              <p className="text-[10px] uppercase tracking-[0.42em] text-white/45 sm:text-[11px]">Камчатка</p>
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
                Забронировать
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white lg:hidden"
            >
              {open ? "Закрыть" : "Меню"}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-[1400px] px-4 sm:px-6 lg:px-8 lg:hidden">
          <div className="rounded-[28px] border border-white/10 bg-[#0d1426]/92 p-4 shadow-[0_24px_80px_rgba(3,8,20,0.3)] backdrop-blur-xl">
            <div className="flex flex-col gap-2">
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
                Забронировать
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
