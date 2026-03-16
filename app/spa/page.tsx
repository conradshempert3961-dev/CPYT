import Image from "next/image";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { spa } from "@/lib/siteData";

export default function Page() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="SPA и термы"
          title="Термальная вода, спокойный ритм и отдых в любое время года"
          description="Термальные бассейны, SPA-процедуры и тёплая атмосфера для спокойного восстановления."
          image="/images/hero-main.png"
          chips={["Термальные бассейны", "SPA-сценарии", "Можно приехать на день"]}
          actions={[
            { href: "/#spa", label: "Смотреть блок на главной" },
            { href: "/#contacts", label: "Записаться", variant: "secondary" },
          ]}
        />

        <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
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
                <Image src="/images/hero-spa.jpg" alt="SPA и термальный бассейн" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/68">Ключевое впечатление</p>
                  <p className="title-font mt-2 text-4xl leading-tight">Вода, пар и чувство, что всё собрано за вас</p>
                </div>
              </div>
              <div className="grid gap-4 p-7 md:grid-cols-2">
                {[
                  "Чистота и контроль воды",
                  "Спокойный ритм без перегруза",
                  "Сценарии с проживанием и без",
                  "Тепло и отдых в любое время года",
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
              <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Частые вопросы</p>
              <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837]">Коротко и по делу</h2>
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
