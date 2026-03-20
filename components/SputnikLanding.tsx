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
import BrandLogo from "@/components/BrandLogo";
import FloatingActions from "@/components/FloatingActions";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/lib/i18n";
import { getSiteContent } from "@/lib/siteContent";
import { getLandingContent } from "@/lib/landingContent";

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
  preview: {
    src: string;
    alt: string;
  };
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
  gallery: { src: string; alt: string; label: string }[];
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
  { href: "#spa", label: "SPA и термальные источники" },
  { href: "#restaurant", label: "Ресторан" },
  { href: "#territory", label: "Территория" },
  { href: "#contacts", label: "Контакты" },
];

const yandexRouteHref =
  "https://yandex.ru/maps/?rtext=~%D0%9A%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BA%D1%80%D0%B0%D0%B9%2C%20%D1%81.%20%D0%9F%D0%B0%D1%80%D0%B0%D1%82%D1%83%D0%BD%D0%BA%D0%B0%2C%20%D1%83%D0%BB.%20%D0%95%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%2021&rtt=auto";

function TargetCue({
  active = false,
  size = "md",
}: {
  active?: boolean;
  size?: "md" | "sm";
}) {
  const sizeClass = size === "sm" ? "h-12 w-12" : "h-14 w-14";
  const firstRingClass = size === "sm" ? "inset-[8px]" : "inset-[9px]";
  const secondRingClass = size === "sm" ? "inset-[15px]" : "inset-[18px]";
  const dotClass = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <span
      className={`relative flex ${sizeClass} items-center justify-center rounded-full border shadow-[0_15px_35px_rgba(0,0,0,0.28)] ${
        active
          ? "border-[#f2c28d] bg-[linear-gradient(135deg,#d49358,#b76b32)]"
          : "border-white/20 bg-[#101a2e]/70 backdrop-blur-xl"
      }`}
    >
      <span
        className={`absolute ${firstRingClass} rounded-full border transition ${
          active ? "border-white/65" : "border-white/35"
        }`}
      />
      <span
        className={`absolute ${secondRingClass} rounded-full border transition ${
          active ? "border-white/42" : "border-white/20"
        }`}
      />
      <span className={`${dotClass} rounded-full ${active ? "bg-white" : "bg-[#f0d0ad]"}`} />
    </span>
  );
}

function getHeroHotspotPopoverPosition(spot: Hotspot) {
  const left = Number.parseFloat(spot.left);
  const top = Number.parseFloat(spot.top);
  const horizontalClass = left >= 72 ? "right-[calc(100%+18px)]" : "left-[calc(100%+18px)]";

  if (top <= 28) {
    return `${horizontalClass} top-[calc(100%+18px)]`;
  }

  if (top >= 74) {
    return `${horizontalClass} bottom-[calc(100%+18px)]`;
  }

  return `${horizontalClass} top-1/2 -translate-y-1/2`;
}

const heroStats = [
  {
    label: "Корпус Спутник",
    text: "Основное проживание и быстрый заезд",
    icon: <BuildingOffice2Icon className="h-5 w-5" />,
  },
  {
    label: "Коттеджи",
    text: "Отдельный формат для семьи и компании",
    icon: <HomeModernIcon className="h-5 w-5" />,
  },
  {
    label: "Паб «Берлога»",
    text: "Вечерний формат прямо на территории",
    icon: <BuildingStorefrontIcon className="h-5 w-5" />,
  },
  {
    label: "Ресторан «Спутник»",
    text: "Спокойный ужин без выездов",
    icon: <BuildingStorefrontIcon className="h-5 w-5" />,
  },
  {
    label: "Термальные источники и SPA",
    text: "Тёплая вода, SPA и расслабляющий ритм отдыха",
    icon: <FireIcon className="h-5 w-5" />,
  },
];

const heroHotspots: Hotspot[] = [
  {
    id: "hotel",
    title: "Корпус Спутник",
    caption: "Основной корпус с проживанием и быстрым заездом",
    description: "Главный корпус комплекса, где удобно заселиться, выйти к бассейну и быстро включиться в отдых.",
    stat: "Основной корпус",
    details: ["Номера и категории", "Быстрое заселение", "Рядом с бассейном"],
    left: "109.5%",
    top: "46.8%",
    align: "left",
    icon: <BuildingOffice2Icon className="h-5 w-5" />,
    preview: {
      src: "/images/hotel-exterior-real.png",
      alt: "Корпус Спутник на территории комплекса",
    },
  },
  {
    id: "cottages",
    title: "Коттеджи",
    caption: "Отдельный формат проживания для семьи и компании",
    description: "Больше приватности, отдельный вход и ощущение, что отдых разворачивается в собственном ритме.",
    stat: "Приватный формат",
    details: ["Для семьи и компании", "Больше пространства", "Тишина и отдельность"],
    left: "74.8%",
    top: "43.8%",
    align: "left",
    icon: <HomeModernIcon className="h-5 w-5" />,
    preview: {
      src: "/images/cottage-exterior-real.jpg",
      alt: "Коттеджи на территории комплекса",
    },
  },
  {
    id: "pub",
    title: "Паб «Берлога»",
    caption: "Камерный вечерний формат на территории комплекса",
    description: "Плотный интерьер, приватная атмосфера и вечерний сценарий, когда никуда не нужно ехать после ужина.",
    stat: "Паб на территории",
    details: ["Вечерний формат", "Барная атмосфера", "Удобно после SPA"],
    left: "63.2%",
    top: "47.6%",
    align: "left",
    icon: <BuildingStorefrontIcon className="h-5 w-5" />,
    preview: {
      src: "/images/restaurant-pub-real.jpg",
      alt: "Интерьер паба Берлога",
    },
  },
  {
    id: "restaurant",
    title: "Ресторан «Спутник»",
    caption: "Основной ресторан для спокойного ужина без выездов",
    description: "Хороший вариант для семейного ужина, бронирования столика и размеренного вечера прямо на территории.",
    stat: "Ресторан комплекса",
    details: ["Основной ресторан", "Спокойный ужин", "Бронирование столика"],
    left: "71.4%",
    top: "64.2%",
    align: "left",
    icon: <BuildingStorefrontIcon className="h-5 w-5" />,
    preview: {
      src: "/images/gallery_05.jpg",
      alt: "Интерьер ресторана Спутник",
    },
  },
  {
    id: "pool",
    title: "Термальные источники и бассейн",
    caption: "Тёплая вода как центральная точка отдыха",
    description: "Отдельная точка на бассейне сразу показывает, где начинается главный сценарий расслабления.",
    stat: "Тёплая вода",
    details: ["Открытый бассейн", "SPA рядом", "Можно приехать на день"],
    left: "38.6%",
    top: "83.0%",
    align: "left",
    icon: <FireIcon className="h-5 w-5" />,
    preview: {
      src: "/images/gallery_01.jpg",
      alt: "Термальный бассейн комплекса",
    },
  },
];

