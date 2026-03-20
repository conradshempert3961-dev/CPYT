import { Locale, t } from "@/lib/i18n";

const bookingPhones = [
  { display: "8-415-317-48-32", tel: "+74153174832" },
  { display: "8-800-301-28-88", tel: "+78003012888" },
];

const restaurantPhoneDisplay = "8-984-161-20-20";
const restaurantPhoneTel = "+79841612020";
const pubPhoneDisplay = "8 (909) 838 36 85";
const pubPhoneTel = "+79098383685";

export function getSiteContent(locale: Locale) {
  return {
    title: t(locale, {
      ru: "Спутник Камчатка",
      en: "Sputnik Kamchatka",
      zh: "堪察加 Sputnik 度假村",
    }),
    address: t(locale, {
      ru: "Камчатский край, с. Паратунка, ул. Елизова, 21",
      en: "21 Elizova St., Paratunka village, Kamchatka Krai",
      zh: "堪察加边疆区帕拉通卡村叶利佐娃街21号",
    }),
    siteUrl: "https://spkam.ru/",
    bookingPhones,
    restaurant: {
      name: t(locale, {
        ru: "Ресторан «Спутник»",
        en: "Sputnik Restaurant",
        zh: "Sputnik 餐厅",
      }),
      hours: t(locale, {
        ru: "пн-вс 13:00-23:00",
        en: "Mon-Sun 13:00-23:00",
        zh: "周一至周日 13:00-23:00",
      }),
      phoneDisplay: restaurantPhoneDisplay,
      phoneTel: restaurantPhoneTel,
      menuHref: "/docs/restaurant-menu.pdf",
    },
    pub: {
      name: t(locale, {
        ru: "Паб «Берлога»",
        en: "Berloga Pub",
        zh: "Berloga 酒吧",
      }),
      hours: t(locale, {
        ru: "пн-вс 12:00-23:00",
        en: "Mon-Sun 12:00-23:00",
        zh: "周一至周日 12:00-23:00",
      }),
      phoneDisplay: pubPhoneDisplay,
      phoneTel: pubPhoneTel,
      menuHref: "/docs/pub-menu.pdf",
    },
    telegramHref: "https://t.me/sputnik_kamchatka",
    maxHref:
      "https://max.ru/join/qUvK_BryrNV6nyfiOi0OlAKmeHYJDwMdhgTxl4NrE7M",
    email: "info@spkam.ru",
  };
}

export function getAccommodationContent(locale: Locale) {
  return {
    buildings: [
      {
        name: t(locale, {
          ru: "Корпус 1",
          en: "Building 1",
          zh: "1号楼",
        }),
        items: [
          {
            name: t(locale, {
              ru: "Стандарт",
              en: "Standard",
              zh: "标准房",
            }),
            notes: t(locale, {
              ru: "Спокойный базовый формат для пары или короткого заезда.",
              en: "A calm base option for a couple or a short stay.",
              zh: "适合情侣或短住的舒适基础房型。",
            }),
          },
          {
            name: t(locale, {
              ru: "Комфорт",
              en: "Comfort",
              zh: "舒适房",
            }),
            notes: t(locale, {
              ru: "Чуть больше пространства и более мягкий сценарий отдыха.",
              en: "A little more space and a softer rest experience.",
              zh: "空间更宽敞，度假节奏更从容。",
            }),
          },
        ],
      },
      {
        name: t(locale, {
          ru: "Корпус 2",
          en: "Building 2",
          zh: "2号楼",
        }),
        items: [
          {
            name: t(locale, {
              ru: "Улучшенный номер",
              en: "Superior room",
              zh: "高级客房",
            }),
            notes: t(locale, {
              ru: "Подходит для более выразительного и видового размещения.",
              en: "A good fit for a more scenic and expressive stay.",
              zh: "适合更有景观感和品质感的入住体验。",
            }),
          },
          {
            name: t(locale, {
              ru: "Семейный формат",
              en: "Family format",
              zh: "家庭房型",
            }),
            notes: t(locale, {
              ru: "Когда важно разместиться удобнее и без лишней тесноты.",
              en: "When you need more comfort and less crowding.",
              zh: "适合需要更舒适、更宽松空间的家庭入住。",
            }),
          },
        ],
      },
    ],
    cottages: {
      name: t(locale, {
        ru: "Коттеджи",
        en: "Cottages",
        zh: "别墅小屋",
      }),
      items: [
        {
          name: t(locale, {
            ru: "Семейный коттедж",
            en: "Family cottage",
            zh: "家庭别墅",
          }),
          notes: t(locale, {
            ru: "Приватный формат с отдельным ритмом отдыха.",
            en: "A private format with its own rest rhythm.",
            zh: "私密独立的度假方式，节奏更自在。",
          }),
        },
        {
          name: t(locale, {
            ru: "Коттедж для компании",
            en: "Cottage for a group",
            zh: "团体别墅",
          }),
          notes: t(locale, {
            ru: "Для небольших компаний и сценариев без соседей за стеной.",
            en: "For small groups and stays with more privacy.",
            zh: "适合小团体入住，更安静也更有私密性。",
          }),
        },
      ],
    },
  };
}

