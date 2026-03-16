import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { site } from "@/lib/siteData";

export default function Page() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Контакты"
          title="Все способы связи собраны в одном аккуратном экране"
          description="Для внутренней страницы контактов сохранил тот же стиль: тёмный hero, светлая рабочая часть, крупные карточки и быстрый переход к реальному действию."
          image="/images/gallery_02.jpg"
          chips={["Бронирование", "Telegram", "Маршрут", "E-mail"]}
          actions={[
            { href: `tel:${site.bookingPhones[0].tel}`, label: "Позвонить сейчас" },
            { href: site.telegramHref, label: "Написать в Telegram", variant: "secondary" },
          ]}
        />

        <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6" data-reveal>
              <div className="window-motion rounded-[32px] border border-[#ead7c8] bg-white/84 p-7 shadow-[0_22px_60px_rgba(89,65,40,0.08)]">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Бронирование</p>
                <div className="mt-4 space-y-3">
                  {site.bookingPhones.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`} className="block text-2xl font-semibold text-[#1f1a17]">
                      {phone.display}
                    </a>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-[#665a53]">
                  Подскажем по проживанию, термам, формату отдыха и доступности на ваши даты.
                </p>
              </div>

              <div className="window-motion rounded-[32px] border border-[#ead7c8] bg-[#f8efe6] p-7 shadow-[0_18px_40px_rgba(89,65,40,0.06)]">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Адрес и почта</p>
                <p className="mt-4 text-base leading-8 text-[#5d5550]">{site.address}</p>
                <p className="mt-3 text-base text-[#5d5550]">
                  E-mail:{" "}
                  <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </p>
                <p className="mt-3 text-base text-[#5d5550]">
                  Сайт:{" "}
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
                  title="Яндекс Карта — Спутник Камчатка"
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
                  Построить маршрут
                </a>
                <Link
                  href={site.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lux inline-flex items-center justify-center rounded-2xl border border-[#d6b08d] bg-white/78 px-5 py-4 text-base font-semibold text-[#624b39]"
                >
                  Написать администратору
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