const heroInfoPanels: HeroInfoPanel[] = [
  {
    id: "interactive",
    eyebrow: "с. Паратунка · ул. Елизова, 21",
    title: "Смотрите, где что находится",
    lead: "Наводите на точки, чтобы увидеть корпус, коттеджи, паб, ресторан и бассейн прямо поверх главного кадра.",
    description:
      "Так быстрее считывается территория: где заселиться, где жить отдельно, где провести вечер и как всё связано с термальными источниками, SPA и проживанием в один маршрут.",
    accent: "Корпус • коттеджи • паб • ресторан • бассейн",
    icon: <SparklesIcon className="h-5 w-5" />,
  },
  {
    id: "contact",
    eyebrow: "Быстрый контакт",
    title: "Связь без лишних шагов",
    lead: "Подбор номера, заезд, термальные источники и ресторан можно закрыть прямо с первого экрана одним касанием.",
    description:
      "Администратор поможет быстро подобрать проживание, термальные источники и удобный вариант бронирования.",
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
      {
        src: "/images/room-standard-sputnik-2.png",
        alt: "Зона отдыха в стандартном номере",
        label: "Стандарт",
      },
      {
        src: "/images/room-standard-balcony-1.png",
        alt: "Стандарт с балконом",
        label: "Стандарт с балконом",
      },
      {
        src: "/images/room-standard-balcony-2.png",
        alt: "Стандартный номер с балконной дверью",
        label: "Стандарт с балконом",
      },
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
      {
        src: "/images/room-premium-standard-1.png",
        alt: "Премиум стандарт с большим окном",
        label: "Премиум стандарт",
      },
      {
        src: "/images/room-premium-standard-2.png",
        alt: "Премиум стандарт в светлых тонах",
        label: "Премиум стандарт",
      },
      {
        src: "/images/room-lux-sputnik-1.png",
        alt: "Люкс в корпусе Спутник",
        label: "Люкс",
      },
      {
        src: "/images/room-lux-kitchen-1.png",
        alt: "Люкс с кухней",
        label: "Люкс с кухней",
      },
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
      {
        src: "/images/cottage-living-real.jpg",
        alt: "Гостиная в коттедже",
        label: "Гостиная",
      },
      {
        src: "/images/cottage-room-real.jpg",
        alt: "Спальня в коттедже",
        label: "Спальня",
      },
      {
        src: "/images/cottage-dining-real.jpg",
        alt: "Столовая зона в коттедже",
        label: "Кухня-столовая",
      },
      {
        src: "/images/cottage-exterior-real.jpg",
        alt: "Фасад коттеджа зимой",
        label: "Фасад",
      },
    ],
  },
];

