import Image from "next/image";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { accommodation } from "@/lib/siteData";

export default function Page() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Проживание"
          title="Номера, категории и коттеджи в едином премиальном сценарии"
          description="Светлые номера, улучшенные категории и коттеджи для спокойного отдыха в Паратунке."
          image="/images/cottage-living.jpg"
          chips={["Номера в корпусах", "Улучшенные категории", "Коттеджи для семьи и компании"]}
          actions={[
            { href: "/#accommodation", label: "Вернуться к обзору на главной" },
            { href: "/#contacts", label: "Проверить даты", variant: "secondary" },
          ]}
        />

        <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="sputnik-light-card overflow-hidden rounded-[34px]" data-reveal>
              <div className="relative h-[380px]">
                <Image src="/images/room.jpg" alt="Номер с видом" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/65">Главный кадр</p>
                  <p className="title-font mt-2 text-4xl">Размещение с тёплой и спокойной атмосферой</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4" data-reveal>
              <div className="window-motion rounded-[30px] border border-[#ead7c8] bg-white/82 p-7 shadow-[0_22px_60px_rgba(89,65,40,0.09)]">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Атмосфера</p>
                <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837]">Выберите свой ритм отдыха</h2>
                <p className="mt-4 text-base leading-8 text-[#5d5550]">
                  Здесь легко сравнить номера, улучшенные категории и коттеджи, чтобы сразу понять, какой вариант
                  лучше подойдёт для пары, семьи или компании.
                </p>
              </div>

              <div className="window-motion rounded-[30px] border border-[#ead7c8] bg-[#f8efe6] p-7 shadow-[0_18px_40px_rgba(89,65,40,0.06)]">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Что внутри</p>
                <div className="mt-4 grid gap-3">
                  {[
                    "Крупные фотографии категорий",
                    "Быстрый переход к датам и доступности",
                    "Номера и коттеджи в одном обзоре",
                    "Понятный выбор для пары, семьи и компании",
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
