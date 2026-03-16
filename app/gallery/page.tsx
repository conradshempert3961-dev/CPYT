import Image from "next/image";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

const gallery = [
  { src: "/images/gallery_01.jpg", alt: "Вечерний бассейн" },
  { src: "/images/gallery_02.jpg", alt: "Бассейн у корпуса" },
  { src: "/images/gallery_03.jpg", alt: "SPA-зона" },
  { src: "/images/gallery_04.jpg", alt: "Паб" },
  { src: "/images/gallery_05.jpg", alt: "Ресторан" },
  { src: "/images/gallery_08.jpg", alt: "Территория комплекса" },
  { src: "/images/room.jpg", alt: "Номер" },
  { src: "/images/cottage-living.jpg", alt: "Коттедж" },
  { src: "/images/cottage-exterior.jpg", alt: "Коттедж снаружи" },
];

export default function GalleryPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Галерея"
          title="Фотографии атмосферы, терм и проживания"
          description="Главные виды комплекса: термы, номера, коттеджи, ресторан и территория в одном обзоре."
          image="/images/gallery_01.jpg"
          chips={["Номера", "Коттеджи", "Термы", "Ресторан", "Территория"]}
          actions={[
            { href: "/#accommodation", label: "Смотреть проживание" },
            { href: "/#spa", label: "Открыть SPA", variant: "secondary" },
          ]}
        />

        <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gallery.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={`window-motion overflow-hidden rounded-[30px] border border-[#ead7c8] bg-white/84 shadow-[0_18px_50px_rgba(89,65,40,0.08)] ${
                  index % 4 === 0 ? "xl:col-span-2" : ""
                }`}
                data-reveal
              >
                <div className={`relative ${index % 4 === 0 ? "h-[360px]" : "h-[300px]"}`}>
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