export function getEventsContent(locale: Locale) {
  return {
    items: [
      {
        title: t(locale, {
          ru: "Корпоративные заезды",
          en: "Corporate stays",
          zh: "企业团建入住",
        }),
        desc: t(locale, {
          ru: "Комбинация проживания, питания и термальных источников для командных выездов и рабочих групп.",
          en: "Accommodation, dining, and thermal springs combined for team trips and work groups.",
          zh: "把住宿、餐饮和温泉式热源体验结合起来，适合团队出行和工作小组。",
        }),
      },
      {
        title: t(locale, {
          ru: "Семейные выходные",
          en: "Family weekends",
          zh: "家庭周末",
        }),
        desc: t(locale, {
          ru: "Сценарии с проживанием, SPA и спокойным ритмом отдыха на территории комплекса.",
          en: "Stay, SPA, and a calm holiday rhythm all inside the resort.",
          zh: "包含住宿、SPA 和从容度假节奏的一站式家庭行程。",
        }),
      },
      {
        title: t(locale, {
          ru: "Праздники и частные даты",
          en: "Celebrations and private dates",
          zh: "庆典与私人活动",
        }),
        desc: t(locale, {
          ru: "Форматы для камерных мероприятий, ужинов и красивых персональных поездок.",
          en: "Formats for intimate events, dinners, and memorable private getaways.",
          zh: "适合私密活动、晚宴和精致私人出行的安排。",
        }),
      },
    ],
  };
}

export function getRestaurantContent(locale: Locale) {
  return {
    blocks: [
      {
        title: t(locale, {
          ru: "Ресторан «Спутник»",
          en: "Sputnik Restaurant",
          zh: "Sputnik 餐厅",
        }),
        desc: t(locale, {
          ru: "Основной ресторан комплекса для ужина, семейных сценариев и гостей с проживанием.",
          en: "The resort's main restaurant for dinner, family plans, and staying guests.",
          zh: "度假村主餐厅，适合晚餐、家庭用餐和住店客人。",
        }),
      },
      {
        title: t(locale, {
          ru: "Паб «Берлога»",
          en: "Berloga Pub",
          zh: "Berloga 酒吧",
        }),
        desc: t(locale, {
          ru: "Более камерный вечерний формат для компании и расслабленного завершения дня.",
          en: "A more intimate evening format for groups and a relaxed end to the day.",
          zh: "更适合朋友聚会和轻松结束一天的私密晚间空间。",
        }),
      },
    ],
  };
}

export function getSpaContent(locale: Locale) {
  return {
    pools: [
      {
        name: t(locale, {
          ru: "Открытый термальный бассейн",
          en: "Open-air thermal pool",
          zh: "露天温泉泳池",
        }),
        desc: t(locale, {
          ru: "Тёплая вода под открытым небом и мягкое ощущение перезагрузки.",
          en: "Warm water under the open sky and a gentle feeling of reset.",
          zh: "在露天环境中享受温暖水域，带来柔和放松的重启感。",
        }),
      },
      {
        name: t(locale, {
          ru: "SPA-зона",
          en: "SPA area",
          zh: "SPA 区域",
        }),
        desc: t(locale, {
          ru: "Процедуры, отдых и сценарий, который легко встроить в проживание.",
          en: "Treatments, rest, and a format that easily fits into your stay.",
          zh: "护理、放松与住宿体验自然结合的一整套安排。",
        }),
      },
      {
        name: t(locale, {
          ru: "Тихий термальный ритм",
          en: "Quiet thermal rhythm",
          zh: "安静的温泉节奏",
        }),
        desc: t(locale, {
          ru: "Формат, в котором вода, воздух и сервис работают как единое впечатление.",
          en: "A format where water, air, and service work as one unified impression.",
          zh: "水、空气与服务共同组成完整而舒缓的度假感受。",
        }),
      },
    ],
    faq: [
      {
        q: t(locale, {
          ru: "Можно приехать только на термальные источники?",
          en: "Can I come only for the thermal springs?",
          zh: "可以只来体验温泉热源吗？",
        }),
        a: t(locale, {
          ru: "Да, можно собрать сценарий без проживания и подобрать удобное время посещения.",
          en: "Yes, you can plan a visit without accommodation and choose a convenient time slot.",
          zh: "可以，不住宿也能安排访问，我们会帮您选择合适的时间。",
        }),
      },
      {
        q: t(locale, {
          ru: "Нужно ли бронировать заранее?",
          en: "Do I need to book in advance?",
          zh: "需要提前预订吗？",
        }),
        a: t(locale, {
          ru: "Лучше да: так мы сразу подскажем удобные часы и доступность.",
          en: "Preferably yes, so we can immediately suggest convenient times and availability.",
          zh: "建议提前预订，这样我们可以马上确认合适时段和可用情况。",
        }),
      },
    ],
  };
}
