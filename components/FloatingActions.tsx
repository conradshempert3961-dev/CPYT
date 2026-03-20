"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { getSiteContent } from "@/lib/siteContent";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const { locale } = useLanguage();
  const site = getSiteContent(locale);

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="floating-card"
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.94 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[292px] rounded-[28px] border border-[#e8d8ca] bg-[#fffaf6] p-4 text-[#241811] shadow-[0_24px_70px_rgba(8,13,25,0.18)]"
          >
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0.92, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.08, duration: 0.3 }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f0cfaa,#b96f35)] text-lg font-semibold text-white shadow-lg"
              >
                СК
              </motion.div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.28em] text-[#8d694c]">
                  {t(locale, {
                    ru: "Контактный центр",
                    en: "Contact desk",
                    zh: "联络中心",
                  })}
                </p>
                <p className="mt-1 text-[1.05rem] font-semibold leading-6 text-[#1f1a17]">
                  {t(locale, {
                    ru: "Поможем собрать отдых",
                    en: "We'll help shape your stay",
                    zh: "帮您安排完整度假体验",
                  })}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-[#6d5b50]">
                  {t(locale, {
                    ru: "Подберём формат проживания, термальные источники и питание так, чтобы всё сложилось в один понятный сценарий.",
                    en: "We'll match accommodation, thermal springs, and dining into one clear plan.",
                    zh: "我们会把住宿、温泉热源体验和餐饮安排成一套清晰的度假方案。",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-[#eadbce] pt-4">
              <a className="block text-[1.15rem] font-semibold tracking-[0.02em] text-[#1f1a17]" href={`tel:${site.bookingPhones[1].tel}`}>
                {site.bookingPhones[1].display}
              </a>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contacts"
                  className="btn-lux inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#d49358,#b76b32)] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  {t(locale, {
                    ru: "Связаться с нами",
                    en: "Contact us",
                    zh: "联系我们",
                  })}
                </Link>
                <Link
                  href={site.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lux inline-flex items-center justify-center rounded-full border border-[#d7c1ad] px-4 py-2.5 text-sm font-semibold text-[#3f2c1f]"
                >
                  Telegram
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t(locale, {
          ru: open ? "Закрыть контакты" : "Открыть контакты",
          en: open ? "Close contacts" : "Open contacts",
          zh: open ? "关闭联系方式" : "打开联系方式",
        })}
        animate={
          open
            ? { rotate: 180, scale: 1 }
            : {
                y: [0, -5, 0],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 18px 40px rgba(183,107,50,0.35)",
                  "0 24px 52px rgba(183,107,50,0.48)",
                  "0 18px 40px rgba(183,107,50,0.35)",
                ],
              }
        }
        transition={
          open
            ? { duration: 0.28 }
            : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
        className="btn-lux flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d49358,#b76b32)] text-base font-semibold text-white shadow-[0_18px_40px_rgba(183,107,50,0.35)]"
      >
        {open ? "×" : "СК"}
      </motion.button>
    </div>
  );
}
