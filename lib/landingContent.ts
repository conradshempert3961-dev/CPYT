import { Locale, t } from "@/lib/i18n";
import type { getSiteContent } from "@/lib/siteContent";

type SiteContent = ReturnType<typeof getSiteContent>;

export type LandingNavItem = {
  href: string;
  label: string;
};

export type LandingHeroStat = {
  id: string;
  label: string;
  text: string;
  icon: "hotel" | "cottages" | "restaurant" | "pub" | "pool";
};

export type LandingHotspot = {
  id: string;
  title: string;
  caption: string;
  description: string;
  stat: string;
  details: string[];
  left: string;
  top: string;
  preview: {
    src: string;
    alt: string;
  };
  icon: "hotel" | "cottages" | "restaurant" | "pub" | "pool";
};

export type LandingHeroInfoPanel = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  description: string;
  accent: string;
  icon: "sparkles" | "phone";
};

export type LandingStayCard = {
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

export type LandingAtmosphereCard = {
  title: string;
  text: string;
  image: string;
  className: string;
};

export type LandingPoolStory = {
  id: string;
  title: string;
  description: string;
  short: string;
  image: string;
  alt: string;
};

export type LandingDiningCard = {
  title: string;
  text: string;
  image: string;
  hours: string;
  phone: string;
  phoneHref: string;
  href: string;
  action: string;
};

export function getLandingContent(locale: Locale, site: SiteContent) {
  return {
    navItems: [
      { href: "#accommodation", label: t(locale, { ru: "Проживание", en: "Stay", zh: "住宿" }) },
      {
        href: "#spa",
        label: t(locale, {
          ru: "SPA и термальные источники",
          en: "SPA & thermal springs",
          zh: "SPA 与温泉热源",
        }),
      },
      { href: "#restaurant", label: t(locale, { ru: "Ресторан", en: "Dining", zh: "餐饮" }) },
      { href: "#territory", label: t(locale, { ru: "Территория", en: "Grounds", zh: "园区" }) },
      { href: "#contacts", label: t(locale, { ru: "Контакты", en: "Contacts", zh: "联系" }) },
    ] satisfies LandingNavItem[],
    heroStats: [
      {
        id: "hotel",
        label: t(locale, { ru: "Корпус Спутник", en: "Sputnik building", zh: "Sputnik 主楼" }),
        text: t(locale, {
          ru: "Основное проживание и быстрый заезд",
          en: "Main accommodation and quick check-in",
          zh: "主要住宿区域，入住便捷",
        }),
        icon: "hotel",
      },
      {
        id: "cottages",
        label: t(locale, { ru: "Коттеджи", en: "Cottages", zh: "别墅小屋" }),
        text: t(locale, {
          ru: "Отдельный формат для семьи и компании",
          en: "A separate format for families and groups",
          zh: "适合家庭与团体的独立住宿形式",
        }),
        icon: "cottages",
      },
      {
        id: "pub",
        label: site.pub.name,
        text: t(locale, {
          ru: "Вечерний формат прямо на территории",
          en: "An evening format right on the grounds",
          zh: "位于园区内的晚间休闲空间",
        }),
        icon: "pub",
      },
      {
        id: "restaurant",
        label: site.restaurant.name,
        text: t(locale, {
          ru: "Спокойный ужин без выездов",
          en: "A calm dinner without extra trips",
          zh: "无需外出也能享受从容晚餐",
        }),
        icon: "restaurant",
      },
      {
        id: "pool",
        label: t(locale, {
          ru: "Термальные источники и SPA",
          en: "Thermal springs & SPA",
          zh: "温泉热源与 SPA",
        }),
        text: t(locale, {
          ru: "Тёплая вода, SPA и расслабляющий ритм отдыха",
          en: "Warm water, SPA, and a deeply relaxing holiday rhythm",
          zh: "温暖水域、SPA 与舒缓放松的度假节奏",
        }),
        icon: "pool",
      },
    ] satisfies LandingHeroStat[],
    heroHotspots: [
      {
        id: "hotel",
        title: t(locale, { ru: "Корпус Спутник", en: "Sputnik building", zh: "Sputnik 主楼" }),
        caption: t(locale, {
          ru: "Основной корпус с проживанием и быстрым заездом",
          en: "The main building with accommodation and quick check-in",
          zh: "主楼住宿区，入住便捷",
        }),
        description: t(locale, {
          ru: "Главный корпус комплекса, где удобно заселиться, выйти к бассейну и быстро включиться в отдых.",
          en: "The resort's main building where it's easy to check in, reach the pool, and settle into rest quickly.",
          zh: "度假村主楼，方便办理入住、前往泳池，并迅速进入放松状态。",
        }),
        stat: t(locale, { ru: "Основной корпус", en: "Main building", zh: "主楼" }),
        details: [
          t(locale, { ru: "Номера и категории", en: "Rooms and categories", zh: "客房与房型" }),
          t(locale, { ru: "Быстрое заселение", en: "Quick check-in", zh: "快速入住" }),
          t(locale, { ru: "Рядом с бассейном", en: "Near the pool", zh: "靠近泳池" }),
        ],
        left: "109.5%",
        top: "46.8%",
        preview: {
          src: "/images/hotel-exterior-real.png",
          alt: t(locale, {
            ru: "Корпус Спутник на территории комплекса",
            en: "Sputnik building on the resort grounds",
            zh: "园区内的 Sputnik 主楼",
          }),
        },
        icon: "hotel",
      },
      {
        id: "cottages",
        title: t(locale, { ru: "Коттеджи", en: "Cottages", zh: "别墅小屋" }),
        caption: t(locale, {
          ru: "Отдельный формат проживания для семьи и компании",
          en: "A separate stay format for families and groups",
          zh: "适合家庭和团体的独立住宿形式",
        }),
        description: t(locale, {
          ru: "Точка на коттедже за деревьями показывает более приватный формат отдыха и проживания.",
          en: "The point on the cottage behind the trees shows the more private stay format.",
          zh: "树林后的别墅小屋体现了更私密、更独立的入住体验。",
        }),
        stat: t(locale, { ru: "Приватный формат", en: "Private format", zh: "私密形式" }),
        details: [
          t(locale, { ru: "Для семьи и компании", en: "For families and groups", zh: "适合家庭与团体" }),
          t(locale, { ru: "Больше пространства", en: "More space", zh: "空间更大" }),
          t(locale, { ru: "Спокойный ритм", en: "Calm rhythm", zh: "节奏更安静" }),
        ],
        left: "74.8%",
        top: "43.8%",
        preview: {
          src: "/images/cottage-exterior-real.jpg",
          alt: t(locale, {
            ru: "Коттеджи на территории комплекса",
            en: "Cottages on the resort grounds",
            zh: "园区内的别墅小屋",
          }),
        },
        icon: "cottages",
      },
      {
        id: "pub",
        title: site.pub.name,
        caption: t(locale, {
          ru: "Камерный вечерний формат на территории комплекса",
          en: "An intimate evening format on the resort grounds",
          zh: "位于园区内、氛围更私密的晚间空间",
        }),
        description: t(locale, {
          ru: "Здание справа удобно считывать как вечернюю точку маршрута после воды и прогулки.",
          en: "The building on the right works as the evening stop after the water and a walk.",
          zh: "右侧这栋建筑适合作为温水体验和散步后的晚间停留点。",
        }),
        stat: t(locale, { ru: "Паб на территории", en: "Pub on-site", zh: "园区酒吧" }),
        details: [
          t(locale, { ru: "Вечерний формат", en: "Evening format", zh: "晚间场景" }),
          t(locale, { ru: "Барная атмосфера", en: "Bar atmosphere", zh: "酒吧氛围" }),
          t(locale, { ru: "Удобно после SPA", en: "Easy after SPA", zh: "适合 SPA 后前往" }),
        ],
        left: "63.2%",
        top: "47.6%",
        preview: {
          src: "/images/restaurant-pub-real.jpg",
          alt: t(locale, { ru: "Интерьер паба Берлога", en: "Berloga pub interior", zh: "Berloga 酒吧内景" }),
        },
        icon: "pub",
      },
      {
        id: "restaurant",
        title: site.restaurant.name,
        caption: t(locale, {
          ru: "Основной ресторан для спокойного ужина без выездов",
          en: "The main restaurant for a calm dinner without leaving the grounds",
          zh: "主餐厅，适合不出园区的从容晚餐",
        }),
        description: t(locale, {
          ru: "Точка на здании с конусной крышей показывает отдельный ресторанный сценарий прямо внутри комплекса.",
          en: "The point on the cone-roof building marks the restaurant part of the experience inside the resort.",
          zh: "锥形屋顶的建筑对应园区内独立的餐饮体验场景。",
        }),
        stat: t(locale, { ru: "Ресторан комплекса", en: "Resort restaurant", zh: "园区餐厅" }),
        details: [
          t(locale, { ru: "Основной ресторан", en: "Main restaurant", zh: "主餐厅" }),
          t(locale, { ru: "Спокойный ужин", en: "Calm dinner", zh: "从容晚餐" }),
          t(locale, { ru: "Бронирование столика", en: "Table booking", zh: "可预订餐桌" }),
        ],
        left: "71.4%",
        top: "64.2%",
        preview: {
          src: "/images/gallery_05.jpg",
          alt: t(locale, { ru: "Интерьер ресторана Спутник", en: "Sputnik restaurant interior", zh: "Sputnik 餐厅内景" }),
        },
        icon: "restaurant",
      },
      {
        id: "pool",
        title: t(locale, {
          ru: "Термальные источники и бассейн",
          en: "Thermal springs and pool",
          zh: "温泉热源与泳池",
        }),
        caption: t(locale, {
          ru: "Тёплая вода как центральная точка отдыха",
          en: "Warm water as the central point of the stay",
          zh: "温暖水域是整个度假的核心体验",
        }),
        description: t(locale, {
          ru: "Отдельная точка на бассейне сразу показывает, где начинается главный сценарий расслабления.",
          en: "A separate point on the pool shows where the main relaxation experience begins.",
          zh: "泳池上的独立点位可以直接看出整套放松体验从哪里开始。",
        }),
        stat: t(locale, { ru: "Тёплая вода", en: "Warm water", zh: "温暖水域" }),
        details: [
          t(locale, { ru: "Открытый бассейн", en: "Open-air pool", zh: "露天泳池" }),
          t(locale, { ru: "SPA рядом", en: "SPA nearby", zh: "SPA 就在附近" }),
          t(locale, { ru: "Можно приехать на день", en: "Available for day visits", zh: "可当天往返" }),
        ],
        left: "38.6%",
        top: "83.0%",
        preview: {
          src: "/images/gallery_01.jpg",
          alt: t(locale, { ru: "Термальный бассейн комплекса", en: "The resort's thermal pool", zh: "度假村温泉泳池" }),
        },
        icon: "pool",
      },
    ] satisfies LandingHotspot[],
    heroInfoPanels: [
      {
        id: "interactive",
        eyebrow: t(locale, {
          ru: "с. Паратунка · ул. Елизова, 21",
          en: "Paratunka village · 21 Elizova St.",
          zh: "帕拉通卡村 · 叶利佐娃街21号",
        }),
        title: t(locale, {
          ru: "Смотрите, где что находится",
          en: "See where everything is",
          zh: "一眼看清每个点位",
        }),
        lead: t(locale, {
          ru: "Наводите на точки, чтобы увидеть корпус, коттеджи, паб, ресторан и бассейн прямо поверх главного кадра.",
          en: "Hover the points to see the main building, cottages, pub, restaurant, and pool over the hero shot.",
          zh: "将光标移到点位上，即可在主画面里看到主楼、别墅小屋、酒吧、餐厅和泳池。",
        }),
        description: t(locale, {
          ru: "Так территория считывается быстрее: где жить, где отдыхать у воды и как собрать всё в один маршрут.",
          en: "This makes the grounds easier to read: where to stay, where to relax by the water, and how it all fits one route.",
          zh: "这样更容易理解园区布局：住在哪里、去哪里泡温水，以及如何把所有体验串成一条完整路线。",
        }),
        accent: t(locale, {
          ru: "Корпус • коттеджи • паб • ресторан • бассейн",
          en: "Building • cottages • pub • restaurant • pool",
          zh: "主楼 • 别墅小屋 • 酒吧 • 餐厅 • 泳池",
        }),
        icon: "sparkles",
      },
      {
        id: "contact",
        eyebrow: t(locale, { ru: "Быстрый контакт", en: "Quick contact", zh: "快速联系" }),
        title: t(locale, { ru: "Связь без лишних шагов", en: "Contact without extra steps", zh: "无需绕路，快速联系" }),
        lead: t(locale, {
          ru: "Подбор номера, заезд, термальные источники и ресторан можно закрыть прямо с первого экрана одним касанием.",
          en: "Room choice, arrival, thermal springs, and dining can all be handled right from the first screen.",
          zh: "选房、入住、温泉热源体验和餐饮，都可以在首屏快速完成沟通。",
        }),
        description: t(locale, {
          ru: "Администратор поможет быстро подобрать проживание, термальные источники и удобный вариант бронирования.",
          en: "The administrator will quickly help with accommodation, thermal springs, and the right booking option.",
          zh: "管理员会快速帮您安排住宿、温泉热源体验以及合适的预订方式。",
        }),
        accent: site.bookingPhones[0].display,
        icon: "phone",
      },
    ] satisfies LandingHeroInfoPanel[],
    stayCollections: [
      {
        id: "rooms",
        label: t(locale, { ru: "Номера в корпусе", en: "Rooms in the main building", zh: "主楼客房" }),
        intro: t(locale, {
          ru: "Удобный формат для коротких и длинных заездов, когда нужен спокойный отдых с быстрым доступом ко всем зонам комплекса.",
          en: "A convenient format for short and long stays when you want calm rest with quick access to the whole resort.",
          zh: "适合短住和长住，既安静舒适，又能快速到达园区各个区域。",
        }),
        title: t(locale, {
          ru: "Номера, где всё собрано без перегруза",
          en: "Rooms where everything feels balanced",
          zh: "舒适平衡、不过度堆砌的客房体验",
        }),
        description: t(locale, {
          ru: "Светлые интерьеры, аккуратный сервис и простая логика отдыха: быстро заселиться, спокойно отдохнуть, выйти к бассейнам и вернуться в тишину.",
          en: "Bright interiors, tidy service, and a simple rest flow: check in quickly, relax, head to the pools, and return to silence.",
          zh: "明亮内饰、细致服务，以及清晰的度假动线：快速入住、安静休息、前往泳池，再回到宁静之中。",
        }),
        sideText: t(locale, {
          ru: "Если нужен понятный сценарий без долгих выборов, это самый удобный формат: для пары, делового заезда или уикенда в тепле.",
          en: "If you want a clear stay format without long choices, this is the easiest option for couples, business trips, or a warm weekend.",
          zh: "如果您想要清晰直接的入住方式，不必花太多时间选择，这会是情侣、商务或周末放松的理想方案。",
        }),
        badges: [
          t(locale, { ru: "Для 1-2 гостей", en: "For 1-2 guests", zh: "适合1-2位客人" }),
          t(locale, { ru: "Быстрые заезды", en: "Quick arrivals", zh: "入住便捷" }),
        ],
        features: [
          t(locale, { ru: "Вид на сопки", en: "Hill views", zh: "山景视野" }),
          t(locale, { ru: "Тихие этажи", en: "Quiet floors", zh: "安静楼层" }),
          t(locale, { ru: "Рядом с бассейном", en: "Close to the pool", zh: "靠近泳池" }),
          t(locale, { ru: "Удобно для коротких поездок", en: "Easy for short trips", zh: "适合短途入住" }),
        ],
        note: t(locale, {
          ru: "Подскажем, какой корпус и категория подойдут именно под ваши даты и состав гостей.",
          en: "We'll help choose the right building and category for your dates and guest count.",
          zh: "我们会根据您的日期和人数，帮您选择合适的楼栋和房型。",
        }),
        gallery: [
          { src: "/images/room-standard-sputnik-2.png", alt: t(locale, { ru: "Зона отдыха в стандартном номере", en: "Seating area in a standard room", zh: "标准客房休息区" }), label: t(locale, { ru: "Стандарт", en: "Standard", zh: "标准房" }) },
          { src: "/images/room-standard-balcony-1.png", alt: t(locale, { ru: "Стандарт с балконом", en: "Standard room with balcony", zh: "带阳台标准房" }), label: t(locale, { ru: "Стандарт с балконом", en: "Standard with balcony", zh: "带阳台标准房" }) },
          { src: "/images/room-standard-balcony-2.png", alt: t(locale, { ru: "Стандартный номер с балконной дверью", en: "Standard room with balcony door", zh: "带阳台门的标准客房" }), label: t(locale, { ru: "Стандарт с балконом", en: "Standard with balcony", zh: "带阳台标准房" }) },
        ],
      },
      {
        id: "improved",
        label: t(locale, { ru: "Улучшенные категории", en: "Upgraded categories", zh: "升级房型" }),
        intro: t(locale, {
          ru: "Больше воздуха, больше света и тот формат, который хочется выбирать для неспешных выходных или поездки в особом настроении.",
          en: "More air, more light, and the format you choose for slow weekends or a special trip.",
          zh: "更多空间、更多光线，适合慢节奏周末或有特别氛围的出行。",
        }),
        title: t(locale, {
          ru: "Категории, где появляется ощущение премиального отдыха",
          en: "Categories where the premium feeling begins",
          zh: "更能体现高品质度假感受的房型",
        }),
        description: t(locale, {
          ru: "Эти номера работают на впечатление: простор, аккуратные детали, видовые окна и ощущение, что отдых собран не просто удобно, а красиво.",
          en: "These rooms work through impression: space, precise details, scenic windows, and a stay that feels not just convenient but beautiful.",
          zh: "这些房型更强调体验感：更宽敞、细节更讲究、窗景更好，让度假不只是方便，更显精致。",
        }),
        sideText: t(locale, {
          ru: "Подойдут для пары, особого повода или неспешных выходных, когда хочется больше света, простора и тишины.",
          en: "A good fit for couples, special occasions, or slow weekends when you want more light, space, and silence.",
          zh: "适合情侣、特别时刻，或想要更多光线、空间与安静感的周末入住。",
        }),
        badges: [
          t(locale, { ru: "Для пары", en: "For couples", zh: "适合情侣" }),
          t(locale, { ru: "Больше пространства", en: "More space", zh: "空间更大" }),
        ],
        features: [
          t(locale, { ru: "Панорамный свет", en: "Panoramic light", zh: "采光通透" }),
          t(locale, { ru: "Более выразительный интерьер", en: "More expressive interior", zh: "内饰更有质感" }),
          t(locale, { ru: "Повышенный комфорт", en: "Higher comfort", zh: "更高舒适度" }),
          t(locale, { ru: "Подходит для особых дат", en: "Good for special dates", zh: "适合特别时刻" }),
        ],
        note: t(locale, {
          ru: "Можно собрать сценарий с проживанием, термальными источниками и ужином в одном бронировании.",
          en: "You can combine accommodation, thermal springs, and dinner in one booking.",
          zh: "可以把住宿、温泉热源体验和晚餐一次性安排在同一预订里。",
        }),
        gallery: [
          { src: "/images/room-premium-standard-1.png", alt: t(locale, { ru: "Премиум стандарт с большим окном", en: "Premium standard with large window", zh: "带大窗的高级标准房" }), label: t(locale, { ru: "Премиум стандарт", en: "Premium standard", zh: "高级标准房" }) },
          { src: "/images/room-premium-standard-2.png", alt: t(locale, { ru: "Премиум стандарт в светлых тонах", en: "Premium standard in bright tones", zh: "浅色调高级标准房" }), label: t(locale, { ru: "Премиум стандарт", en: "Premium standard", zh: "高级标准房" }) },
          { src: "/images/room-lux-sputnik-1.png", alt: t(locale, { ru: "Люкс в корпусе Спутник", en: "Suite in Sputnik building", zh: "Sputnik 主楼套房" }), label: t(locale, { ru: "Люкс", en: "Suite", zh: "套房" }) },
          { src: "/images/room-lux-kitchen-1.png", alt: t(locale, { ru: "Люкс с кухней", en: "Suite with kitchen", zh: "带厨房套房" }), label: t(locale, { ru: "Люкс с кухней", en: "Suite with kitchen", zh: "带厨房套房" }) },
        ],
      },
      {
        id: "cottages",
        label: t(locale, { ru: "Коттеджи", en: "Cottages", zh: "别墅小屋" }),
        intro: t(locale, {
          ru: "Приватный формат для тех, кто хочет отдыхать отдельно: своей компанией, семьёй или в режиме «никто не мешает».",
          en: "A private format for those who want to rest separately: with their own group, family, or in full quiet.",
          zh: "适合希望独立休息的人群：和家人朋友一起，或享受不被打扰的安静状态。",
        }),
        title: t(locale, {
          ru: "Коттеджи с ощущением собственной территории",
          en: "Cottages with the feeling of your own territory",
          zh: "拥有专属空间感的别墅小屋",
        }),
        description: t(locale, {
          ru: "Отдельный вход, больше личного пространства, спокойный ритм и ощущение, что отдых разворачивается вокруг вашей компании, а не наоборот.",
          en: "A separate entrance, more private space, a calm rhythm, and the feeling that the stay unfolds around your own group.",
          zh: "独立入口、更私密的空间、更安静的节奏，让整段度假围绕您自己的同行人展开。",
        }),
        sideText: t(locale, {
          ru: "Подойдут тем, кто ценит тишину, отдельность и ощущение собственного пространства для семьи или компании.",
          en: "A strong fit for those who value quiet, separation, and their own space for family or friends.",
          zh: "适合重视安静、独立性，以及家庭或朋友专属空间感的人。",
        }),
        badges: [
          t(locale, { ru: "Для компании", en: "For groups", zh: "适合团体" }),
          t(locale, { ru: "Приватный формат", en: "Private format", zh: "私密形式" }),
        ],
        features: [
          t(locale, { ru: "Отдельное размещение", en: "Separate accommodation", zh: "独立入住" }),
          t(locale, { ru: "Подходит для семьи", en: "Good for family", zh: "适合家庭" }),
          t(locale, { ru: "Больше свободы", en: "More freedom", zh: "更自由" }),
          t(locale, { ru: "Атмосфера загородного отдыха", en: "Country-style atmosphere", zh: "更有度假别墅氛围" }),
        ],
        note: t(locale, {
          ru: "Хороший выбор для тех, кто хочет отдыхать в своём ритме и не зависеть от общего потока.",
          en: "A strong choice for those who want their own rhythm without depending on the general flow.",
          zh: "适合希望按自己的节奏休息、不受整体人流影响的客人。",
        }),
        gallery: [
          { src: "/images/cottage-living-real.jpg", alt: t(locale, { ru: "Гостиная в коттедже", en: "Living room in a cottage", zh: "别墅客厅" }), label: t(locale, { ru: "Гостиная", en: "Living room", zh: "客厅" }) },
          { src: "/images/cottage-room-real.jpg", alt: t(locale, { ru: "Спальня в коттедже", en: "Bedroom in a cottage", zh: "别墅卧室" }), label: t(locale, { ru: "Спальня", en: "Bedroom", zh: "卧室" }) },
          { src: "/images/cottage-dining-real.jpg", alt: t(locale, { ru: "Столовая зона в коттедже", en: "Dining area in a cottage", zh: "别墅餐区" }), label: t(locale, { ru: "Кухня-столовая", en: "Kitchen-dining area", zh: "厨房餐区" }) },
          { src: "/images/cottage-exterior-real.jpg", alt: t(locale, { ru: "Фасад коттеджа зимой", en: "Cottage exterior in winter", zh: "冬季别墅外观" }), label: t(locale, { ru: "Фасад", en: "Exterior", zh: "外观" }) },
        ],
      },
    ] satisfies LandingStayCard[],
    atmosphereCards: [
      {
        title: t(locale, { ru: "Номера и коттеджи", en: "Rooms and cottages", zh: "客房与别墅小屋" }),
        text: t(locale, {
          ru: "Разный формат размещения под короткий заезд, семейный отдых и приватный сценарий.",
          en: "Different accommodation formats for short stays, family rest, and more private scenarios.",
          zh: "适合短住、家庭度假和更私密入住需求的多种住宿形式。",
        }),
        image: "/images/cottage-room-real.jpg",
        className: "",
      },
      {
        title: t(locale, { ru: "Термальные бассейны и SPA", en: "Thermal pools and SPA", zh: "温泉泳池与 SPA" }),
        text: t(locale, {
          ru: "Тёплая вода, процедуры и расслабляющий ритм без выездов с территории.",
          en: "Warm water, treatments, and a relaxing rhythm without leaving the grounds.",
          zh: "温暖水域、护理体验，以及无需离开园区的放松节奏。",
        }),
        image: "/images/gallery_01.jpg",
        className: "",
      },
      {
        title: t(locale, { ru: "Ресторан и паб", en: "Restaurant and pub", zh: "餐厅与酒吧" }),
        text: t(locale, {
          ru: "Еда, ужин и вечерний формат прямо на месте, когда отдых не надо дробить на поездки.",
          en: "Meals, dinner, and evening plans on-site, so the rest doesn't split into extra trips.",
          zh: "餐饮、晚餐和夜间活动都在园区内完成，不必把度假切成一次次奔波。",
        }),
        image: "/images/restaurant-pub-real.jpg",
        className: "",
      },
      {
        title: t(locale, { ru: "Территория для отдыха", en: "Grounds for rest", zh: "放松休闲园区" }),
        text: t(locale, {
          ru: "Тишина, снег, прогулки и ощущение отдельного мира, где не нужно спешить.",
          en: "Silence, snow, walks, and the feeling of a separate world where there is no need to rush.",
          zh: "安静、雪景、散步路线，以及一个无需匆忙的独立世界感。",
        }),
        image: "/images/territory-walk-real.png",
        className: "",
      },
      {
        title: t(locale, { ru: "Ресепшен и заселение", en: "Reception and check-in", zh: "前台与入住" }),
        text: t(locale, {
          ru: "Стойка ресепшен, быстрое оформление и помощь администратора сразу при заезде без лишней суеты.",
          en: "Reception desk, quick check-in, and administrator support right on arrival without extra fuss.",
          zh: "前台办理顺畅，入住快速，管理员从抵达开始就会协助您。",
        }),
        image: "/images/reception-real.jpg",
        className: "md:col-span-2",
      },
    ] satisfies LandingAtmosphereCard[],
    poolStories: [
      {
        id: "clean",
        title: t(locale, { ru: "Чистота и контроль", en: "Cleanliness and control", zh: "洁净与管理" }),
        description: t(locale, {
          ru: "Мы ежедневно контролируем состояние бассейна, чистоту чаши и комфортную температуру, чтобы отдых оставался спокойным и безупречно подготовленным.",
          en: "We monitor the pool, the bowl, and the comfortable temperature every day so the stay feels calm and well prepared.",
          zh: "我们每天都会检查泳池状态、池体洁净度和舒适水温，让度假体验始终平稳而妥帖。",
        }),
        short: t(locale, {
          ru: "Ежедневный уход, порядок и стабильная температура для предсказуемо приятного отдыха.",
          en: "Daily care, order, and stable temperature for a predictably pleasant stay.",
          zh: "每日维护、整洁环境和稳定水温，让体验始终舒适可预期。",
        }),
        image: "/images/pool-layer-clean.png",
        alt: t(locale, { ru: "Пустой бассейн перед подготовкой", en: "Empty pool before preparation", zh: "准备前的空泳池" }),
      },
      {
        id: "water",
        title: t(locale, { ru: "Термальная вода", en: "Thermal water", zh: "温泉热水" }),
        description: t(locale, {
          ru: "Термальная вода создаёт то самое мягкое тепло и глубину ощущений, ради которых сюда приезжают за тишиной, расслаблением и восстановлением.",
          en: "Thermal water creates the soft warmth and depth of feeling people come for: silence, relaxation, and recovery.",
          zh: "温泉热水带来柔和而深层的温暖感受，这正是人们来这里寻找安静、放松与恢复的原因。",
        }),
        short: t(locale, {
          ru: "Мягкое тепло, пар и водная среда создают ощущение глубокого расслабления и восстановления.",
          en: "Soft warmth, steam, and water create a feeling of deep relaxation and recovery.",
          zh: "柔和热度、蒸汽与水环境共同形成深度放松和修复感。",
        }),
        image: "/images/pool-layer-water.png",
        alt: t(locale, { ru: "Слой термальной воды", en: "Layer of thermal water", zh: "温泉热水层" }),
      },
      {
        id: "guests",
        title: t(locale, { ru: "Что получает гость", en: "What the guest receives", zh: "客人最终获得什么" }),
        description: t(locale, {
          ru: "В итоге человек получает больше, чем просто купание: тепло, визуальные впечатления, эмоциональную перезагрузку и спокойный отдых, который хочется продлить.",
          en: "In the end, the guest receives more than a swim: warmth, visual impressions, emotional reset, and the kind of calm stay you want to extend.",
          zh: "最终得到的不只是一次泡水体验，而是温暖感、视觉享受、情绪重启，以及想延长下去的宁静度假状态。",
        }),
        short: t(locale, {
          ru: "Перезагрузка, впечатления, спокойствие и то состояние, которым хочется делиться с близкими.",
          en: "Reset, impressions, calm, and a feeling you want to share with those close to you.",
          zh: "重启感、好印象、平静状态，以及想与亲近之人分享的舒适体验。",
        }),
        image: "/images/pool-layer-guests.png",
        alt: t(locale, { ru: "Бассейн с гостями", en: "Pool with guests", zh: "有客人的泳池" }),
      },
    ] satisfies LandingPoolStory[],
    diningCards: [
      {
        title: site.restaurant.name,
        text: t(locale, {
          ru: "Основной ресторан комплекса для спокойного ужина, семейных сценариев и бронирований под проживание.",
          en: "The resort's main restaurant for calm dinners, family plans, and table booking alongside accommodation.",
          zh: "度假村主餐厅，适合安静晚餐、家庭用餐，以及与住宿一起安排的餐桌预订。",
        }),
        image: "/images/gallery_05.jpg",
        hours: site.restaurant.hours,
        phone: site.restaurant.phoneDisplay,
        phoneHref: `tel:${site.restaurant.phoneTel}`,
        href: "/menu",
        action: t(locale, { ru: "Открыть меню", en: "Open menu", zh: "打开菜单" }),
      },
      {
        title: site.pub.name,
        text: t(locale, {
          ru: "Более камерный формат для вечернего настроения, компании и неформального завершения дня.",
          en: "A more intimate format for evening mood, groups, and an informal end to the day.",
          zh: "更适合夜晚氛围、朋友相聚以及轻松结束一天的私密空间。",
        }),
        image: "/images/gallery_04.jpg",
        hours: site.pub.hours,
        phone: site.pub.phoneDisplay,
        phoneHref: `tel:${site.pub.phoneTel}`,
        href: "/menu",
        action: t(locale, { ru: "Открыть меню", en: "Open menu", zh: "打开菜单" }),
      },
    ] satisfies LandingDiningCard[],
  };
}
