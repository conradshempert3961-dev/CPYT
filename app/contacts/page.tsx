"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { getSiteContent } from "@/lib/siteContent";

export default function Page() {
  const { locale } = useLanguage();
  const site = getSiteContent(locale);

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={t(locale, { ru: "Контакты", en: "Contacts", zh: "联系" })}
          title={t(locale, {
            ru: "Все способы связи собраны в одном аккуратном экране",
            en: "All contact options are gathered on one clean screen",
            zh: "所有联系方式都集中在一个清晰页面里",
          })}
          description={t(locale, {
            ru: "Тёмный hero, светлая рабочая часть, крупные карточки и быстрый переход к реальному действию.",
            en: "A dark hero, a light working area, large cards, and a quick path to action.",
            zh: "深色首屏、浅色信息区、大卡片布局，以及快速行动入口。",
          })}
          image="/images/gallery_02.jpg"
          chips={[
            t(locale, { ru: "Бронирование", en: "Booking", zh: "预订" }),
            "Telegram",
            t(locale, { ru: "Маршрут", en: "Route", zh: "路线" }),
            "E-mail",
          ]}
          actions={[
            {
              href: `tel:${site.bookingPhones[0].tel}`,
              label: t(locale, { ru: "Позвонить сейчас", en: "Call now", zh: "立即致电" }),
            },
            {
              href: site.telegramHref,
              label: t(locale, {
                ru: "Написать в Telegram",
                en: "Write on Telegram",
                zh: "通过 Telegram 联系",
              }),
              variant: "secondary",
            },
          ]}
        />

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6" data-reveal>
              <div className="window-motion rounded-[32px] border border-[#ead7c8] bg-white/84 p-7 shadow-[0_22px_60px_rgba(89,65,40,0.08)]">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                  {t(locale, { ru: "Бронирование", en: "Booking", zh: "预订" })}
                </p>
                <div className="mt-4 space-y-3">
                  {site.bookingPhones.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`} className="block text-2xl font-semibold text-[#1f1a17]">
                      {phone.display}
                    </a>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-[#665a53]">
                  {t(locale, {
                    ru: "Подскажем по проживанию, термальным источникам, формату отдыха и доступности на ваши даты.",
                    en: "We'll help with accommodation, thermal springs, the right stay format, and availability for your dates.",
                    zh: "我们会协助您确认住宿、温泉热源体验、度假形式以及所选日期的可用情况。",
                  })}
                </p>
              </div>

              <div className="window-motion rounded-[32px] border border-[#ead7c8] bg-[#f8efe6] p-7 shadow-[0_18px_40px_rgba(89,65,40,0.06)]">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                  {t(locale, { ru: "Адрес и почта", en: "Address and email", zh: "地址与邮箱" })}
                </p>
                <p className="mt-4 text-base leading-8 text-[#5d5550]">{site.address}</p>
                <p className="mt-3 text-base text-[#5d5550]">
                  E-mail:{" "}
                  <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </p>
                <p className="mt-3 text-base text-[#5d5550]">
                  {t(locale, { ru: "Сайт", en: "Website", zh: "网站" })}:{" "}
                  <a className="underline underline-offset-4" href={site.siteUrl} target="_blank" rel="noreferrer">
                    {site.siteUrl}
                  </a>
                </p>
              </div>
            </div>

            <div
              className="window-motion overflow-hidden rounded-[34px] border border-[#ead7c8] bg-white/84 p-3 shadow-[0_24px_70px_rgba(89,65,40,0.08)]"
              data-reveal
            >
              <div className="overflow-hidden rounded-[28px]">
                <iframe
                  title={t(locale, {
                    ru: "Яндекс Карта — Спутник Камчатка",
                    en: "Yandex Map — Sputnik Kamchatka",
                    zh: "Yandex 地图 — Sputnik Kamchatka",
                  })}
                  src="https://yandex.ru/map-widget/v1/?mode=search&text=%D0%9A%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BA%D1%80%D0%B0%D0%B9%2C%20%D0%BF.%20%D0%9F%D0%B0%D1%80%D0%B0%D1%82%D1%83%D0%BD%D0%BA%D0%B0%2C%20%D1%83%D0%BB.%20%D0%95%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%2039&z=14"
                  width="100%"
                  height="420"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className="grid gap-3 p-5 md:grid-cols-2">
                <a
                  href="https://yandex.ru/maps/?rtext=~%D0%9A%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BA%D1%80%D0%B0%D0%B9%2C%20%D0%BF.%20%D0%9F%D0%B0%D1%80%D0%B0%D1%82%D1%83%D0%BD%D0%BA%D0%B0%2C%20%D1%83%D0%BB.%20%D0%95%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%2039&rtt=auto"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-4 text-base font-semibold text-white"
                >
                  {t(locale, { ru: "Построить маршрут", en: "Build route", zh: "规划路线" })}
                </a>
                <Link
                  href={site.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lux inline-flex items-center justify-center rounded-2xl border border-[#d6b08d] bg-white/78 px-5 py-4 text-base font-semibold text-[#624b39]"
                >
                  {t(locale, {
                    ru: "Написать администратору",
                    en: "Message the administrator",
                    zh: "联系管理员",
                  })}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
