"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

const gallery = [
  { src: "/images/gallery_01.jpg", key: "pool_evening" },
  { src: "/images/gallery_02.jpg", key: "pool_near_building" },
  { src: "/images/gallery_03.jpg", key: "spa_zone" },
  { src: "/images/gallery_04.jpg", key: "pub" },
  { src: "/images/gallery_05.jpg", key: "restaurant" },
  { src: "/images/gallery_08.jpg", key: "grounds" },
  { src: "/images/room.jpg", key: "room" },
  { src: "/images/cottage-living.jpg", key: "cottage_inside" },
  { src: "/images/cottage-exterior.jpg", key: "cottage_outside" },
];

export default function GalleryPage() {
  const { locale } = useLanguage();

  const altText = {
    pool_evening: t(locale, { ru: "Вечерний бассейн", en: "Evening pool", zh: "夜间泳池" }),
    pool_near_building: t(locale, { ru: "Бассейн у корпуса", en: "Pool by the main building", zh: "主楼旁泳池" }),
    spa_zone: t(locale, { ru: "SPA-зона", en: "SPA area", zh: "SPA 区域" }),
    pub: t(locale, { ru: "Паб", en: "Pub", zh: "酒吧" }),
    restaurant: t(locale, { ru: "Ресторан", en: "Restaurant", zh: "餐厅" }),
    grounds: t(locale, { ru: "Территория комплекса", en: "Resort grounds", zh: "度假村园区" }),
    room: t(locale, { ru: "Номер", en: "Room", zh: "客房" }),
    cottage_inside: t(locale, { ru: "Коттедж", en: "Cottage", zh: "别墅小屋" }),
    cottage_outside: t(locale, { ru: "Коттедж снаружи", en: "Cottage exterior", zh: "别墅外观" }),
  } as const;

  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow={t(locale, { ru: "Галерея", en: "Gallery", zh: "图库" })}
          title={t(locale, {
            ru: "Фотографии атмосферы, термальных источников и проживания",
            en: "Photos of the atmosphere, thermal springs, and accommodation",
            zh: "度假氛围、温泉热源体验与住宿照片",
          })}
          description={t(locale, {
            ru: "Главные виды комплекса: термальные источники, номера, коттеджи, ресторан и территория в одном обзоре.",
            en: "The main views of the resort: thermal springs, rooms, cottages, restaurant, and grounds in one overview.",
            zh: "用一页总览展示度假村的温泉热源体验、客房、别墅小屋、餐饮和园区景观。",
          })}
          image="/images/gallery_01.jpg"
          chips={[
            t(locale, { ru: "Номера", en: "Rooms", zh: "客房" }),
            t(locale, { ru: "Коттеджи", en: "Cottages", zh: "别墅小屋" }),
            t(locale, { ru: "Термальные источники", en: "Thermal springs", zh: "温泉热源" }),
            t(locale, { ru: "Ресторан", en: "Dining", zh: "餐饮" }),
            t(locale, { ru: "Территория", en: "Grounds", zh: "园区" }),
          ]}
          actions={[
            {
              href: "/#accommodation",
              label: t(locale, { ru: "Смотреть проживание", en: "View stay options", zh: "查看住宿" }),
            },
            {
              href: "/#spa",
              label: t(locale, { ru: "Открыть SPA", en: "Open SPA", zh: "查看 SPA" }),
              variant: "secondary",
            },
          ]}
        />

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gallery.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={`window-motion overflow-hidden rounded-[30px] border border-[#ead7c8] bg-white/84 shadow-[0_18px_50px_rgba(89,65,40,0.08)] ${
                  index % 4 === 0 ? "xl:col-span-2" : ""
                }`}
                data-reveal
              >
                <div className={`relative ${index % 4 === 0 ? "h-[360px]" : "h-[300px]"}`}>
                  <Image src={image.src} alt={altText[image.key as keyof typeof altText]} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
