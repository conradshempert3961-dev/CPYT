"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowTopRightOnSquareIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  FireIcon,
  HomeModernIcon,
  MapPinIcon,
  PhoneIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { site } from "@/lib/siteData";
import FloatingActions from "@/components/FloatingActions";

type Hotspot = {
  id: string;
  title: string;
  caption: string;
  description: string;
  stat: string;
  details: string[];
  left: string;
  top: string;
  align?: "left" | "right";
  icon: JSX.Element;
};

type StayCard = {
  id: string;
  label: string;
  intro: string;
  title: string;
  description: string;
  sideText: string;
  badges: string[];
  features: string[];
  note: string;
  gallery: { src: string; alt: string }[];
};

type PoolStory = {
  id: string;
  title: string;
  description: string;
  short: string;
  image: string;
  alt: string;
};

type HeroInfoPanel = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  description: string;
  accent: string;
  icon: JSX.Element;
};

const navItems = [
  { href: "#accommodation", label: "Проживание" },
  { href: "#spa", label: "SPA и термы" },
  { href: "#restaurant", label: "Ресторан" },
  { href: "#territory", label: "Территория" },
  { href: "#contacts", label: "Контакты" },
];

const heroStats = [
  {
    label: "2 корпуса",
    text: "Номера и улучшенные категории",
    icon: <BuildingOffice2Icon className="h-5 w-5" />,
  },
  {
    label: "Коттеджи и номера",
    text: "Для пары, семьи и компании",
    icon: <HomeModernIcon className="h-5 w-5" />,
  },
  {
    label: "3 термальных бассейна",
    text: "Тепло на территории комплекса",
    icon: <FireIcon className="h-5 w-5" />,
  },
  {
    label: "Ресторан и паб",
    text: "Ужин и вечер без выездов",
    icon: <BuildingStorefrontIcon className="h-5 w-5" />,
  },
];

const heroHotspots: Hotspot[] = [
  {
    id: "hotel",
    title: "Гостиница",
    caption: "2 корпуса и несколько категорий размещения",
    description: "Комфортные номера, улучшенные категории и понятный сервис без лишних шагов.",
    stat: "Корпуса: 2",
    details: ["Стандартные номера", "Улучшенные категории", "Быстрое заселение"],
    left: "36%",
    top: "28%",
    align: "right",
    icon: <BuildingOffice2Icon className="h-5 w-5" />,
  },
  {
    id: "pool",
    title: "Термальный бассейн",
    caption: "Тёплая вода и SPA рядом с проживанием",
    description: "Открытые термы, расслабляющий ритм и сценарий отдыха без логистики.",
    stat: "Температура: 38.5°C",
    details: ["3 бассейна", "SPA-процедуры", "Можно приехать на день"],
    left: "22%",
    top: "63%",
    icon: <FireIcon className="h-5 w-5" />,
  },
  {
    id: "restaurant",
    title: "Ресторан и паб",
    caption: "Два формата питания прямо на территории",
    description: "Спокойный ужин, меню на каждый день и вечерний формат без поездок по Паратунке.",
    stat: "Форматов: 2",
    details: ["Ресторан «Спутник»", "Паб «Берлога»", "Бронь столика заранее"],
    left: "12%",
    top: "46%",
    icon: <BuildingStorefrontIcon className="h-5 w-5" />,
  },
  {
    id: "cottages",
    title: "Коттеджи",
    caption: "Отдельный формат для семьи и компании",
    description: "Больше приватности, собственный ритм отдыха и ощущение отдельного пространства.",
    stat: "Формат: приватный",
    details: ["Для семьи и компании", "Больше пространства", "Тишина и отдельность"],
    left: "66%",
    top: "29%",
    align: "right",
    icon: <HomeModernIcon className="h-5 w-5" />,
  },
];

const heroInfoPanels: HeroInfoPanel[] = [
  {
    id: "interactive",
    eyebrow: "Территория комплекса",
    title: "Территория оживает",
    lead: "Наведите на точки, чтобы увидеть бассейны, корпуса, ресторан и коттеджи на территории комплекса.",
    description:
      "Так проще сразу понять, где находятся ключевые зоны отдыха и как удобно устроено пространство.",
    accent: "Бассейны • корпуса • ресторан • коттеджи",
    icon: <SparklesIcon className="h-5 w-5" />,
  },
  {
    id: "contact",
    eyebrow: "Быстрый контакт",
    title: "Связь без лишних шагов",
    lead: "Подбор номера, заезд, термы и ресторан можно закрыть прямо с первого экрана одним касанием.",
    description:
      "Администратор поможет быстро подобрать проживание, термы и удобный вариант бронирования.",
    accent: site.bookingPhones[0].display,
    icon: <PhoneIcon className="h-5 w-5" />,
  },
];

