"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { getSpaContent } from "@/lib/siteContent";

export default function Page() {
  const { locale } = useLanguage();
  const spa = getSpaContent(locale);

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={t(locale, {
            ru: "SPA и термальные источники",
            en: "SPA & thermal springs",
            zh: "SPA 与温泉热源",
          })}
          title={t(locale, {
            ru: "Термальная вода, спокойный ритм и отдых в любое время года",
            en: "Thermal water, a calm rhythm, and rest in any season",
            zh: "温泉热水、舒缓节奏，以及四季皆宜的放松体验",
          })}
          description={t(locale, {
            ru: "Термальные бассейны, SPA-процедуры и тёплая атмосфера для спокойного восстановления.",
            en: "Thermal pools, SPA treatments, and a warm atmosphere for calm recovery.",
            zh: "温泉泳池、SPA 护理与温暖氛围，为身心带来安静修复。",
          })}
          image="/images/hero-main.png"
          chips={[
            t(locale, { ru: "Термальные бассейны", en: "Thermal pools", zh: "温泉泳池" }),
            t(locale, { ru: "SPA-сценарии", en: "SPA plans", zh: "SPA 方案" }),
            t(locale, { ru: "Можно приехать на день", en: "Available for a day visit", zh: "可当天往返" }),
          ]}
          actions={[
            {
              href: "/#spa",
              label: t(locale, { ru: "Смотреть блок на главной", en: "View on the homepage", zh: "查看首页版块" }),
            },
            {
              href: "/#contacts",
              label: t(locale, { ru: "Записаться", en: "Book a visit", zh: "预约体验" }),
              variant: "secondary",
            },
          ]}
        />

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-4" data-reveal>
              {spa.pools.map((pool) => (
                <div
                  key={pool.name}
                  className="window-motion rounded-[30px] border border-[#ead7c8] bg-white/82 p-7 shadow-[0_18px_50px_rgba(89,65,40,0.08)]"
                >
                  <p className="title-font text-3xl text-[#1f2837]">{pool.name}</p>
                  <p className="mt-4 text-base leading-8 text-[#5d5550]">{pool.desc}</p>
                </div>
              ))}
            </div>

            <div className="sputnik-light-card overflow-hidden rounded-[34px]" data-reveal>
              <div className="relative h-[420px]">
                <Image
                  src="/images/hero-spa.jpg"
                  alt={t(locale, { ru: "SPA и термальный бассейн", en: "SPA and thermal pool", zh: "SPA 与温泉泳池" })}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/68">
                    {t(locale, { ru: "Ключевое впечатление", en: "Key impression", zh: "核心体验" })}
                  </p>
                  <p className="title-font mt-2 text-4xl leading-tight">
                    {t(locale, {
                      ru: "Вода, пар и чувство, что всё собрано за вас",
                      en: "Water, steam, and the feeling that everything is already arranged for you",
                      zh: "水汽、温度，以及一切都已为您安排好的安心感",
                    })}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 p-7 md:grid-cols-2">
                {[
                  t(locale, { ru: "Чистота и контроль воды", en: "Cleanliness and water control", zh: "洁净与水质管理" }),
                  t(locale, {
                    ru: "Спокойный ритм без перегруза",
                    en: "A calm rhythm without overload",
                    zh: "不过度打扰的舒缓节奏",
                  }),
                  t(locale, {
                    ru: "Сценарии с проживанием и без",
                    en: "Formats with or without accommodation",
                    zh: "可搭配住宿，也可单独体验",
                  }),
                  t(locale, { ru: "Тепло и отдых в любое время года", en: "Warmth and rest in every season", zh: "四季皆宜的温暖与放松" }),
                ].map((item) => (
                  <div key={item} className="window-motion rounded-[22px] border border-[#ead7c8] bg-[#fff8f2] px-4 py-4 text-sm text-[#5d5550]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="window-motion mt-10 rounded-[34px] border border-[#ead7c8] bg-[#f8efe6] p-8 shadow-[0_20px_60px_rgba(89,65,40,0.06)]"
            data-reveal
          >
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                {t(locale, { ru: "Частые вопросы", en: "FAQ", zh: "常见问题" })}
              </p>
              <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837]">
                {t(locale, { ru: "Коротко и по делу", en: "Short and clear", zh: "简洁明了" })}
              </h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {spa.faq.map((item) => (
                <div key={item.q} className="window-motion rounded-[24px] border border-[#ead7c8] bg-white/82 p-5">
                  <p className="font-semibold text-[#2d2420]">{item.q}</p>
                  <p className="mt-3 text-sm leading-7 text-[#665a53]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
