"use client";

import { useEffect } from "react";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY: number, duration = 750) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const start = performance.now();

  const step = (now: number) => {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, startY + diff * eased);
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export default function LuxInteractions() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    nodes.forEach((node, index) => {
      node.style.setProperty("--reveal-order", String(index % 6));
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));

    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      ev.preventDefault();

      const header = document.querySelector<HTMLElement>("header");
      const offset = header?.offsetHeight ? header.offsetHeight + 12 : 0;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      smoothScrollTo(y);
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);

    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
