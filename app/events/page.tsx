"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { getEventsContent } from "@/lib/siteContent";

export default function Page() {
  const { locale } = useLanguage();
  const events = getEventsContent(locale);

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={t(locale, { ru: "События и форматы", en: "Events & formats", zh: "活动与场景" })}
          title={t(locale, {
            ru: "Праздники, заезды и частные события в спокойной атмосфере Паратунки",
            en: "Celebrations, stays, and private events in Paratunka's calm atmosphere",
            zh: "在帕拉通卡安静氛围中举办庆典、入住活动与私人事件",
          })}
          description={t(locale, {
            ru: "Соберём проживание, ужин, термальные источники и пространство под ваш формат мероприятия.",
            en: "We'll combine accommodation, dinner, thermal springs, and space for your event format.",
            zh: "我们会把住宿、晚餐、温泉热源体验和活动空间组合成适合您的活动方案。",
          })}
          image="/images/cottage-exterior.jpg"
          chips={[
            t(locale, { ru: "Частные даты", en: "Private dates", zh: "私人活动" }),
            t(locale, { ru: "Корпоративные заезды", en: "Corporate stays", zh: "企业团体" }),
            t(locale, { ru: "Семейные сценарии", en: "Family plans", zh: "家庭场景" }),
          ]}
          actions={[
            {
              href: "/#contacts",
              label: t(locale, { ru: "Оставить заявку", en: "Send request", zh: "提交申请" }),
            },
            {
              href: "/#restaurant",
              label: t(locale, { ru: "Посмотреть ресторан", en: "View dining", zh: "查看餐饮" }),
              variant: "secondary",
            },
          ]}
        />

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {events.items.map((item, index) => (
              <article
                key={item.title}
                className={`sputnik-light-card overflow-hidden rounded-[34px] ${index === 1 ? "md:-translate-y-4" : ""}`}
                data-reveal
              >
                <div className="relative h-64">
                  <Image
                    src={index === 0 ? "/images/gallery_08.jpg" : index === 1 ? "/images/gallery_05.jpg" : "/images/hero-main.png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
                </div>
                <div className="p-7">
                  <p className="title-font text-3xl text-[#1f2837]">{item.title}</p>
                  <p className="mt-4 text-base leading-8 text-[#5d5550]">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div
            className="window-motion mt-10 rounded-[34px] border border-[#ead7c8] bg-[#f8efe6] p-8 shadow-[0_20px_60px_rgba(89,65,40,0.06)]"
            data-reveal
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                  {t(locale, { ru: "Финальный шаг", en: "Final step", zh: "最后一步" })}
                </p>
                <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837]">
                  {t(locale, {
                    ru: "Нужен формат под вашу дату и бюджет?",
                    en: "Need the right format for your date and budget?",
                    zh: "想按您的日期和预算定制方案？",
                  })}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#5d5550]">
                  {t(locale, {
                    ru: "Подскажем, как собрать проживание, ресторан и термальные источники в одну цельную программу без лишней логистики.",
                    en: "We'll help combine accommodation, dining, and thermal springs into one smooth program without extra logistics.",
                    zh: "我们会帮您把住宿、餐饮和温泉热源体验整合成一套顺畅方案，无需额外奔波。",
                  })}
                </p>
              </div>
              <Link
                href="/#contacts"
                className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-6 py-4 text-base font-semibold text-white"
              >
                {t(locale, { ru: "Обсудить событие", en: "Discuss the event", zh: "沟通活动需求" })}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
