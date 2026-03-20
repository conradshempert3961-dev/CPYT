"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-[color:var(--light-gray)] bg-white/80 backdrop-blur overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[color:var(--dark-blue)] font-semibold">{it.q}</span>
              <span
                className={
                  "h-9 w-9 rounded-full border border-[color:var(--light-gray)] bg-white flex items-center justify-center transition-transform duration-300 " +
                  (isOpen ? "rotate-45" : "rotate-0")
                }
                aria-hidden="true"
              >
                <span className="text-xl leading-none text-[color:var(--dark-blue)]">+</span>
              </span>
            </button>

            <div
              className={
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] " +
                (isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
              }
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const defaultFaqItems: Item[] = [
  {
    "q": "Во сколько заезд и выезд?",
    "a": "Заезд и выезд зависят от тарифа и загрузки. При бронировании покажем точные условия, а при необходимости предложим удобный вариант."
  },
  {
    "q": "Можно ли приехать без проживания — просто в SPA/на термальные источники?",
    "a": "Да, можно. Доступность по времени лучше уточнить заранее — подскажем оптимальное окно."
  },
  {
    "q": "Нужно ли заранее бронировать SPA или стол в ресторане?",
    "a": "Рекомендуем бронировать заранее, особенно в выходные и праздничные дни — так мы закрепим удобное время."
  },
  {
    "q": "Можно ли с детьми?",
    "a": "Да. Для семейного отдыха у нас предусмотрена инфраструктура и формат отдыха на территории."
  },
  {
    "q": "Какой формат выбрать: проживание или SPA-день?",
    "a": "Если хотите “полную перезагрузку” — лучше проживание. Если нужно быстро восстановиться — SPA-день. Напишите нам даты и состав — подскажем."
  },
  {
    "q": "Есть ли шумные программы по вечерам?",
    "a": "Иногда проходят мероприятия. Если вам важна тишина — подберём размещение и формат отдыха с учётом этого."
  },
  {
    "q": "Что входит в стоимость и какие дополнительные услуги есть?",
    "a": "Состав услуг зависит от выбранного тарифа/категории. При бронировании всё будет указано прозрачно, без сюрпризов."
  },
  {
    "q": "Как добраться и сколько времени в пути?",
    "a": "Подскажем маршрут, ориентиры по дороге и при необходимости поможем с трансфером."
  }
];
