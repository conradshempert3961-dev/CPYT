"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { pubMenu, restaurantMenu, type MenuCategory } from "@/lib/menuData";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import { useLanguage } from "@/components/LanguageProvider";
import { Locale, t } from "@/lib/i18n";
import { getSiteContent } from "@/lib/siteContent";

function formatPrice(locale: Locale, value: number) {
  const localeCode = locale === "ru" ? "ru-RU" : locale === "en" ? "en-US" : "zh-CN";

  return new Intl.NumberFormat(localeCode, {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

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

  const ease = (value: number) => 1 - Math.pow(1 - value, 3);

  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, start + diff * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function getCategoryTitle(locale: Locale, id: string, fallback: string) {
  const translatedTitles: Partial<Record<string, string>> = {
    cold: t(locale, { ru: "Холодные закуски", en: "Cold starters", zh: "冷前菜" }),
    salads: t(locale, { ru: "Салаты", en: "Salads", zh: "沙拉" }),
    hot: t(locale, { ru: "Горячие закуски", en: "Hot starters", zh: "热前菜" }),
    bruschetta: t(locale, { ru: "Брускетты", en: "Bruschetta", zh: "意式烤面包" }),
    soups: t(locale, { ru: "Супы", en: "Soups", zh: "汤品" }),
    sea: t(locale, { ru: "Рыбные блюда и морепродукты", en: "Fish & seafood", zh: "鱼类与海鲜" }),
    meat: t(locale, { ru: "Мясные блюда", en: "Meat dishes", zh: "肉类菜品" }),
    pasta: t(locale, { ru: "Пельмени и пасты", en: "Dumplings & pasta", zh: "饺子与意面" }),
    sides: t(locale, { ru: "Гарниры", en: "Sides", zh: "配菜" }),
    desserts: t(locale, { ru: "Десерты", en: "Desserts", zh: "甜点" }),
    ice: t(locale, { ru: "Мороженое", en: "Ice cream", zh: "冰淇淋" }),
    "pub-cold": t(locale, { ru: "Холодные закуски", en: "Cold starters", zh: "冷前菜" }),
    "pub-salads": t(locale, { ru: "Салаты", en: "Salads", zh: "沙拉" }),
    "pub-hot": t(locale, { ru: "Горячие закуски", en: "Hot starters", zh: "热前菜" }),
    "pub-burger": t(locale, { ru: "Бургер", en: "Burger", zh: "汉堡" }),
    "pub-sea": t(locale, { ru: "Морепродукты", en: "Seafood", zh: "海鲜" }),
    "pub-meat": t(locale, { ru: "Мясные блюда", en: "Meat dishes", zh: "肉类菜品" }),
    "pub-sides": t(locale, { ru: "Гарниры", en: "Sides", zh: "配菜" }),
    "pub-soups": t(locale, { ru: "Супы", en: "Soups", zh: "汤品" }),
    "pub-dumplings": t(locale, { ru: "Пельмени", en: "Dumplings", zh: "饺子" }),
    "pub-pizza": t(locale, { ru: "Пицца", en: "Pizza", zh: "披萨" }),
    "pub-desserts": t(locale, { ru: "Десерты", en: "Desserts", zh: "甜点" }),
    bar: t(locale, { ru: "Напитки", en: "Drinks", zh: "饮品" }),
  };

  return translatedTitles[id] ?? fallback;
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
  const { locale } = useLanguage();
  const site = getSiteContent(locale);
  const [tab, setTab] = useState<"restaurant" | "pub">("restaurant");
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("");
  const listRef = useRef<HTMLDivElement | null>(null);

  const raw: MenuCategory[] = useMemo(() => (tab === "restaurant" ? restaurantMenu : pubMenu), [tab]);

  const filtered: MenuCategory[] = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return raw;

    return raw
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => normalize(`${item.name} ${item.note ?? ""}`).includes(nq)),
      }))
      .filter((category) => category.items.length > 0);
  }, [q, raw]);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-cat]"));
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));

        const top = visible[0]?.target as HTMLElement | undefined;
        const id = top?.dataset.cat;
        if (id) setActiveCat(id);
      },
      {
        root: null,
        rootMargin: "-120px 0px -60% 0px",
        threshold: [0, 0.1, 0.25],
      }
    );

    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [filtered]);

  const cats = filtered.length ? filtered : raw;
  const currentActiveCat = cats.some((category) => category.id === activeCat) ? activeCat : (cats[0]?.id ?? "");

  return (
    <SiteShell>
      <main className="min-h-screen" id="top">
        <PageHero
          eyebrow={t(locale, { ru: "Меню", en: "Menu", zh: "菜单" })}
          title={t(locale, {
            ru: "Меню ресторана и паба с блюдами на каждый вкус",
            en: "Restaurant and pub menus with dishes for every mood",
            zh: "餐厅与酒吧菜单，满足不同口味",
          })}
          description={t(locale, {
            ru: "Основные позиции ресторана и паба, понятные категории и быстрый поиск по меню.",
            en: "Key items from the restaurant and pub, clear categories, and fast menu search.",
            zh: "餐厅与酒吧的核心菜品、清晰的分类，以及快速菜单检索。",
          })}
          image="/images/gallery_05.jpg"
          chips={[site.restaurant.name, site.pub.name, site.restaurant.hours, site.pub.hours]}
          actions={[
            { href: "/restaurant", label: t(locale, { ru: "Вернуться в ресторан", en: "Back to dining", zh: "返回餐饮页" }) },
            {
              href: "/#contacts",
              label: t(locale, { ru: "Забронировать стол", en: "Reserve a table", zh: "预订餐桌" }),
              variant: "secondary",
            },
          ]}
        />

        <section className="sputnik-paper">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
            <div
              className="window-motion rounded-[34px] border border-[#ead7c8] bg-white/84 p-5 shadow-[0_24px_70px_rgba(89,65,40,0.08)] backdrop-blur sm:p-6"
              data-reveal
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <TabButton
                    active={tab === "restaurant"}
                    onClick={() => {
                      setTab("restaurant");
                      setActiveCat(restaurantMenu[0]?.id ?? "");
                    }}
                  >
                    {t(locale, { ru: "Ресторан", en: "Restaurant", zh: "餐厅" })}
                  </TabButton>
                  <TabButton
                    active={tab === "pub"}
                    onClick={() => {
                      setTab("pub");
                      setActiveCat(pubMenu[0]?.id ?? "");
                    }}
                  >
                    {t(locale, { ru: "Паб", en: "Pub", zh: "酒吧" })}
                  </TabButton>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="relative">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={t(locale, {
                        ru: "Поиск по блюдам...",
                        en: "Search dishes...",
                        zh: "搜索菜品...",
                      })}
                      className="w-full rounded-2xl border border-[#e1ccb8] bg-[#fff9f4] px-4 py-3 text-sm text-[#2b211c] placeholder:text-[#9f8a7a] outline-none transition focus:border-[#c98a53] md:w-[360px]"
                    />
                    {q ? (
                      <button
                        type="button"
                        onClick={() => setQ("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[#e1ccb8] bg-white px-2 py-1 text-xs text-[#7f6a5b] hover:bg-[#fff7f0]"
                        aria-label={t(locale, { ru: "Очистить", en: "Clear", zh: "清除" })}
                      >
                        ✕
                      </button>
                    ) : null}
                  </div>

                  <Link
                    href="/#contacts"
                    className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-3 text-sm font-semibold text-white"
                  >
                    {t(locale, { ru: "Забронировать стол", en: "Reserve a table", zh: "预订餐桌" })}
                  </Link>
                </div>
              </div>

              {locale !== "ru" ? (
                <p className="mt-4 text-sm leading-7 text-[#7d6f65]">
                  {t(locale, {
                    ru: "",
                    en: "Dish names are kept in the original menu wording to match the kitchen card.",
                    zh: "菜名保留菜单原始表述，以便与厨房实际菜单一致。",
                  })}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2" data-reveal>
                {(cats.length ? cats : raw).map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setActiveCat(category.id);
                      scrollToId(category.id);
                    }}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      currentActiveCat === category.id
                        ? "border-[#ca8450] bg-[linear-gradient(135deg,#d49358,#b76b32)] text-white shadow-[0_14px_34px_rgba(183,107,50,0.18)]"
                        : "border-[#e2cdb9] bg-white/76 text-[#675446] hover:border-[#d1a57d] hover:bg-[#fff7f0]"
                    }`}
                  >
                    {getCategoryTitle(locale, category.id, category.title)}
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
                  <div className="title-font text-3xl text-[#1f2837]">
                    {t(locale, { ru: "Ничего не нашли", en: "Nothing found", zh: "没有找到结果" })}
                  </div>
                  <p className="mt-3 text-[#675a52]">
                    {t(locale, {
                      ru: "Попробуйте другой запрос или очистите поиск.",
                      en: "Try another query or clear the search.",
                      zh: "请尝试其他关键词或清除搜索条件。",
                    })}
                  </p>
                  <button
                    onClick={() => setQ("")}
                    className="btn-lux mt-5 rounded-2xl border border-[#e0c9b4] bg-[#fff8f2] px-4 py-2 text-sm font-semibold text-[#624b39]"
                  >
                    {t(locale, { ru: "Очистить поиск", en: "Clear search", zh: "清除搜索" })}
                  </button>
                </div>
              ) : (
                filtered.map((category) => (
                  <section
                    key={category.id}
                    id={category.id}
                    data-cat={category.id}
                    className="window-motion rounded-[32px] border border-[#ead7c8] bg-white/84 shadow-[0_22px_60px_rgba(89,65,40,0.08)]"
                    data-reveal
                  >
                    <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-8">
                      <h2 className="title-font text-3xl text-[#1f2837] md:text-4xl">
                        {getCategoryTitle(locale, category.id, category.title)}
                      </h2>
                      <button
                        type="button"
                        onClick={() => scrollToId("top")}
                        className="hidden md:inline-flex rounded-full border border-[#e0c9b4] bg-[#fff8f2] px-3 py-1.5 text-xs font-semibold text-[#6b5748] hover:bg-[#fff3e8]"
                      >
                        {t(locale, { ru: "Наверх", en: "Top", zh: "返回顶部" })}
                      </button>
                    </div>

                    <div className="px-6 pb-6 md:px-8 md:pb-8">
                      <div className="divide-y divide-[#efe3d8]">
                        {category.items.map((item) => (
                          <div key={`${category.id}-${item.name}`} className="flex items-start justify-between gap-6 py-4">
                            <div className="min-w-0">
                              <div className="text-base font-semibold text-[#2b211c] md:text-lg">{item.name}</div>
                              <div className="mt-1 text-sm text-[#7d6f65]">
                                {item.weight ? item.weight : ""}
                                {item.note ? ` • ${item.note}` : ""}
                              </div>
                            </div>
                            <div className="whitespace-nowrap text-base font-extrabold text-[#2b211c] md:text-lg">
                              {formatPrice(locale, item.price)}
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
                  {t(locale, {
                    ru: "Хотите уточнить по меню или забронировать стол?",
                    en: "Want to ask about the menu or reserve a table?",
                    zh: "想咨询菜单或预订餐桌吗？",
                  })}
                </div>
                <p className="mt-3 text-[#675a52]">
                  {t(locale, {
                    ru: "Ответим быстро и по делу: по меню, бронированию и формату вечера.",
                    en: "We'll reply quickly and clearly about the menu, booking, and the evening format.",
                    zh: "我们会快速而清楚地回复您关于菜单、预订和晚间安排的问题。",
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.telegramHref}
                  target="_blank"
                  className="btn-lux rounded-2xl bg-[color:var(--dark-blue)] px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  {t(locale, { ru: "Написать в Telegram", en: "Write on Telegram", zh: "通过 Telegram 联系" })}
                </a>
                <a
                  href={site.maxHref}
                  target="_blank"
                  className="btn-lux rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  {t(locale, { ru: "Написать в MAX", en: "Write on MAX", zh: "通过 MAX 联系" })}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