const stayCollections: StayCard[] = [
  {
    id: "rooms",
    label: "Номера в корпусе",
    intro: "Удобный формат для коротких и длинных заездов, когда нужен спокойный отдых с быстрым доступом ко всем зонам комплекса.",
    title: "Номера, где всё собрано без перегруза",
    description:
      "Светлые интерьеры, аккуратный сервис и простая логика отдыха: быстро заселиться, спокойно отдохнуть, выйти к бассейнам и вернуться в тишину.",
    sideText:
      "Если нужен понятный сценарий без долгих выборов, это самый удобный формат: для пары, делового заезда или уикенда в тепле.",
    badges: ["Для 1-2 гостей", "Быстрые заезды"],
    features: ["Вид на сопки", "Тихие этажи", "Рядом с термами", "Удобно для коротких поездок"],
    note: "Подскажем, какой корпус и категория подойдут именно под ваши даты и состав гостей.",
    gallery: [
      { src: "/images/room-standard.jpg", alt: "Стандартный номер" },
      { src: "/images/room.jpg", alt: "Номер с видом" },
      { src: "/images/gallery_12.jpg", alt: "Улучшенный номер" },
      { src: "/images/gallery_02.jpg", alt: "Корпус рядом с бассейном" },
    ],
  },
  {
    id: "improved",
    label: "Улучшенные категории",
    intro: "Больше воздуха, больше света и тот формат, который хочется выбирать для неспешных выходных или поездки в особом настроении.",
    title: "Категории, где появляется ощущение премиального отдыха",
    description:
      "Эти номера работают на впечатление: простор, аккуратные детали, видовые окна и ощущение, что отдых собран не просто удобно, а красиво.",
    sideText:
      "Подойдут для пары, особого повода или неспешных выходных, когда хочется больше света, простора и тишины.",
    badges: ["Для пары", "Больше пространства"],
    features: ["Панорамный свет", "Более выразительный интерьер", "Повышенный комфорт", "Подходит для особых дат"],
    note: "Можно собрать сценарий с проживанием, термами и ужином в одном бронировании.",
    gallery: [
      { src: "/images/gallery_12.jpg", alt: "Улучшенный номер с видом" },
      { src: "/images/room.jpg", alt: "Номер с балконом" },
      { src: "/images/room-standard.jpg", alt: "Номер в светлых тонах" },
      { src: "/images/gallery_03.jpg", alt: "SPA-зона рядом" },
    ],
  },
  {
    id: "cottages",
    label: "Коттеджи",
    intro: "Приватный формат для тех, кто хочет отдыхать отдельно: своей компанией, семьёй или в режиме «никто не мешает».",
    title: "Коттеджи с ощущением собственной территории",
    description:
      "Отдельный вход, больше личного пространства, спокойный ритм и ощущение, что отдых разворачивается вокруг вашей компании, а не наоборот.",
    sideText:
      "Подойдут тем, кто ценит тишину, отдельность и ощущение собственного пространства для семьи или компании.",
    badges: ["Для компании", "Приватный формат"],
    features: ["Отдельное размещение", "Подходит для семьи", "Больше свободы", "Атмосфера загородного отдыха"],
    note: "Хороший выбор для тех, кто хочет отдыхать в своём ритме и не зависеть от общего потока.",
    gallery: [
      { src: "/images/cottage-living.jpg", alt: "Гостиная в коттедже" },
      { src: "/images/cottage-exterior.jpg", alt: "Коттедж зимой" },
      { src: "/images/gallery_08.jpg", alt: "Тихая территория комплекса" },
      { src: "/images/gallery_01.jpg", alt: "Вечерний бассейн рядом с коттеджами" },
    ],
  },
];

const atmosphereCards = [
  {
    title: "Номера и коттеджи",
    text: "Разный формат размещения под короткий заезд, семейный отдых и приватный сценарий.",
    image: "/images/room.jpg",
    className: "md:translate-y-8",
  },
  {
    title: "Термальные бассейны и SPA",
    text: "Тёплая вода, процедуры и расслабляющий ритм без выездов с территории.",
    image: "/images/hero-main.png",
    className: "md:-translate-y-6",
  },
  {
    title: "Ресторан и паб",
    text: "Еда, ужин и вечерний формат прямо на месте, когда отдых не надо дробить на поездки.",
    image: "/images/gallery_04.jpg",
    className: "md:-translate-y-10",
  },
  {
    title: "Территория для отдыха",
    text: "Тишина, снег, прогулки и ощущение отдельного мира, где не нужно спешить.",
    image: "/images/gallery_08.jpg",
    className: "md:translate-y-10",
  },
  {
    title: "Сервис без суеты",
    text: "Подтверждение, ответы и организация так, чтобы гость чувствовал заботу, а не процесс.",
    image: "/images/gallery_03.jpg",
    className: "md:translate-y-4 md:col-span-2",
  },
];

const poolStories: PoolStory[] = [
  {
    id: "clean",
    title: "Чистота и контроль",
    description:
      "Мы ежедневно контролируем состояние бассейна, чистоту чаши и комфортную температуру, чтобы отдых оставался спокойным и безупречно подготовленным.",
    short: "Ежедневный уход, порядок и стабильная температура для предсказуемо приятного отдыха.",
    image: "/images/pool-layer-clean.png",
    alt: "Пустой бассейн перед подготовкой",
  },
  {
    id: "water",
    title: "Термальная вода",
    description:
      "Термальная вода создаёт то самое мягкое тепло и глубину ощущений, ради которых сюда приезжают за тишиной, расслаблением и восстановлением.",
    short: "Мягкое тепло, пар и водная среда создают ощущение глубокого расслабления и восстановления.",
    image: "/images/pool-layer-water.png",
    alt: "Слой термальной воды",
  },
  {
    id: "guests",
    title: "Что получает гость",
    description:
      "В итоге человек получает больше, чем просто купание: тепло, визуальные впечатления, эмоциональную перезагрузку и спокойный отдых, который хочется продлить.",
    short: "Перезагрузка, впечатления, спокойствие и то состояние, которым хочется делиться с близкими.",
    image: "/images/pool-layer-guests.png",
    alt: "Бассейн с гостями",
  },
];

