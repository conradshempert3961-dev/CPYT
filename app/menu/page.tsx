"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { pubMenu, restaurantMenu, type MenuCategory } from "@/lib/menuData";
import { site } from "@/lib/siteData";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

const price = (v: number) => `${v.toLocaleString("ru-RU")} ₽`;

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  const start = window.scrollY;
  const diff = y - start;
  const dur = 700;
  const t0 = performance.now();

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, start + diff * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border border-[#ca8450] bg-[linear-gradient(135deg,#d49358,#b76b32)] text-white shadow-[0_18px_40px_rgba(183,107,50,0.22)]"
          : "border border-[#e2cdb9] bg-white/78 text-[#5e4a3a] hover:border-[#d0a67e] hover:bg-[#fff7f0]"
      }`}
      type="button"
    >
      {children}
    </button>
  );
}

export default function MenuPage() {
  const [tab, setTab] = useState<"restaurant" | "pub">("restaurant");
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("");
  const listRef = useRef<HTMLDivElement | null>(null);

  const raw: MenuCategory[] = useMemo(
    () => (tab === "restaurant" ? restaurantMenu : pubMenu),
    [tab]
  );

  const filtered: MenuCategory[] = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return raw;
    return raw
      .map((c) => ({
        ...c,
        items: c.items.filter((it) =>
          normalize(`${it.name} ${it.note ?? ""}`).includes(nq)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [q, raw]);

  useEffect(() => {
    const first = filtered[0]?.id;
    setActiveCat(first ?? "");
  }, [tab]);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-cat]")
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0)
          );
        const top = vis[0]?.target as HTMLElement | undefined;
        const id = top?.dataset.cat;
        if (id) setActiveCat(id);
      },
      {
        root: null,
        rootMargin: "-120px 0px -60% 0px",
        threshold: [0, 0.1, 0.25],
      }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [filtered]);

  const cats = filtered.length ? filtered : raw;

  return (
    <SiteShell>
      <main className="min-h-screen" id="top">
        <PageHero
          eyebrow="Меню"
          title="Меню ресторана и паба с блюдами на каждый вкус"
          description="Основные позиции ресторана и паба, понятные категории и быстрый поиск по меню."
          image="/images/gallery_05.jpg"
          chips={["Ресторан «Спутник»", "Паб «Берлога»", site.restaurant.hours, site.pub.hours]}
          actions={[
            { href: "/restaurant", label: "Вернуться в ресторан" },
            { href: "/#contacts", label: "Забронировать стол", variant: "secondary" },
          ]}
        />

        <section className="sputnik-paper">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
            <div
              className="window-motion rounded-[34px] border border-[#ead7c8] bg-white/84 p-5 shadow-[0_24px_70px_rgba(89,65,40,0.08)] backdrop-blur sm:p-6"
              data-reveal
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <TabButton
                    active={tab === "restaurant"}
                    onClick={() => setTab("restaurant")}
                  >
                    Ресторан
                  </TabButton>
                  <TabButton active={tab === "pub"} onClick={() => setTab("pub")}>
                    Паб
                  </TabButton>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="relative">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Поиск по блюдам…"
                      className="w-full rounded-2xl border border-[#e1ccb8] bg-[#fff9f4] px-4 py-3 text-sm text-[#2b211c] placeholder:text-[#9f8a7a] outline-none transition focus:border-[#c98a53] md:w-[360px]"
                    />
                    {q ? (
                      <button
                        type="button"
                        onClick={() => setQ("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[#e1ccb8] bg-white px-2 py-1 text-xs text-[#7f6a5b] hover:bg-[#fff7f0]"
                        aria-label="Очистить"
                      >
                        ✕
                      </button>
                    ) : null}
                  </div>

                  <Link
                    href="/#contacts"
                    className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Забронировать стол
                  </Link>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2" data-reveal>
                {(cats.length ? cats : raw).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => scrollToId(c.id)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      activeCat === c.id
                        ? "border-[#ca8450] bg-[linear-gradient(135deg,#d49358,#b76b32)] text-white shadow-[0_14px_34px_rgba(183,107,50,0.18)]"
                        : "border-[#e2cdb9] bg-white/76 text-[#675446] hover:border-[#d1a57d] hover:bg-[#fff7f0]"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            <div ref={listRef} className="mt-10 space-y-8">
          {filtered.length === 0 ? (
                <div
                  className="window-motion rounded-[32px] border border-[#ead7c8] bg-white/84 p-8 text-center shadow-[0_22px_60px_rgba(89,65,40,0.08)]"
                  data-reveal
                >
                  <div className="title-font text-3xl text-[#1f2837]">Ничего не нашли</div>
                  <p className="mt-3 text-[#675a52]">Попробуйте другой запрос или очистите поиск.</p>
              <button
                onClick={() => setQ("")}
                    className="btn-lux mt-5 rounded-2xl border border-[#e0c9b4] bg-[#fff8f2] px-4 py-2 text-sm font-semibold text-[#624b39]"
              >
                Очистить поиск
              </button>
                </div>
          ) : (
            filtered.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                data-cat={cat.id}
                    className="window-motion rounded-[32px] border border-[#ead7c8] bg-white/84 shadow-[0_22px_60px_rgba(89,65,40,0.08)]"
                data-reveal
              >
                  <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-8">
                    <h2 className="title-font text-3xl text-[#1f2837] md:text-4xl">
                    {cat.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => scrollToId("top")}
                      className="hidden md:inline-flex rounded-full border border-[#e0c9b4] bg-[#fff8f2] px-3 py-1.5 text-xs font-semibold text-[#6b5748] hover:bg-[#fff3e8]"
                  >
                    Наверх
                  </button>
                </div>

                  <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <div className="divide-y divide-[#efe3d8]">
                    {cat.items.map((it) => (
                      <div
                        key={`${cat.id}-${it.name}`}
                        className="flex items-start justify-between gap-6 py-4"
                      >
                        <div className="min-w-0">
                            <div className="text-base font-semibold text-[#2b211c] md:text-lg">
                            {it.name}
                          </div>
                            <div className="mt-1 text-sm text-[#7d6f65]">
                            {it.weight ? it.weight : ""}
                            {it.note ? ` • ${it.note}` : ""}
                          </div>
                        </div>
                          <div className="whitespace-nowrap text-base font-extrabold text-[#2b211c] md:text-lg">
                          {price(it.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))
          )}
            </div>

            <div
              className="window-motion mt-10 flex flex-col gap-5 rounded-[34px] border border-[#ead7c8] bg-[#f8efe6] p-6 shadow-[0_20px_60px_rgba(89,65,40,0.06)] md:flex-row md:items-center md:justify-between md:p-8"
              data-reveal
            >
              <div>
                <div className="title-font text-3xl text-[#1f2837] md:text-4xl">
              Хотите уточнить по меню или забронировать стол?
            </div>
                <p className="mt-3 text-[#675a52]">Ответим быстро и по делу: по меню, бронированию и формату вечера.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.telegramHref}
                  target="_blank"
                  className="btn-lux rounded-2xl bg-[color:var(--dark-blue)] px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Написать в Telegram
                </a>
                <a
                  href={site.maxHref}
                  target="_blank"
                  className="btn-lux rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Написать в MAX
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
