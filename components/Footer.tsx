import Link from "next/link";
import { site } from "@/lib/siteData";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09111f]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-8 text-sm text-white/62 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="title-font text-2xl tracking-[0.12em] text-[#f0d0ad]">СПУТНИК</p>
          <p className="mt-2 max-w-xl leading-7">{site.address}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/#accommodation" className="transition hover:text-white">
            Проживание
          </Link>
          <Link href="/#spa" className="transition hover:text-white">
            SPA и термы
          </Link>
          <Link href="/menu" className="transition hover:text-white">
            Меню
          </Link>
          <Link href="/#restaurant" className="transition hover:text-white">
            Ресторан
          </Link>
          <Link href="/#contacts" className="transition hover:text-white">
            Контакты
          </Link>
        </div>
      </div>
    </footer>
  );
}
