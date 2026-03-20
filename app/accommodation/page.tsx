"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { getAccommodationContent } from "@/lib/siteContent";

export default function Page() {
  const { locale } = useLanguage();
  const accommodation = getAccommodationContent(locale);

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={t(locale, { ru: "Проживание", en: "Stay", zh: "住宿" })}
          title={t(locale, {
            ru: "Номера, категории и коттеджи в едином премиальном сценарии",
            en: "Rooms, categories, and cottages in one premium stay",
            zh: "客房、房型与别墅小屋，一站式高品质入住体验",
          })}
          description={t(locale, {
            ru: "Светлые номера, улучшенные категории и коттеджи для спокойного отдыха в Паратунке.",
            en: "Bright rooms, upgraded categories, and cottages for a calm stay in Paratunka.",
            zh: "明亮客房、升级房型和别墅小屋，适合在帕拉通卡享受安静放松的入住体验。",
          })}
          image="/images/cottage-living.jpg"
          chips={[
            t(locale, { ru: "Номера в корпусах", en: "Rooms in the main buildings", zh: "主楼客房" }),
            t(locale, { ru: "Улучшенные категории", en: "Upgraded categories", zh: "升级房型" }),
            t(locale, {
              ru: "Коттеджи для семьи и компании",
              en: "Cottages for families and groups",
              zh: "适合家庭和团体的别墅小屋",
            }),
          ]}
          actions={[
            {
              href: "/#accommodation",
              label: t(locale, {
                ru: "Вернуться к обзору на главной",
                en: "Back to the main overview",
                zh: "返回首页总览",
              }),
            },
            {
              href: "/#contacts",
              label: t(locale, { ru: "Проверить даты", en: "Check dates", zh: "查看日期" }),
              variant: "secondary",
            },
          ]}
        />

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="sputnik-light-card overflow-hidden rounded-[34px]" data-reveal>
              <div className="relative h-[380px]">
                <Image
                  src="/images/room.jpg"
                  alt={t(locale, { ru: "Номер с видом", en: "Room with a view", zh: "景观客房" })}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/65">
                    {t(locale, { ru: "Главный кадр", en: "Main frame", zh: "主视觉" })}
                  </p>
                  <p className="title-font mt-2 text-4xl">
                    {t(locale, {
                      ru: "Размещение с тёплой и спокойной атмосферой",
                      en: "Accommodation with a warm and calm atmosphere",
                      zh: "温暖而安静的入住氛围",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4" data-reveal>
              <div className="window-motion rounded-[30px] border border-[#ead7c8] bg-white/82 p-7 shadow-[0_22px_60px_rgba(89,65,40,0.09)]">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                  {t(locale, { ru: "Атмосфера", en: "Atmosphere", zh: "氛围" })}
                </p>
                <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837]">
                  {t(locale, {
                    ru: "Выберите свой ритм отдыха",
                    en: "Choose your pace of rest",
                    zh: "选择适合自己的度假节奏",
                  })}
                </h2>
                <p className="mt-4 text-base leading-8 text-[#5d5550]">
                  {t(locale, {
                    ru: "Здесь легко сравнить номера, улучшенные категории и коттеджи, чтобы сразу понять, какой вариант лучше подойдёт для пары, семьи или компании.",
                    en: "Here it's easy to compare rooms, upgraded categories, and cottages to understand what fits a couple, a family, or a group.",
                    zh: "在这里可以轻松比较客房、升级房型和别墅小屋，快速判断哪种更适合情侣、家庭或团体。",
                  })}
                </p>
              </div>

              <div className="window-motion rounded-[30px] border border-[#ead7c8] bg-[#f8efe6] p-7 shadow-[0_18px_40px_rgba(89,65,40,0.06)]">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                  {t(locale, { ru: "Что внутри", en: "What's inside", zh: "页面内容" })}
                </p>
                <div className="mt-4 grid gap-3">
                  {[
                    t(locale, { ru: "Крупные фотографии категорий", en: "Large category photos", zh: "大幅房型照片" }),
                    t(locale, {
                      ru: "Быстрый переход к датам и доступности",
                      en: "Quick access to dates and availability",
                      zh: "快速查看日期与可订情况",
                    }),
                    t(locale, {
                      ru: "Номера и коттеджи в одном обзоре",
                      en: "Rooms and cottages in one overview",
                      zh: "客房与别墅小屋一页总览",
                    }),
                    t(locale, {
                      ru: "Понятный выбор для пары, семьи и компании",
                      en: "Clear choice for couples, families, and groups",
                      zh: "适合情侣、家庭和团体的清晰选择",
                    }),
                  ].map((item) => (
                    <div key={item} className="window-motion rounded-[20px] border border-[#e4cdb8] bg-white/80 px-4 py-4 text-sm text-[#5d5550]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {accommodation.buildings.map((building, idx) => {
              const images = ["/images/room-standard.jpg", "/images/room.jpg"];

              return (
                <article key={building.name} className="sputnik-light-card overflow-hidden rounded-[32px]" data-reveal>
                  <div className="relative h-56">
                    <Image src={images[idx] ?? "/images/room-standard.jpg"} alt={building.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>
                  <div className="p-7">
                    <p className="title-font text-3xl text-[#1f2837]">{building.name}</p>
                    <div className="mt-5 space-y-3">
                      {building.items.map((item) => (
                        <div key={item.name} className="window-motion rounded-[22px] border border-[#ead7c8] bg-[#fff8f2] p-4">
                          <p className="font-semibold text-[#2d2420]">{item.name}</p>
                          <p className="mt-2 text-sm leading-7 text-[#665a53]">{item.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}

            <article className="sputnik-light-card overflow-hidden rounded-[32px]" data-reveal>
              <div className="relative h-56">
                <Image src="/images/cottage-exterior.jpg" alt={accommodation.cottages.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <div className="p-7">
                <p className="title-font text-3xl text-[#1f2837]">{accommodation.cottages.name}</p>
                <div className="mt-5 space-y-3">
                  {accommodation.cottages.items.map((item) => (
                    <div key={item.name} className="window-motion rounded-[22px] border border-[#ead7c8] bg-[#fff8f2] p-4">
                      <p className="font-semibold text-[#2d2420]">{item.name}</p>
                      <p className="mt-2 text-sm leading-7 text-[#665a53]">{item.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