const diningCards = [
  {
    title: site.restaurant.name,
    text: "Основной ресторан комплекса для спокойного ужина, семейных сценариев и бронирований под проживание.",
    image: "/images/gallery_05.jpg",
    hours: site.restaurant.hours,
    phone: site.restaurant.phoneDisplay,
    phoneHref: `tel:${site.restaurant.phoneTel}`,
    href: "/menu",
    action: "Открыть меню",
  },
  {
    title: site.pub.name,
    text: "Более камерный формат для вечернего настроения, компании и неформального завершения дня.",
    image: "/images/gallery_04.jpg",
    hours: site.pub.hours,
    phone: site.pub.phoneDisplay,
    phoneHref: `tel:${site.pub.phoneTel}`,
    href: "/menu",
    action: "Открыть меню",
  },
];

export default function SputnikLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [activeHeroPanel, setActiveHeroPanel] = useState<string | null>("interactive");
  const [activePoolStoryId, setActivePoolStoryId] = useState("guests");
  const [activeStayId, setActiveStayId] = useState("cottages");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const activeStay = stayCollections.find((item) => item.id === activeStayId) ?? stayCollections[0];
  const activeImage = activeStay.gallery[activeGalleryIndex] ?? activeStay.gallery[0];
  const activePoolStory = poolStories.find((item) => item.id === activePoolStoryId) ?? poolStories[1];
  const cleanPoolStory = poolStories.find((item) => item.id === "clean") ?? poolStories[0];
  const waterPoolStory = poolStories.find((item) => item.id === "water") ?? poolStories[1];
  const guestsPoolStory = poolStories.find((item) => item.id === "guests") ?? poolStories[2];

  const changeStay = (stayId: string) => {
    setActiveStayId(stayId);
    setActiveGalleryIndex(0);
  };

  return (
    <div className="relative isolate overflow-hidden bg-[#0a1324] text-white">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-white/10 bg-[#0d1426]/70 px-4 py-3 shadow-[0_24px_80px_rgba(3,8,20,0.25)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <Link href="#top" className="min-w-0">
                <p className="title-font text-2xl tracking-[0.16em] text-[#f0d0ad] sm:text-[2.1rem]">СПУТНИК</p>
                <p className="text-[10px] uppercase tracking-[0.42em] text-white/45 sm:text-[11px]">Камчатка</p>
              </Link>

              <nav className="hidden items-center gap-8 lg:flex">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm font-medium text-white/82 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <a
                  href={`tel:${site.bookingPhones[1].tel}`}
                  className="text-sm font-medium text-white/70 transition hover:text-white"
                >
                  {site.bookingPhones[1].display}
                </a>
                <Link
                  href="#contacts"
                  className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-3 text-sm font-semibold text-white"
                >
                  Забронировать
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white lg:hidden"
              >
                {menuOpen ? "Закрыть" : "Меню"}
              </button>
            </div>
          </div>
        </div>

        {menuOpen ? (
          <div className="mx-auto mt-3 max-w-[1400px] px-4 sm:px-6 lg:px-8 lg:hidden">
            <div className="rounded-[28px] border border-white/10 bg-[#0d1426]/92 p-4 shadow-[0_24px_80px_rgba(3,8,20,0.3)] backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/88"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="#contacts"
                  onClick={() => setMenuOpen(false)}
                  className="btn-lux mt-2 inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-4 py-3 text-sm font-semibold text-white"
                >
                  Забронировать
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="relative min-h-screen overflow-hidden pb-14 pt-36 sm:pb-16 sm:pt-40 lg:pt-44 xl:pt-48">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-top-real.jpg"
              alt="Спутник Камчатка зимой с видом на бассейн и горы"
              fill
              priority
              className="hero-image-motion object-cover object-[50%_58%]"
            />
            <div className="hero-glow absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(213,146,89,0.14),transparent_38%),linear-gradient(100deg,rgba(4,9,18,0.92)_15%,rgba(6,10,22,0.55)_45%,rgba(7,10,19,0.22)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08101f]/35 via-transparent to-[#08101f]/72" />
            <div className="absolute inset-0 lux-noise opacity-70" />
          </div>

          <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <div className="relative z-10 max-w-3xl xl:max-w-[760px]" data-reveal>
                <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.34em] text-white/72 backdrop-blur">
                  Всё в одном месте
                </div>
                <h1
                  className="title-font mt-6 max-w-4xl text-[2.85rem] leading-[0.98] text-white sm:text-[4.1rem] lg:text-[5.2rem]"
                  style={{ textShadow: "0 10px 30px rgba(0,0,0,0.28)" }}
                >
                  Всё в одном месте.
                  <br />
                  Тихая и тёплая Паратунка.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                  Проживание, SPA, ресторан и территория отдыха собраны в один цельный сценарий, который выглядит
                  статусно и ощущается по-настоящему удобным.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#contacts"
                    className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-6 py-4 text-base font-semibold text-white"
                  >
                    Проверить даты и доступность
                  </Link>
                  <Link
                    href="#accommodation"
                    className="btn-lux inline-flex items-center justify-center rounded-2xl border border-white/18 bg-white/8 px-6 py-4 text-base font-semibold text-white backdrop-blur"
                  >
                    Смотреть формат проживания
                  </Link>
                </div>

                <div className="mt-10 flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,360px)_minmax(0,320px)] xl:items-start">
                  <div className="sputnik-panel rounded-[30px] p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.34em] text-white/60">Сценарий бронирования</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <CalendarDaysIcon className="h-5 w-5" />
                          <span className="text-sm">Заезд</span>
                        </div>
                        <p className="mt-2 text-lg font-semibold">20 мая, пн</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <CalendarDaysIcon className="h-5 w-5" />
                          <span className="text-sm">Выезд</span>
                        </div>
                        <p className="mt-2 text-lg font-semibold">22 мая, ср</p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                      <div className="flex items-center gap-2 text-white/70">
                        <UserGroupIcon className="h-5 w-5" />
                        <span className="text-sm">Состав гостей</span>
                      </div>
                      <p className="mt-2 text-lg font-semibold">2 взрослых, 1 номер</p>
                    </div>
                    <Link
                      href="#contacts"
                      className="btn-lux mt-4 inline-flex w-full items-center justify-between rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-4 text-base font-semibold text-white"
                    >
                      Показать сценарии отдыха
                      <ChevronRightIcon className="h-5 w-5" />
                    </Link>
                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href="#accommodation"
                        className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/82"
                      >
                        Смотреть проживание
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                      <Link
                        href="#spa"
                        className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/82"
                      >
                        Смотреть SPA и термы
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="hidden xl:flex xl:w-[320px] xl:flex-col xl:gap-4">
                    {heroInfoPanels.map((panel) => {
                      const isOpen = activeHeroPanel === panel.id;

                      return (
                        <motion.div
                          layout
                          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          key={panel.id}
                        >
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onFocus={() => setActiveHeroPanel(panel.id)}
                            onClick={() => setActiveHeroPanel((current) => (current === panel.id ? null : panel.id))}
                            className={`w-full overflow-hidden rounded-[28px] border p-5 text-left backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 ${
                              isOpen
                                ? "border-[#d49358]/55 bg-[linear-gradient(180deg,rgba(212,147,88,0.18),rgba(15,25,48,0.78))] shadow-[0_28px_80px_rgba(8,14,28,0.3)]"
                                : "border-white/10 bg-white/8 hover:border-white/18 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                                  isOpen
                                    ? "border-[#f2c28d]/80 bg-[linear-gradient(135deg,#d49358,#b76b32)] text-white"
                                    : "border-white/14 bg-white/8 text-white/78"
                                }`}
                              >
                                {panel.icon}
                              </span>
                              <div className="min-w-0">
                                <p className="text-[11px] uppercase tracking-[0.32em] text-white/52">{panel.eyebrow}</p>
                                <p className="mt-1 text-lg font-semibold text-white">{panel.title}</p>
                              </div>
                              <motion.span
                                animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.06 : 1 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/72"
                              >
                                <ChevronRightIcon className="h-4 w-4" />
                              </motion.span>
                            </div>

                            <AnimatePresence initial={false}>
                              {isOpen ? (
                                <motion.div
                                  key={`${panel.id}-content`}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4">
                                    <p className="text-sm leading-6 text-white/84">{panel.lead}</p>
                                    <p className="mt-4 rounded-[20px] border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-[#f0c996]">
                                      {panel.accent}
                                    </p>
                                    <p className="mt-4 text-sm leading-6 text-white/66">{panel.description}</p>

                                    {panel.id === "contact" ? (
                                      <div className="mt-5 space-y-2">
                                        <a href={`tel:${site.bookingPhones[0].tel}`} className="block text-2xl font-semibold text-white">
                                          {site.bookingPhones[0].display}
                                        </a>
                                        <a href={`tel:${site.bookingPhones[1].tel}`} className="block text-sm text-white/70">
                                          {site.bookingPhones[1].display}
                                        </a>
                                      </div>
                                    ) : null}
                                  </div>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="relative hidden min-h-[680px] xl:block" data-reveal onMouseLeave={() => setActiveHotspot(null)}>
                {heroHotspots.map((spot) => {
                  const isActive = spot.id === activeHotspot;
                  const bubbleSide = spot.align === "right" ? "items-end text-right" : "items-start text-left";

                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onMouseEnter={() => setActiveHotspot(spot.id)}
                      onFocus={() => setActiveHotspot(spot.id)}
                      onClick={() => setActiveHotspot((current) => (current === spot.id ? null : spot.id))}
                      className={`absolute ${isActive ? "z-30" : "z-10"}`}
                      style={{ left: spot.left, top: spot.top }}
                    >
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-full border text-white shadow-[0_15px_35px_rgba(0,0,0,0.28)] transition ${
                          isActive
                            ? "border-[#f2c28d] bg-[linear-gradient(135deg,#d49358,#b76b32)]"
                            : "border-white/18 bg-[#101a2e]/70 backdrop-blur-xl"
                        }`}
                      >
                        {spot.icon}
                      </span>
                      <span className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d49358]/20 blur-2xl" />
                      <AnimatePresence>
                        {isActive ? (
                          <span
                            className={`pointer-events-none absolute top-1/2 ${spot.align === "right" ? "right-full mr-5" : "left-full ml-5"}`}
                            style={{ transform: "translateY(-50%)" }}
                          >
                            <motion.span
                              initial={{ opacity: 0, x: spot.align === "right" ? 24 : -24, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: spot.align === "right" ? 18 : -18, scale: 0.94 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className={`flex w-[300px] flex-col rounded-[28px] border border-white/14 bg-[#0f1930]/82 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl ${bubbleSide}`}
                            >
                              <span className="text-xs uppercase tracking-[0.3em] text-[#f0c996]">{spot.stat}</span>
                              <span className="title-font mt-2 text-2xl text-white">{spot.title}</span>
                              <span className="mt-2 text-sm leading-6 text-white/75">{spot.caption}</span>
                              <span className="mt-4 text-sm leading-6 text-white/64">{spot.description}</span>
                              <span className="mt-4 flex flex-wrap gap-2">
                                {spot.details.map((item) => (
                                  <span
                                    key={item}
                                    className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs text-white/80"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </span>
                            </motion.span>
                          </span>
                        ) : null}
                      </AnimatePresence>
                    </button>
                  );
                })}

              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:hidden" data-reveal>
              {heroHotspots.map((spot) => {
                const isActive = spot.id === activeHotspot;

                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot((current) => (current === spot.id ? null : spot.id))}
                    className={`window-motion rounded-[28px] border p-5 text-left transition ${
                      isActive
                        ? "border-[#cf8a4b] bg-[linear-gradient(135deg,rgba(208,138,75,0.22),rgba(255,255,255,0.08))]"
                        : "border-white/10 bg-white/6"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                          isActive ? "bg-[#cf8a4b] text-white" : "bg-white/8 text-white/84"
                        }`}
                      >
                        {spot.icon}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/55">{spot.stat}</p>
                        <p className="mt-1 text-lg font-semibold text-white">{spot.title}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/72">{spot.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal>
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="window-motion rounded-[26px] border border-white/10 bg-white/8 p-5 shadow-[0_18px_50px_rgba(5,12,24,0.18)] backdrop-blur"
                >
                  <div className="flex items-center gap-3 text-[#f0c996]">
                    {item.icon}
                    <p className="text-sm uppercase tracking-[0.22em] text-white/58">Спутник</p>
                  </div>
                  <p className="title-font mt-4 text-2xl text-white">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="accommodation" className="sputnik-paper relative overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-4xl" data-reveal>
              <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Проживание в «Спутнике»</p>
              <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837] sm:text-5xl lg:text-[4.2rem]">
                Выберите формат проживания и сразу погрузитесь в атмосферу
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5d5550]">
                Выберите категорию, откройте главный кадр, посмотрите дополнительные ракурсы и почувствуйте, какой
                ритм отдыха вам ближе.
              </p>
            </div>

            <div className="mt-12 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_330px]">
              <div className="space-y-4" data-reveal>
                {stayCollections.map((stay) => {
                  const isActive = stay.id === activeStay.id;

                  return (
                    <button
                      key={stay.id}
                      type="button"
                      aria-pressed={isActive}
                      onMouseEnter={() => changeStay(stay.id)}
                      onFocus={() => changeStay(stay.id)}
                      onClick={() => changeStay(stay.id)}
                      className={`window-motion w-full rounded-[28px] border p-6 text-left transition ${
                        isActive
                          ? "border-[#ca8450] bg-[linear-gradient(180deg,#d79a63,#c17842)] text-white shadow-[0_28px_70px_rgba(178,110,46,0.24)]"
                          : "border-[#ead7c8] bg-white/78 text-[#2d2420] shadow-[0_18px_40px_rgba(89,65,40,0.08)] backdrop-blur"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="title-font text-[2rem] leading-none">{stay.label}</p>
                          <p className={`mt-3 text-sm leading-6 ${isActive ? "text-white/80" : "text-[#665a53]"}`}>
                            {stay.intro}
                          </p>
                        </div>
                        <span className={`mt-2 h-3 w-3 rounded-full ${isActive ? "bg-white" : "bg-[#c7976d]"}`} />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {stay.badges.map((badge) => (
                          <span
                            key={badge}
                            className={`rounded-full px-3 py-1 text-xs ${
                              isActive ? "bg-white/16 text-white" : "bg-[#f6ece2] text-[#7a6455]"
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}

                <div className="window-motion rounded-[28px] border border-[#ead7c8] bg-white/68 p-6 text-[#5f554e] shadow-[0_18px_40px_rgba(89,65,40,0.08)] backdrop-blur">
                  <p className="text-sm leading-7">
                    Не уверены, какой формат выбрать? Администратор подберёт категорию под даты, количество гостей и
                    сценарий отдыха.
                  </p>
                </div>
              </div>

              <div className="window-motion rounded-[34px] border border-[#ead7c8] bg-white/86 shadow-[0_30px_90px_rgba(82,60,37,0.12)] backdrop-blur" data-reveal>
                <div className="relative aspect-[16/12] overflow-hidden rounded-t-[34px]">
                  <Image src={activeImage.src} alt={activeImage.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527]/45 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/68">{activeStay.label}</p>
                      <p className="title-font mt-2 text-4xl leading-none">{activeStay.label}</p>
                    </div>
                    <Link
                      href="/gallery"
                      className="btn-lux inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur"
                    >
                      Все фото
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="grid gap-3 border-t border-[#ead7c8] p-4 sm:grid-cols-4">
                  {activeStay.gallery.map((image, index) => {
                    const selected = index === activeGalleryIndex;

                    return (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveGalleryIndex(index)}
                        className={`window-motion relative overflow-hidden rounded-[22px] border transition ${
                          selected ? "border-[#c97f45] shadow-[0_16px_40px_rgba(189,122,62,0.22)]" : "border-[#ead7c8]"
                        }`}
                      >
                        <div className="relative aspect-[4/3]">
                          <Image src={image.src} alt={image.alt} fill className="object-cover" />
                          <div className={`absolute inset-0 transition ${selected ? "bg-black/5" : "bg-black/22"}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid gap-4 border-t border-[#ead7c8] p-6 md:grid-cols-[minmax(0,1fr)_280px]">
                  <div>
                    <p className="title-font text-3xl text-[#1f2837]">{activeStay.label}</p>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-[#5d5550]">{activeStay.description}</p>
                  </div>
                  <div className="window-motion rounded-[26px] bg-[#f8efe6] p-5 text-[#5d5550]">
                    <p className="text-sm uppercase tracking-[0.26em] text-[#926b4c]">Режим выбора</p>
                    <p className="mt-3 text-sm leading-7">{activeStay.note}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6" data-reveal>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Формат</p>
                  <h3 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837]">{activeStay.title}</h3>
                  <p className="mt-5 text-base leading-8 text-[#5d5550]">{activeStay.sideText}</p>
                </div>

                <div className="space-y-3">
                  {activeStay.features.map((feature) => (
                    <div
                      key={feature}
                      className="window-motion flex items-center gap-3 rounded-[22px] border border-[#ead7c8] bg-white/78 px-4 py-4 text-[#4f4742] shadow-[0_14px_32px_rgba(89,65,40,0.06)]"
                    >
                      <CheckCircleIcon className="h-5 w-5 text-[#c77e44]" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="window-motion rounded-[28px] border border-[#ead7c8] bg-white/78 p-6 shadow-[0_18px_40px_rgba(89,65,40,0.08)]">
                  <Link
                    href="#contacts"
                    className="btn-lux inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-4 text-base font-semibold text-white"
                  >
                    Проверить даты и доступность
                  </Link>
                  <Link
                    href="/gallery"
                    className="btn-lux mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-[#d6b08d] px-5 py-4 text-base font-semibold text-[#624b39]"
                  >
                    Смотреть все фотографии
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-[#e8d5c5] pt-8 md:grid-cols-2 xl:grid-cols-4" data-reveal>
              {[
                "Тихо и комфортно",
                "Фотографии сразу в контексте категории",
                "Приватные сценарии для семьи и компании",
                "Быстрый переход к доступности и бронированию",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#5d5550]">
                  <SparklesIcon className="h-5 w-5 text-[#c77e44]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="territory" className="relative overflow-hidden bg-[#fbf5ef] py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(205,152,104,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(102,144,157,0.12),transparent_32%)]" />
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="relative z-10" data-reveal>
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Территория комплекса</p>
                <h2 className="title-font mt-4 max-w-xl text-4xl leading-[1.06] text-[#1f2837] sm:text-5xl lg:text-[4.2rem]">
                  Всё уже собрано за вас
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d5550]">
                  Проживание, термы, ресторан, прогулочные зоны и сервис находятся рядом, поэтому отдых проходит
                  спокойно, удобно и без лишних перемещений.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Всё рядом", "Без лишней логистики", "Тихий ритм отдыха", "Для семьи и компании"].map((item) => (
                    <span
                      key={item}
                      className="window-motion rounded-full border border-[#ead7c8] bg-white/76 px-4 py-2 text-sm text-[#5b5049] shadow-[0_12px_28px_rgba(89,65,40,0.06)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#contacts"
                    className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#305f74,#23485a)] px-6 py-4 text-base font-semibold text-white"
                  >
                    Проверить даты и доступность
                  </Link>
                  <Link
                    href="#restaurant"
                    className="btn-lux inline-flex items-center justify-center rounded-2xl border border-[#d6b08d] bg-white/78 px-6 py-4 text-base font-semibold text-[#624b39]"
                  >
                    Посмотреть, как устроен сервис
                  </Link>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#6a6059]">
                  Всё продумано как единый маршрут: заселение, бассейны, ужин и спокойный вечер на территории в одном
                  ритме.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2" data-reveal>
                {atmosphereCards.map((card, index) => (
                  <article
                    key={card.title}
                    className={`sputnik-light-card rounded-[30px] overflow-hidden ${card.className} ${
                      index === atmosphereCards.length - 1 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image src={card.image} alt={card.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <p className="title-font text-3xl text-[#1f2837]">{card.title}</p>
                      <p className="mt-3 text-sm leading-7 text-[#5d5550]">{card.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section id="spa" className="relative overflow-hidden bg-[linear-gradient(180deg,#fff8f2_0%,#f5ece4_100%)] py-20 lg:py-24">
          <div className="pointer-events-none absolute left-[-12%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#d69b66]/16 blur-3xl" />
          <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#6a97a0]/16 blur-3xl" />
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div
              className="grid items-center gap-12 xl:grid-cols-[0.88fr_1.12fr]"
              onMouseLeave={() => setActivePoolStoryId("guests")}
            >
              <div data-reveal>
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Термальный бассейн</p>
                <h2 className="title-font mt-4 max-w-2xl text-4xl leading-[1.04] text-[#1f2837] sm:text-5xl lg:text-[4.3rem]">
                  Термальный бассейн от подготовки до впечатления
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d5550]">
                  Один бассейн раскрывается в трёх состояниях: подготовленная чаша, термальная вода и то ощущение
                  отдыха, ради которого сюда приезжают в любое время года.
                </p>

                <div className="window-motion mt-8 overflow-hidden rounded-[30px] border border-[#ead7c8] bg-white/82 p-6 shadow-[0_24px_60px_rgba(89,65,40,0.08)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePoolStory.id}
                      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="title-font text-3xl text-[#1f2837]">{activePoolStory.title}</p>
                      <p className="mt-4 max-w-2xl text-base leading-8 text-[#5d5550]">{activePoolStory.description}</p>
                      <p className="mt-5 rounded-[22px] border border-[#ead7c8] bg-[#fff8f2] px-4 py-4 text-sm leading-7 text-[#675a52]">
                        {activePoolStory.short}
                      </p>
                      {activePoolStory.id === waterPoolStory.id ? (
                        <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-[#cfe3ea] bg-[#eef8fb] px-4 py-3 text-[#31586b]">
                          <FireIcon className="h-5 w-5" />
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[#62808b]">Температура</p>
                            <p className="text-lg font-semibold">38.5°C</p>
                          </div>
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#6b6058]">
                  Наведите на воду или чашу, чтобы увидеть, из чего складываются тепло, чистота и спокойствие отдыха.
                </p>
              </div>

              <div className="pool-layer-scene relative mx-auto flex w-full max-w-[840px] flex-col items-end overflow-visible py-6 lg:py-10">
                <div className="pointer-events-none absolute inset-y-[8%] left-[4%] w-[280px] rounded-full bg-white/30 blur-3xl" />
                <div className="pointer-events-none absolute right-[8%] top-[10%] h-[240px] w-[240px] rounded-full bg-[#8fd7e8]/12 blur-3xl" />
                <div className="pointer-events-none absolute bottom-[6%] right-[6%] h-[180px] w-[360px] rounded-full bg-[#d9ebee]/18 blur-3xl" />

                <motion.button
                  type="button"
                  aria-label={guestsPoolStory.title}
                  onMouseEnter={() => setActivePoolStoryId(guestsPoolStory.id)}
                  onFocus={() => setActivePoolStoryId(guestsPoolStory.id)}
                  onClick={() => setActivePoolStoryId(guestsPoolStory.id)}
                  initial={false}
                  animate={{
                    x: activePoolStoryId === guestsPoolStory.id ? -10 : 0,
                    y: activePoolStoryId === guestsPoolStory.id ? -8 : 0,
                    scale: activePoolStoryId === guestsPoolStory.id ? 1.03 : 1,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-30 block w-[82%] bg-transparent p-0 text-left"
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={guestsPoolStory.image}
                      alt={guestsPoolStory.alt}
                      fill
                      sizes="(max-width: 1024px) 70vw, 42vw"
                      className="object-contain drop-shadow-[0_42px_90px_rgba(78,104,115,0.24)]"
                    />
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  aria-label={waterPoolStory.title}
                  onMouseEnter={() => setActivePoolStoryId(waterPoolStory.id)}
                  onFocus={() => setActivePoolStoryId(waterPoolStory.id)}
                  onClick={() => setActivePoolStoryId(waterPoolStory.id)}
                  initial={false}
                  animate={{
                    x: activePoolStoryId === waterPoolStory.id ? -16 : 0,
                    y: activePoolStoryId === waterPoolStory.id ? -26 : 0,
                    scale: activePoolStoryId === waterPoolStory.id ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-20 -mt-10 mr-[10%] block w-[66%] bg-transparent p-0 text-left"
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={waterPoolStory.image}
                      alt={waterPoolStory.alt}
                      fill
                      sizes="(max-width: 1024px) 56vw, 34vw"
                      className="object-contain drop-shadow-[0_34px_72px_rgba(35,105,128,0.22)]"
                    />
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  aria-label={cleanPoolStory.title}
                  onMouseEnter={() => setActivePoolStoryId(cleanPoolStory.id)}
                  onFocus={() => setActivePoolStoryId(cleanPoolStory.id)}
                  onClick={() => setActivePoolStoryId(cleanPoolStory.id)}
                  initial={false}
                  animate={{
                    x: activePoolStoryId === cleanPoolStory.id ? -12 : 0,
                    y: activePoolStoryId === cleanPoolStory.id ? -22 : 0,
                    scale: activePoolStoryId === cleanPoolStory.id ? 1.03 : 1,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 -mt-8 mr-[2%] block w-[78%] bg-transparent p-0 text-left"
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={cleanPoolStory.image}
                      alt={cleanPoolStory.alt}
                      fill
                      sizes="(max-width: 1024px) 68vw, 40vw"
                      className="object-contain drop-shadow-[0_30px_64px_rgba(91,83,70,0.18)]"
                    />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        <section id="restaurant" className="relative overflow-hidden bg-[#f7f0e8] py-20 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between" data-reveal>
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">Ресторан и паб</p>
                <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837] sm:text-5xl">
                  Когда ужин тоже становится частью впечатления
                </h2>
                <p className="mt-6 text-lg leading-8 text-[#5d5550]">
                  После терм и прогулки можно спокойно поужинать на территории, остаться на вечер или вернуться в номер
                  без лишних поездок.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {diningCards.map((card) => (
                <article
                  key={card.title}
                  className="sputnik-light-card overflow-hidden rounded-[32px]"
                  data-reveal
                >
                  <div className="relative h-72">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-8">
                    <p className="title-font text-4xl text-[#1f2837]">{card.title}</p>
                    <p className="mt-4 text-base leading-8 text-[#5d5550]">{card.text}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full border border-[#e0c9b4] bg-[#fff8f2] px-4 py-2 text-sm text-[#634d3c]">
                        {card.hours}
                      </span>
                      <a
                        href={card.phoneHref}
                        className="rounded-full border border-[#e0c9b4] bg-[#fff8f2] px-4 py-2 text-sm text-[#634d3c]"
                      >
                        {card.phone}
                      </a>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={card.href}
                        className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-4 text-base font-semibold text-white"
                      >
                        {card.action}
                      </Link>
                      <Link
                        href="#contacts"
                        className="btn-lux inline-flex items-center justify-center rounded-2xl border border-[#d6b08d] bg-white/76 px-5 py-4 text-base font-semibold text-[#624b39]"
                      >
                        Забронировать столик
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="relative overflow-hidden bg-[#0d1425] py-20 text-white lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,147,88,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(69,103,117,0.24),transparent_28%)]" />
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
              <div data-reveal>
                <p className="text-sm uppercase tracking-[0.32em] text-[#f0c996]">Контакты и бронирование</p>
                <h2 className="title-font mt-4 max-w-xl text-4xl leading-[1.06] text-white sm:text-5xl">
                  Приезжайте. Остальное соберём за вас.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
                  Поможем с маршрутом, ответим на вопросы, подберём проживание и быстро подтвердим бронирование.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Быстрая связь", "Понятные условия", "Маршрут и контакты", "Подтверждение без суеты"].map((item) => (
                    <span
                      key={item}
                      className="window-motion rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/76"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-10 grid gap-4">
                  <div className="window-motion rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/52">Бронирование проживания</p>
                    <div className="mt-4 space-y-2">
                      {site.bookingPhones.map((phone) => (
                        <a key={phone.tel} className="block text-2xl font-semibold text-white" href={`tel:${phone.tel}`}>
                          {phone.display}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={site.telegramHref}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-4 text-base font-semibold text-white"
                      >
                        Telegram
                      </Link>
                      <Link
                        href={site.maxHref}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-lux inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/5 px-5 py-4 text-base font-semibold text-white"
                      >
                        MAX
                      </Link>
                    </div>
                  </div>

                  <div className="window-motion rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/52">На территории комплекса</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="window-motion rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">{site.restaurant.name}</p>
                        <p className="mt-2 text-sm leading-7 text-white/68">{site.restaurant.hours}</p>
                        <a className="mt-2 block text-base text-white/84" href={`tel:${site.restaurant.phoneTel}`}>
                          {site.restaurant.phoneDisplay}
                        </a>
                      </div>
                      <div className="window-motion rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">{site.pub.name}</p>
                        <p className="mt-2 text-sm leading-7 text-white/68">{site.pub.hours}</p>
                        <a className="mt-2 block text-base text-white/84" href={`tel:${site.pub.phoneTel}`}>
                          {site.pub.phoneDisplay}
                        </a>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/68">
                      Адрес: {site.address}
                      <br />
                      E-mail:{" "}
                      <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6" data-reveal>
                <div className="window-motion overflow-hidden rounded-[34px] border border-white/10 bg-white/6 p-3 shadow-[0_28px_90px_rgba(3,8,20,0.28)] backdrop-blur-xl">
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
                      className="btn-lux inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-base font-semibold text-white"
                    >
                      <MapPinIcon className="h-5 w-5" />
                      Построить маршрут
                    </a>
                    <a
                      href="/docs/sputnik-kamchatka.vcf"
                      className="btn-lux inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-base font-semibold text-white"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      Сохранить контакты
                    </a>
                  </div>
                </div>

                <div className="window-motion rounded-[34px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                  <div className="grid gap-5 md:grid-cols-[120px_minmax(0,1fr)] md:items-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f0cfaa,#b96f35)] text-2xl font-semibold text-white shadow-lg">
                      24/7
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#f0c996]">Быстрое бронирование</p>
                      <p className="title-font mt-2 text-3xl text-white">Готовы к перезагрузке?</p>
                      <p className="mt-3 text-sm leading-7 text-white/72">
                        Проверим даты, соберём формат проживания и быстро подскажем лучший сценарий для вашей компании.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`tel:${site.bookingPhones[0].tel}`}
                      className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-6 py-4 text-base font-semibold text-white"
                    >
                      Позвонить и забронировать
                    </a>
                    <Link
                      href={site.telegramHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-lux inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/8 px-6 py-4 text-base font-semibold text-white"
                    >
                      Написать администратору
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#09111f]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-8 text-sm text-white/62 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="title-font text-2xl tracking-[0.12em] text-[#f0d0ad]">СПУТНИК</p>
            <p className="mt-2 max-w-xl leading-7">{site.address}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="#accommodation" className="transition hover:text-white">
              Проживание
            </Link>
            <Link href="#spa" className="transition hover:text-white">
              SPA и термы
            </Link>
            <Link href="#restaurant" className="transition hover:text-white">
              Ресторан
            </Link>
            <Link href="#contacts" className="transition hover:text-white">
              Контакты
            </Link>
          </div>
        </div>
      </footer>
      <FloatingActions />
    </div>
  );
}