const atmosphereCards = [
  {
    title: "Номера и коттеджи",
    text: "Разный формат размещения под короткий заезд, семейный отдых и приватный сценарий.",
    image: "/images/cottage-room-real.jpg",
    className: "",
  },
  {
    title: "Термальные бассейны и SPA",
    text: "Тёплая вода, процедуры и расслабляющий ритм без выездов с территории.",
    image: "/images/gallery_01.jpg",
    className: "",
  },
  {
    title: "Ресторан и паб",
    text: "Еда, ужин и вечерний формат прямо на месте, когда отдых не надо дробить на поездки.",
    image: "/images/restaurant-pub-real.jpg",
    className: "",
  },
  {
    title: "Территория для отдыха",
    text: "Тишина, снег, прогулки и ощущение отдельного мира, где не нужно спешить.",
    image: "/images/territory-walk-real.png",
    className: "",
  },
  {
    title: "Ресепшен и заселение",
    text: "Стойка ресепшен, быстрое оформление и помощь администратора сразу при заезде без лишней суеты.",
    image: "/images/reception-real.jpg",
    className: "md:col-span-2",
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
  const { locale } = useLanguage();
  const localizedSite = getSiteContent(locale);
  const localizedLanding = getLandingContent(locale, localizedSite);
  const currentSite = locale === "ru" ? getSiteContent("ru") : localizedSite;
  const iconMap = {
    hotel: <BuildingOffice2Icon className="h-5 w-5" />,
    cottages: <HomeModernIcon className="h-5 w-5" />,
    restaurant: <BuildingStorefrontIcon className="h-5 w-5" />,
    pub: <BuildingStorefrontIcon className="h-5 w-5" />,
    pool: <FireIcon className="h-5 w-5" />,
    sparkles: <SparklesIcon className="h-5 w-5" />,
    phone: <PhoneIcon className="h-5 w-5" />,
  } as const;
  const currentNavItems = locale === "ru" ? navItems : localizedLanding.navItems;
  const currentHeroStats =
    locale === "ru"
      ? heroStats
      : localizedLanding.heroStats.map((item) => ({ ...item, icon: iconMap[item.icon] }));
  const currentHeroHotspots =
    locale === "ru"
      ? heroHotspots
      : localizedLanding.heroHotspots.map((item) => ({ ...item, icon: iconMap[item.icon] }));
  const currentHeroInfoPanels =
    locale === "ru"
      ? heroInfoPanels
      : localizedLanding.heroInfoPanels.map((item) => ({ ...item, icon: iconMap[item.icon] }));
  const currentStayCollections = locale === "ru" ? stayCollections : localizedLanding.stayCollections;
  const currentAtmosphereCards = locale === "ru" ? atmosphereCards : localizedLanding.atmosphereCards;
  const currentPoolStories = locale === "ru" ? poolStories : localizedLanding.poolStories;
  const currentDiningCards = locale === "ru" ? diningCards : localizedLanding.diningCards;
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>("hotel");
  const [activeHeroPanel, setActiveHeroPanel] = useState<string | null>("interactive");
  const [activePoolStoryId, setActivePoolStoryId] = useState("guests");
  const [activeStayId, setActiveStayId] = useState("cottages");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const activeStay = currentStayCollections.find((item) => item.id === activeStayId) ?? currentStayCollections[0];
  const activeImage = activeStay.gallery[activeGalleryIndex] ?? activeStay.gallery[0];
  const activePoolStory = currentPoolStories.find((item) => item.id === activePoolStoryId) ?? currentPoolStories[1];
  const cleanPoolStory = currentPoolStories.find((item) => item.id === "clean") ?? currentPoolStories[0];
  const waterPoolStory = currentPoolStories.find((item) => item.id === "water") ?? currentPoolStories[1];
  const guestsPoolStory = currentPoolStories.find((item) => item.id === "guests") ?? currentPoolStories[2];

  const changeStay = (stayId: string) => {
    setActiveStayId(stayId);
    setActiveGalleryIndex(0);
  };

  return (
    <div className="relative isolate overflow-hidden bg-[#0a1324] text-white">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-[1280px] px-4 pt-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-white/10 bg-[#0d1426]/70 px-4 py-3 shadow-[0_24px_80px_rgba(3,8,20,0.25)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <Link href="#top" className="min-w-0">
                <BrandLogo priority />
              </Link>

              <nav className="hidden items-center gap-8 lg:flex">
                {currentNavItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm font-medium text-white/82 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <LanguageSwitcher compact />
                <a
                  href={`tel:${currentSite.bookingPhones[1].tel}`}
                  className="text-sm font-medium text-white/70 transition hover:text-white"
                >
                  {currentSite.bookingPhones[1].display}
                </a>
                <Link
                  href="#contacts"
                  className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-3 text-sm font-semibold text-white"
                >
                  {t(locale, { ru: "Забронировать", en: "Book now", zh: "立即预订" })}
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white lg:hidden"
              >
                {t(locale, {
                  ru: menuOpen ? "Закрыть" : "Меню",
                  en: menuOpen ? "Close" : "Menu",
                  zh: menuOpen ? "关闭" : "菜单",
                })}
              </button>
            </div>
          </div>
        </div>

        {menuOpen ? (
          <div className="mx-auto mt-3 max-w-[1280px] px-4 sm:px-6 lg:px-8 lg:hidden">
            <div className="rounded-[28px] border border-white/10 bg-[#0d1426]/92 p-4 shadow-[0_24px_80px_rgba(3,8,20,0.3)] backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                <div className="mb-2">
                  <LanguageSwitcher compact />
                </div>
                {currentNavItems.map((item) => (
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
                  {t(locale, { ru: "Забронировать", en: "Book now", zh: "立即预订" })}
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
              alt={t(locale, {
                ru: "Спутник Камчатка зимой с видом на бассейн и горы",
                en: "Sputnik Kamchatka in winter with a view of the pool and mountains",
                zh: "冬季的 Sputnik Kamchatka，远眺泳池与山景",
              })}
              fill
              priority
              className="hero-image-motion object-cover object-[50%_58%]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(213,146,89,0.14),transparent_38%),linear-gradient(100deg,rgba(4,9,18,0.92)_15%,rgba(6,10,22,0.55)_45%,rgba(7,10,19,0.22)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08101f]/35 via-transparent to-[#08101f]/72" />
            <div className="absolute inset-0 lux-noise opacity-70" />
          </div>

          <div className="relative z-30 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="relative min-h-[720px] xl:min-h-[780px]">
              <div className="pointer-events-none absolute inset-0 z-20 hidden xl:block" data-reveal>
                {currentHeroHotspots.map((spot) => {
                  const isActive = spot.id === hoveredHotspotId;

                  return (
                    <button
                      key={spot.id}
                      type="button"
                      aria-label={`Показать: ${spot.title}`}
                      onMouseEnter={() => setHoveredHotspotId(spot.id)}
                      onMouseLeave={() => setHoveredHotspotId((current) => (current === spot.id ? null : current))}
                      onFocus={() => setHoveredHotspotId(spot.id)}
                      onBlur={() => setHoveredHotspotId((current) => (current === spot.id ? null : current))}
                      className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 ${isActive ? "z-40" : "z-20"}`}
                      style={{ left: spot.left, top: spot.top }}
                    >
                      <TargetCue active={isActive} size="sm" />
                      <span className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d49358]/24 blur-xl" />

                      <AnimatePresence>
                        {isActive ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className={`pointer-events-none absolute w-[280px] overflow-hidden rounded-[26px] border border-white/14 bg-[#0f1930]/92 text-left shadow-[0_28px_80px_rgba(8,14,28,0.34)] backdrop-blur-xl ${getHeroHotspotPopoverPosition(spot)}`}
                          >
                            <div className="relative h-24">
                              <Image src={spot.preview.src} alt={spot.preview.alt} fill className="object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#09111f] via-[#09111f]/20 to-transparent" />
                              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-3">
                                <span className="rounded-full border border-white/16 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f0c996]">
                                  {spot.stat}
                                </span>
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white/88">
                                  {spot.icon}
                                </span>
                              </div>
                            </div>

                            <div className="p-4">
                              <p className="title-font text-[1.75rem] leading-none text-white">{spot.title}</p>
                              <p className="mt-2 text-xs leading-5 text-white/72">{spot.caption}</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {spot.details.map((item) => (
                                  <span
                                    key={item}
                                    className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] text-white/84"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>

              <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <div className="relative z-10 max-w-3xl xl:max-w-[760px]" data-reveal>
                <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.34em] text-white/72 backdrop-blur">
                  {t(locale, {
                    ru: "с. Паратунка · ул. Елизова, 21",
                    en: "Paratunka village · 21 Elizova St.",
                    zh: "帕拉通卡村 · 叶利佐娃街21号",
                  })}
                </div>
                <h1
                  className="title-font mt-6 max-w-5xl text-[2.85rem] leading-[0.98] text-white sm:text-[4.1rem] lg:text-[5.2rem]"
                  style={{ textShadow: "0 10px 30px rgba(0,0,0,0.28)" }}
                >
                  {t(locale, {
                    ru: "Всё в одном месте тихая и тёплая Паратунка",
                    en: "Everything in one place in quiet warm Paratunka",
                    zh: "一切都集中在安静温暖的帕拉通卡",
                  })}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                  {t(locale, {
                    ru: "Проживание, термальные источники, ресторан и территория отдыха собраны в один цельный сценарий: заселиться, прогреться в бассейнах, спокойно поужинать и остаться в том же ритме отдыха, не тратя время на лишние переезды по Паратунке.",
                    en: "Accommodation, thermal springs, dining, and the resort grounds are gathered into one smooth stay: check in, warm up in the pools, enjoy dinner, and remain in the same rhythm without extra trips around Paratunka.",
                    zh: "住宿、温泉热源体验、餐饮和休闲园区被整合成一条完整的度假动线：办理入住、在泳池中暖身、从容用餐，并始终保持同一种放松节奏，无需在帕拉通卡来回奔波。",
                  })}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#contacts"
                    className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-6 py-4 text-base font-semibold text-white"
                  >
                    {t(locale, {
                      ru: "Проверить даты и доступность",
                      en: "Check dates and availability",
                      zh: "查看日期与可订情况",
                    })}
                  </Link>
                  <Link
                    href="#accommodation"
                    className="btn-lux inline-flex items-center justify-center rounded-2xl border border-white/18 bg-white/8 px-6 py-4 text-base font-semibold text-white backdrop-blur"
                  >
                    {t(locale, {
                      ru: "Смотреть формат проживания",
                      en: "View stay formats",
                      zh: "查看住宿形式",
                    })}
                  </Link>
                </div>

                <div className="mt-10 flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,360px)_minmax(0,320px)] xl:items-start">
                  <div className="sputnik-panel rounded-[30px] p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.34em] text-white/60">
                      {t(locale, { ru: "Сценарий бронирования", en: "Booking scenario", zh: "预订场景" })}
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <CalendarDaysIcon className="h-5 w-5" />
                          <span className="text-sm">{t(locale, { ru: "Заезд", en: "Check-in", zh: "入住" })}</span>
                        </div>
                        <p className="mt-2 text-lg font-semibold">{t(locale, { ru: "20 мая, пн", en: "May 20, Mon", zh: "5月20日，周一" })}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <CalendarDaysIcon className="h-5 w-5" />
                          <span className="text-sm">{t(locale, { ru: "Выезд", en: "Check-out", zh: "退房" })}</span>
                        </div>
                        <p className="mt-2 text-lg font-semibold">{t(locale, { ru: "22 мая, ср", en: "May 22, Wed", zh: "5月22日，周三" })}</p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                      <div className="flex items-center gap-2 text-white/70">
                        <UserGroupIcon className="h-5 w-5" />
                        <span className="text-sm">{t(locale, { ru: "Состав гостей", en: "Guests", zh: "入住人数" })}</span>
                      </div>
                      <p className="mt-2 text-lg font-semibold">{t(locale, { ru: "2 взрослых, 1 номер", en: "2 adults, 1 room", zh: "2位成人，1间客房" })}</p>
                    </div>
                    <Link
                      href="#contacts"
                      className="btn-lux mt-4 inline-flex w-full items-center justify-between rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-4 text-base font-semibold text-white"
                    >
                      {t(locale, { ru: "Показать сценарии отдыха", en: "Show stay scenarios", zh: "查看度假方案" })}
                      <ChevronRightIcon className="h-5 w-5" />
                    </Link>
                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href="#accommodation"
                        className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/82"
                      >
                        {t(locale, { ru: "Смотреть проживание", en: "View accommodation", zh: "查看住宿" })}
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                      <Link
                        href="#spa"
                        className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/82"
                      >
                        {t(locale, {
                          ru: "Смотреть SPA и термальные источники",
                          en: "View SPA and thermal springs",
                          zh: "查看 SPA 与温泉热源",
                        })}
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="hidden xl:flex xl:w-[320px] xl:flex-col xl:gap-4">
                    {currentHeroInfoPanels.map((panel) => {
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
                                        <a href={`tel:${currentSite.bookingPhones[0].tel}`} className="block text-2xl font-semibold text-white">
                                          {currentSite.bookingPhones[0].display}
                                        </a>
                                        <a href={`tel:${currentSite.bookingPhones[1].tel}`} className="block text-sm text-white/70">
                                          {currentSite.bookingPhones[1].display}
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
              </div>

            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:hidden" data-reveal>
              {currentHeroHotspots.map((spot) => {
                const isActive = spot.id === selectedHotspotId;

                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedHotspotId(spot.id)}
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

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5" data-reveal>
              {currentHeroStats.map((item) => (
                <div
                  key={item.label}
                  className="window-motion rounded-[26px] border border-white/10 bg-white/8 p-5 shadow-[0_18px_50px_rgba(5,12,24,0.18)] backdrop-blur"
                >
                  <div className="flex items-center gap-3 text-[#f0c996]">
                    {item.icon}
                    <p className="text-sm uppercase tracking-[0.22em] text-white/58">
                      {t(locale, { ru: "Спутник", en: "Sputnik", zh: "Sputnik" })}
                    </p>
                  </div>
                  <p className="title-font mt-4 text-2xl text-white">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="accommodation" className="sputnik-paper relative overflow-hidden scroll-mt-32 sm:scroll-mt-36">
          <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-4xl" data-reveal>
              <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                {t(locale, {
                  ru: "Номера · категории · коттеджи",
                  en: "Rooms · categories · cottages",
                  zh: "客房 · 房型 · 别墅小屋",
                })}
              </p>
              <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837] sm:text-5xl lg:text-[4.2rem]">
                {t(locale, {
                  ru: "Выберите формат проживания и сразу погрузитесь в атмосферу",
                  en: "Choose the stay format and step into the atmosphere right away",
                  zh: "选择适合的住宿形式，立刻进入度假氛围",
                })}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5d5550]">
                {t(locale, {
                  ru: "Выберите категорию, откройте главный кадр, посмотрите дополнительные ракурсы и почувствуйте, какой ритм отдыха вам ближе.",
                  en: "Choose a category, open the main frame, review extra angles, and feel which rest rhythm suits you best.",
                  zh: "选择房型、打开主画面、查看更多角度，并感受哪种度假节奏最适合您。",
                })}
              </p>
            </div>

            <div className="mt-12 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_330px]">
              <div className="space-y-4" data-reveal>
                {currentStayCollections.map((stay) => {
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
                    {t(locale, {
                      ru: "Не уверены, какой формат выбрать? Администратор подберёт категорию под даты, количество гостей и сценарий отдыха.",
                      en: "Not sure which format to choose? The administrator will help match the category to your dates, guest count, and rest scenario.",
                      zh: "还不确定该选哪种形式？管理员会根据您的日期、人数和度假需求帮您匹配合适的房型。",
                    })}
                  </p>
                </div>
              </div>

              <div className="window-motion rounded-[34px] border border-[#ead7c8] bg-white/86 shadow-[0_30px_90px_rgba(82,60,37,0.12)] backdrop-blur" data-reveal>
                <div className="relative aspect-[16/12] overflow-hidden rounded-t-[34px]">
                  <Image src={activeImage.src} alt={activeImage.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527]/45 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/68">{activeImage.label}</p>
                      <p className="title-font mt-2 text-4xl leading-none">{activeStay.label}</p>
                    </div>
                    <Link
                      href="/gallery"
                      className="btn-lux inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur"
                    >
                      {t(locale, { ru: "Все фото", en: "All photos", zh: "全部照片" })}
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
                        className={`window-motion relative overflow-hidden rounded-[22px] border text-left transition ${
                          selected ? "border-[#c97f45] shadow-[0_16px_40px_rgba(189,122,62,0.22)]" : "border-[#ead7c8]"
                        }`}
                      >
                        <div className="relative aspect-[4/3]">
                          <Image src={image.src} alt={image.alt} fill className="object-cover" />
                          <div
                            className={`absolute inset-0 transition ${
                              selected ? "bg-gradient-to-t from-black/26 via-black/6 to-transparent" : "bg-gradient-to-t from-black/44 via-black/12 to-transparent"
                            }`}
                          />
                          <div className="absolute inset-x-0 bottom-0 p-3">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.16em] ${
                                selected
                                  ? "border-white/28 bg-white/18 text-white"
                                  : "border-white/18 bg-black/20 text-white/92"
                              }`}
                            >
                              {image.label}
                            </span>
                          </div>
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
                    <p className="text-sm uppercase tracking-[0.26em] text-[#926b4c]">
                      {t(locale, { ru: "Режим выбора", en: "Selection mode", zh: "选择提示" })}
                    </p>
                    <p className="mt-3 text-sm leading-7">{activeStay.note}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6" data-reveal>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                    {t(locale, { ru: "Формат", en: "Format", zh: "形式" })}
                  </p>
                  <h3 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837]">
                    {activeStay.id === "cottages" ? (
                      <>
                        <span className="block">
                          {t(locale, {
                            ru: "Коттеджи с ощущением",
                            en: "Cottages with the feeling of",
                            zh: "带有专属空间感的",
                          })}
                        </span>
                        <span className="block">
                          {t(locale, {
                            ru: "собственной территории",
                            en: "your own territory",
                            zh: "别墅小屋",
                          })}
                        </span>
                      </>
                    ) : (
                      activeStay.title
                    )}
                  </h3>
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
                    {t(locale, {
                      ru: "Проверить даты и доступность",
                      en: "Check dates and availability",
                      zh: "查看日期与可订情况",
                    })}
                  </Link>
                  <Link
                    href="/gallery"
                    className="btn-lux mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-[#d6b08d] px-5 py-4 text-base font-semibold text-[#624b39]"
                  >
                    {t(locale, {
                      ru: "Смотреть все фотографии",
                      en: "View all photos",
                      zh: "查看全部照片",
                    })}
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-[#e8d5c5] pt-8 md:grid-cols-2 xl:grid-cols-4" data-reveal>
              {[
                t(locale, { ru: "Тихо и комфортно", en: "Quiet and comfortable", zh: "安静舒适" }),
                t(locale, {
                  ru: "Фотографии сразу в контексте категории",
                  en: "Photos shown in category context",
                  zh: "照片与房型内容直接对应",
                }),
                t(locale, {
                  ru: "Приватные сценарии для семьи и компании",
                  en: "Private formats for families and groups",
                  zh: "适合家庭和团体的私密方案",
                }),
                t(locale, {
                  ru: "Быстрый переход к доступности и бронированию",
                  en: "Quick path to availability and booking",
                  zh: "快速查看可订情况并完成预订",
                }),
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#5d5550]">
                  <SparklesIcon className="h-5 w-5 text-[#c77e44]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="territory" className="relative overflow-hidden bg-[#fbf5ef] py-20 scroll-mt-32 lg:py-24 sm:scroll-mt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(205,152,104,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(102,144,157,0.12),transparent_32%)]" />
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-stretch gap-8 xl:grid-cols-[0.94fr_1.06fr]">
              <div
                className="relative z-10 overflow-hidden rounded-[36px] border border-[#ead7c8] bg-white/70 shadow-[0_28px_70px_rgba(89,65,40,0.08)]"
                data-reveal
              >
                <div className="absolute inset-0">
                  <Image
                    src="/images/gallery_01.jpg"
                    alt={t(locale, {
                      ru: "Термальный бассейн и комплекс на территории Спутник Камчатка",
                      en: "Thermal pool and resort grounds at Sputnik Kamchatka",
                      zh: "Sputnik Kamchatka 园区内的温泉泳池与建筑",
                    })}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,248,242,0.97)_8%,rgba(255,248,242,0.92)_40%,rgba(246,236,227,0.88)_66%,rgba(245,236,228,0.92)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(212,147,88,0.14),transparent_32%)]" />
                </div>

                <div className="relative z-10 flex h-full flex-col px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                  <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                    {t(locale, {
                      ru: "с. Паратунка · ул. Елизова, 21",
                      en: "Paratunka village · 21 Elizova St.",
                      zh: "帕拉通卡村 · 叶利佐娃街21号",
                    })}
                  </p>
                  <h2 className="title-font mt-4 max-w-xl text-4xl leading-[1.06] text-[#1f2837] sm:text-5xl lg:text-[4.2rem]">
                    <span className="block">
                      {t(locale, { ru: "Всё уже собрано", en: "Everything is already arranged", zh: "一切都已为您准备好" })}
                    </span>
                    <span className="block">
                      {t(locale, { ru: "за вас", en: "for you", zh: "无需您再操心" })}
                    </span>
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d5550]">
                    {t(locale, {
                      ru: "Проживание, термальные источники, ресторан, прогулочные зоны и сервис находятся рядом, поэтому отдых проходит спокойно, удобно и без лишних перемещений.",
                      en: "Accommodation, thermal springs, dining, walking areas, and service are close to each other, so the stay feels calm, convenient, and free from extra movement.",
                      zh: "住宿、温泉热源体验、餐饮、散步区域和服务都彼此相邻，因此整段度假会更从容、方便，也无需额外奔波。",
                    })}
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#6b6058]">
                    {t(locale, {
                      ru: "Это не набор разрозненных услуг, а цельный маршрут: приехать, разместиться, прогреться в бассейнах, спокойно поужинать и остаться в том же темпе отдыха до самого вечера.",
                      en: "This isn't a scattered set of services but one coherent route: arrive, settle in, warm up in the pools, have dinner, and stay in the same relaxed pace through the evening.",
                      zh: "这不是零散服务的堆叠，而是一条完整的路线：抵达、入住、在泳池暖身、安静用餐，并把这种放松节奏一直保持到夜晚。",
                    })}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    t(locale, { ru: "Всё рядом", en: "Everything nearby", zh: "一切都在附近" }),
                    t(locale, { ru: "Без лишней логистики", en: "No extra logistics", zh: "无需额外奔波" }),
                    t(locale, { ru: "Тихий ритм отдыха", en: "Quiet holiday rhythm", zh: "安静的度假节奏" }),
                    t(locale, { ru: "Для семьи и компании", en: "For family and groups", zh: "适合家庭与团体" }),
                  ].map((item) => (
                    <span
                      key={item}
                      className="window-motion whitespace-nowrap rounded-full border border-[#ead7c8] bg-white/84 px-4 py-2 text-sm text-[#5b5049] shadow-[0_12px_28px_rgba(89,65,40,0.06)]"
                    >
                      {item}
                    </span>
                  ))}
                  </div>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="#contacts"
                      className="btn-lux inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-[linear-gradient(135deg,#305f74,#23485a)] px-6 py-4 text-base font-semibold text-white"
                    >
                      {t(locale, { ru: "Проверить даты и доступность", en: "Check dates and availability", zh: "查看日期与可订情况" })}
                    </Link>
                    <a
                      href={yandexRouteHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-lux inline-flex items-center justify-center whitespace-nowrap rounded-2xl border border-[#d6b08d] bg-white/82 px-6 py-4 text-base font-semibold text-[#624b39]"
                    >
                      {t(locale, { ru: "Построить маршрут", en: "Build route", zh: "规划路线" })}
                    </a>
                  </div>

                  <div className="mt-8 w-full max-w-[420px] overflow-hidden rounded-[30px] border border-[#ead7c8] bg-white/88 shadow-[0_18px_42px_rgba(89,65,40,0.08)] backdrop-blur">
                    <video
                      className="block h-[240px] w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/images/gallery_01.jpg"
                    >
                      <source src="/videos/sputnik.mp4" type="video/mp4" />
                    </video>
                  </div>

                  <div className="mt-auto grid gap-4 pt-8 sm:grid-cols-2">
                    <div className="window-motion rounded-[26px] border border-[#ead7c8] bg-white/82 p-5 text-[#5d5550] shadow-[0_16px_36px_rgba(89,65,40,0.08)] backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.28em] text-[#8a6548]">{t(locale, { ru: "Адрес", en: "Address", zh: "地址" })}</p>
                      <p className="mt-3 text-sm leading-7">{currentSite.address}</p>
                    </div>
                    <div className="window-motion rounded-[26px] border border-[#ead7c8] bg-white/82 p-5 text-[#5d5550] shadow-[0_16px_36px_rgba(89,65,40,0.08)] backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.28em] text-[#8a6548]">
                        {t(locale, { ru: "Как ощущается отдых", en: "How the stay feels", zh: "这段度假的感受" })}
                      </p>
                      <p className="mt-3 text-sm leading-7">
                        {t(locale, {
                          ru: "Всё продумано как единый маршрут: заселение, бассейны, ужин и спокойный вечер на территории в одном ритме.",
                          en: "Everything is designed as one route: check-in, pools, dinner, and a calm evening on the grounds in the same rhythm.",
                          zh: "一切都被设计成一条完整路线：入住、泳池、晚餐，以及同一节奏下的宁静夜晚。",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:auto-rows-fr md:grid-cols-2" data-reveal>
                {currentAtmosphereCards.map((card) => (
                  <article
                    key={card.title}
                    className={`sputnik-light-card flex h-full flex-col rounded-[30px] overflow-hidden ${card.className}`}
                  >
                    <div className="relative h-48 overflow-hidden md:h-52">
                      <Image src={card.image} alt={card.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="title-font text-3xl text-[#1f2837]">{card.title}</p>
                      <p className="mt-3 text-sm leading-7 text-[#5d5550]">{card.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section id="spa" className="relative overflow-hidden bg-[linear-gradient(180deg,#fff8f2_0%,#f5ece4_100%)] py-20 scroll-mt-32 lg:py-24 sm:scroll-mt-36">
          <div className="pointer-events-none absolute left-[-12%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#d69b66]/16 blur-3xl" />
          <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#6a97a0]/16 blur-3xl" />
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div
              className="grid items-center gap-12 xl:grid-cols-[0.88fr_1.12fr]"
              onMouseLeave={() => setActivePoolStoryId("guests")}
            >
              <div data-reveal>
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                  {t(locale, {
                    ru: "Тёплая вода · чаша · впечатление",
                    en: "Warm water · bowl · impression",
                    zh: "温暖水域 · 池体 · 感受",
                  })}
                </p>
                <h2 className="title-font mt-4 max-w-2xl text-4xl leading-[1.04] text-[#1f2837] sm:text-5xl lg:text-[4.3rem]">
                  {t(locale, {
                    ru: "Термальный бассейн от подготовки до впечатления",
                    en: "The thermal pool from preparation to impression",
                    zh: "从准备过程到最终感受的温泉泳池",
                  })}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[#6b6058]">
                  {t(locale, {
                    ru: "Три слоя справа показывают не просто иллюстрацию, а весь путь впечатления: как подготовленная чаша превращается в тёплую воду и в тот самый момент отдыха, ради которого сюда возвращаются.",
                    en: "The three layers on the right show not just an illustration but the whole path of the experience: how a prepared bowl becomes warm water and then the moment of rest people return for.",
                    zh: "右侧三层结构展示的不只是示意图，而是完整的体验路径：准备好的池体如何变成温暖水域，再变成让人愿意再次回来的那一刻放松感。",
                  })}
                </p>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5d5550]">
                  {t(locale, {
                    ru: "Один бассейн раскрывается в трёх состояниях: подготовленная чаша, термальная вода и то ощущение отдыха, ради которого сюда приезжают в любое время года.",
                    en: "One pool opens in three states: the prepared bowl, the thermal water, and the feeling of rest people come for in every season.",
                    zh: "同一个泳池可以被看作三种状态：准备好的池体、温泉热水，以及四季都值得前来体验的放松感受。",
                  })}
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
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[#62808b]">
                              {t(locale, { ru: "Температура", en: "Temperature", zh: "温度" })}
                            </p>
                            <p className="text-lg font-semibold">38.5°C</p>
                          </div>
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#6b6058]">
                  {t(locale, {
                    ru: "Наводите на мишени справа, чтобы увидеть, из чего складываются тепло, чистота и спокойствие отдыха.",
                    en: "Hover the markers on the right to see how warmth, cleanliness, and a calm stay are built.",
                    zh: "将光标移到右侧点位上，查看温暖感、洁净度和宁静度假体验是如何形成的。",
                  })}
                </p>
              </div>

              <div className="pool-layer-scene relative mx-auto flex w-full max-w-[840px] flex-col items-end overflow-visible py-6 lg:py-10">
                <div className="pointer-events-none absolute inset-y-[8%] left-[4%] w-[280px] rounded-full bg-white/30 blur-3xl" />
                <div className="pointer-events-none absolute right-[8%] top-[10%] h-[240px] w-[240px] rounded-full bg-[#8fd7e8]/12 blur-3xl" />
                <div className="pointer-events-none absolute bottom-[6%] right-[6%] h-[180px] w-[360px] rounded-full bg-[#d9ebee]/18 blur-3xl" />

                <button
                  type="button"
                  aria-label={`Показать: ${guestsPoolStory.title}`}
                  onMouseEnter={() => setActivePoolStoryId(guestsPoolStory.id)}
                  onFocus={() => setActivePoolStoryId(guestsPoolStory.id)}
                  onClick={() => setActivePoolStoryId(guestsPoolStory.id)}
                  className="absolute left-[54%] top-[14%] z-40 hidden -translate-x-1/2 -translate-y-1/2"
                >
                  <TargetCue active={activePoolStoryId === guestsPoolStory.id} />
                </button>

                <button
                  type="button"
                  aria-label={`Показать: ${waterPoolStory.title}`}
                  onMouseEnter={() => setActivePoolStoryId(waterPoolStory.id)}
                  onFocus={() => setActivePoolStoryId(waterPoolStory.id)}
                  onClick={() => setActivePoolStoryId(waterPoolStory.id)}
                  className="absolute left-[46%] top-[46%] z-40 hidden -translate-x-1/2 -translate-y-1/2"
                >
                  <TargetCue active={activePoolStoryId === waterPoolStory.id} />
                </button>

                <button
                  type="button"
                  aria-label={`Показать: ${cleanPoolStory.title}`}
                  onMouseEnter={() => setActivePoolStoryId(cleanPoolStory.id)}
                  onFocus={() => setActivePoolStoryId(cleanPoolStory.id)}
                  onClick={() => setActivePoolStoryId(cleanPoolStory.id)}
                  className="absolute left-[45%] top-[81%] z-40 hidden -translate-x-1/2 -translate-y-1/2"
                >
                  <TargetCue active={activePoolStoryId === cleanPoolStory.id} />
                </button>

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

        <section id="restaurant" className="relative overflow-hidden bg-[#f7f0e8] py-20 scroll-mt-32 lg:py-24 sm:scroll-mt-36">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between" data-reveal>
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.32em] text-[#8a6548]">
                  {t(locale, { ru: "Ресторан и паб", en: "Restaurant and pub", zh: "餐厅与酒吧" })}
                </p>
                <h2 className="title-font mt-4 text-4xl leading-[1.06] text-[#1f2837] sm:text-5xl">
                  {t(locale, {
                    ru: "Когда ужин тоже становится частью впечатления",
                    en: "When dinner also becomes part of the experience",
                    zh: "当晚餐也成为度假体验的一部分",
                  })}
                </h2>
                <p className="mt-6 text-lg leading-8 text-[#5d5550]">
                  {t(locale, {
                    ru: "После термальных источников и прогулки можно спокойно поужинать на территории, остаться на вечер или вернуться в номер без лишних поездок.",
                    en: "After the thermal springs and a walk, you can have dinner on-site, stay for the evening, or return to your room without extra trips.",
                    zh: "体验完温泉热源和散步之后，您可以直接在园区内安心用餐、停留到夜晚，或回到房间休息，无需额外出行。",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {currentDiningCards.map((card) => (
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
                        {t(locale, { ru: "Забронировать столик", en: "Reserve a table", zh: "预订餐桌" })}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="relative overflow-hidden bg-[#0d1425] py-20 text-white scroll-mt-32 lg:py-24 sm:scroll-mt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,147,88,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(69,103,117,0.24),transparent_28%)]" />
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
              <div data-reveal>
                <p className="text-sm uppercase tracking-[0.32em] text-[#f0c996]">
                  {t(locale, { ru: "Контакты и бронирование", en: "Contacts and booking", zh: "联系与预订" })}
                </p>
                <h2 className="title-font mt-4 max-w-xl text-4xl leading-[1.06] text-white sm:text-5xl">
                  {t(locale, {
                    ru: "Приезжайте. Остальное соберём за вас.",
                    en: "Come over. We'll assemble the rest for you.",
                    zh: "只管出发，其余安排交给我们。",
                  })}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
                  {t(locale, {
                    ru: "Поможем с маршрутом, ответим на вопросы, подберём проживание и быстро подтвердим бронирование.",
                    en: "We'll help with the route, answer questions, match the stay format, and confirm the booking quickly.",
                    zh: "我们会帮您规划路线、解答问题、匹配住宿形式，并快速确认预订。",
                  })}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    t(locale, { ru: "Быстрая связь", en: "Quick contact", zh: "快速联系" }),
                    t(locale, { ru: "Понятные условия", en: "Clear conditions", zh: "条件清晰" }),
                    t(locale, { ru: "Маршрут и контакты", en: "Route and contacts", zh: "路线与联系方式" }),
                    t(locale, { ru: "Подтверждение без суеты", en: "Smooth confirmation", zh: "轻松确认" }),
                  ].map((item) => (
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
                    <p className="text-xs uppercase tracking-[0.3em] text-white/52">
                      {t(locale, { ru: "Бронирование проживания", en: "Accommodation booking", zh: "住宿预订" })}
                    </p>
                    <div className="mt-4 space-y-2">
                      {currentSite.bookingPhones.map((phone) => (
                        <a key={phone.tel} className="block text-2xl font-semibold text-white" href={`tel:${phone.tel}`}>
                          {phone.display}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={currentSite.telegramHref}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-5 py-4 text-base font-semibold text-white"
                      >
                        Telegram
                      </Link>
                      <Link
                        href={currentSite.maxHref}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-lux inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/5 px-5 py-4 text-base font-semibold text-white"
                      >
                        MAX
                      </Link>
                    </div>
                  </div>

                  <div className="window-motion rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/52">
                      {t(locale, { ru: "На территории комплекса", en: "On the resort grounds", zh: "园区内" })}
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="window-motion rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">{currentSite.restaurant.name}</p>
                        <p className="mt-2 text-sm leading-7 text-white/68">{currentSite.restaurant.hours}</p>
                        <a className="mt-2 block text-base text-white/84" href={`tel:${currentSite.restaurant.phoneTel}`}>
                          {currentSite.restaurant.phoneDisplay}
                        </a>
                      </div>
                      <div className="window-motion rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">{currentSite.pub.name}</p>
                        <p className="mt-2 text-sm leading-7 text-white/68">{currentSite.pub.hours}</p>
                        <a className="mt-2 block text-base text-white/84" href={`tel:${currentSite.pub.phoneTel}`}>
                          {currentSite.pub.phoneDisplay}
                        </a>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/68">
                      {t(locale, { ru: "Адрес", en: "Address", zh: "地址" })}: {currentSite.address}
                      <br />
                      E-mail:{" "}
                      <a className="underline underline-offset-4" href={`mailto:${currentSite.email}`}>
                        {currentSite.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6" data-reveal>
                <div className="window-motion overflow-hidden rounded-[34px] border border-white/10 bg-white/6 p-3 shadow-[0_28px_90px_rgba(3,8,20,0.28)] backdrop-blur-xl">
                  <div className="overflow-hidden rounded-[28px]">
                    <iframe
                      title={t(locale, {
                        ru: "Яндекс Карта — Спутник Камчатка",
                        en: "Yandex Map — Sputnik Kamchatka",
                        zh: "Yandex 地图 — Sputnik Kamchatka",
                      })}
                      src="https://yandex.ru/map-widget/v1/?mode=search&text=%D0%9A%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BA%D1%80%D0%B0%D0%B9%2C%20%D0%BF.%20%D0%9F%D0%B0%D1%80%D0%B0%D1%82%D1%83%D0%BD%D0%BA%D0%B0%2C%20%D1%83%D0%BB.%20%D0%95%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%2039&z=14"
                      width="100%"
                      height="420"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                  <div className="grid gap-3 p-5 md:grid-cols-2">
                    <a
                      href={yandexRouteHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-lux inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-base font-semibold text-white"
                    >
                      <MapPinIcon className="h-5 w-5" />
                      {t(locale, { ru: "Построить маршрут", en: "Build route", zh: "规划路线" })}
                    </a>
                    <a
                      href="/docs/sputnik-kamchatka.vcf"
                      className="btn-lux inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-base font-semibold text-white"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      {t(locale, { ru: "Сохранить контакты", en: "Save contacts", zh: "保存联系方式" })}
                    </a>
                  </div>
                </div>

                <div className="window-motion rounded-[34px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                  <div className="grid gap-5 md:grid-cols-[120px_minmax(0,1fr)] md:items-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f0cfaa,#b96f35)] text-2xl font-semibold text-white shadow-lg">
                      24/7
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#f0c996]">
                        {t(locale, { ru: "Быстрое бронирование", en: "Quick booking", zh: "快速预订" })}
                      </p>
                      <p className="title-font mt-2 text-3xl text-white">
                        {t(locale, { ru: "Готовы к перезагрузке?", en: "Ready to reset?", zh: "准备好好放松一下了吗？" })}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/72">
                        {t(locale, {
                          ru: "Проверим даты, соберём формат проживания и быстро подскажем лучший сценарий для вашей компании.",
                          en: "We'll check the dates, shape the stay format, and quickly suggest the best plan for your group.",
                          zh: "我们会确认日期、安排合适的住宿形式，并快速为您的同行人推荐最佳方案。",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`tel:${currentSite.bookingPhones[0].tel}`}
                      className="btn-lux inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d49358,#b76b32)] px-6 py-4 text-base font-semibold text-white"
                    >
                      {t(locale, { ru: "Позвонить и забронировать", en: "Call and book", zh: "致电预订" })}
                    </a>
                    <Link
                      href={currentSite.telegramHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-lux inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/8 px-6 py-4 text-base font-semibold text-white"
                    >
                      {t(locale, { ru: "Написать администратору", en: "Message the administrator", zh: "联系管理员" })}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#09111f]">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 py-8 text-sm text-white/62 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <BrandLogo className="h-auto w-[112px] sm:w-[120px]" />
            <p className="mt-2 max-w-xl leading-7">{currentSite.address}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="#accommodation" className="transition hover:text-white">
              {t(locale, { ru: "Проживание", en: "Stay", zh: "住宿" })}
            </Link>
            <Link href="#spa" className="transition hover:text-white">
              {t(locale, {
                ru: "SPA и термальные источники",
                en: "SPA & thermal springs",
                zh: "SPA 与温泉热源",
              })}
            </Link>
            <Link href="#restaurant" className="transition hover:text-white">
              {t(locale, { ru: "Ресторан", en: "Dining", zh: "餐饮" })}
            </Link>
            <Link href="#contacts" className="transition hover:text-white">
              {t(locale, { ru: "Контакты", en: "Contacts", zh: "联系" })}
            </Link>
          </div>
        </div>
      </footer>
      <FloatingActions />
    </div>
  );
}
