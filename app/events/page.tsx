import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { events } from "@/lib/siteData";

export default function Page() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="События и форматы"
          title="Праздники, заезды и частные события в спокойной атмосфере Паратунки"
          description="Соберём проживание, ужин, термы и пространство под ваш формат мероприятия."
          image="/images/cottage-exterior.jpg"
          chips={["Частные даты", "Корпоративные заезды", "Семейные сценарии"]}
          actions={[
            { href: "/#contacts", label: "Оставить заявку" },
            { href: "/#restaurant", label: "Посмотреть ресторан", variant: "secondary" },
          ]}
        />

        <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
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
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Финальный шаг</p>
                <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837]">Нужен формат под вашу дату и бюджет?</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#5d5550]">
                  Подскажем, как собрать проживание, ресторан и термы в одну цельную программу без лишней логистики.
                </p>
              </div>
              <Link
                href="/#contacts"
                className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-6 py-4 text-base font-semibold text-white"
              >
                Обсудить событие
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
