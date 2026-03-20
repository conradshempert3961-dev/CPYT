"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { getRestaurantContent, getSiteContent } from "@/lib/siteContent";

export default function Page() {
  const { locale } = useLanguage();
  const restaurant = getRestaurantContent(locale);
  const site = getSiteContent(locale);
  const gallery = ["/images/gallery_05.jpg", "/images/gallery_04.jpg"];

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={t(locale, { ru: "Ресторан и паб", en: "Restaurant & pub", zh: "餐厅与酒吧" })}
          title={t(locale, {
            ru: "Два гастрономических формата в одной спокойной истории отдыха",
            en: "Two dining formats inside one calm holiday story",
            zh: "两种餐饮形式，融入同一段宁静度假体验",
          })}
          description={t(locale, {
            ru: "Мягкий свет, крупные кадры, атмосферные карточки и быстрый переход к бронированию.",
            en: "Soft light, large visuals, atmospheric cards, and quick access to booking.",
            zh: "柔和光影、大幅画面、氛围卡片，以及快速预订入口。",
          })}
          image="/images/gallery_05.jpg"
          chips={[
            site.restaurant.name,
            site.pub.name,
            t(locale, {
              ru: "Ужин без лишней логистики",
              en: "Dinner without extra logistics",
              zh: "无需额外奔波的晚餐体验",
            }),
          ]}
          actions={[
            { href: "/menu", label: t(locale, { ru: "Открыть меню", en: "Open menu", zh: "打开菜单" }) },
            {
              href: "/#contacts",
              label: t(locale, { ru: "Забронировать стол", en: "Reserve a table", zh: "预订餐桌" }),
              variant: "secondary",
            },
          ]}
        />

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {restaurant.blocks.map((block, index) => (
              <article key={block.title} className="sputnik-light-card overflow-hidden rounded-[34px]" data-reveal>
                <div className="relative h-72">
                  <Image src={gallery[index] ?? gallery[0]} alt={block.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <p className="title-font text-4xl text-[#1f2837]">{block.title}</p>
                  <p className="mt-4 text-base leading-8 text-[#5d5550]">{block.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="window-motion rounded-full border border-[#e0c9b4] bg-[#fff8f2] px-4 py-2 text-sm text-[#634d3c]">
                      {index === 0 ? site.restaurant.hours : site.pub.hours}
                    </span>
                    <span className="window-motion rounded-full border border-[#e0c9b4] bg-[#fff8f2] px-4 py-2 text-sm text-[#634d3c]">
                      {index === 0 ? site.restaurant.phoneDisplay : site.pub.phoneDisplay}
                    </span>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/menu"
                      className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-4 text-base font-semibold text-white"
                    >
                      {t(locale, { ru: "Смотреть меню", en: "View menu", zh: "查看菜单" })}
                    </Link>
                    <Link
                      href="/#contacts"
                      className="btn-lux inline-flex items-center justify-center rounded-2xl border border-[#d6b08d] bg-white/76 px-5 py-4 text-base font-semibold text-[#624b39]"
                    >
                      {t(locale, { ru: "Уточнить бронь", en: "Check booking", zh: "确认预订" })}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
