import Image from "next/image";
import Link from "next/link";

type Action = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  chips = [],
  actions = [],
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  chips?: string[];
  actions?: Action[];
}) {
  return (
    <section className="relative overflow-hidden pt-44 sm:pt-48 lg:pt-52">
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill priority className="hero-image-motion object-cover object-center" />
        <div className="hero-glow absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(213,146,89,0.16),transparent_36%),linear-gradient(100deg,rgba(4,9,18,0.92)_14%,rgba(7,13,24,0.74)_44%,rgba(8,12,21,0.48)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08101f]/45 via-[#08101f]/20 to-[#f7efe7]" />
        <div className="absolute inset-0 lux-noise opacity-70" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="max-w-4xl" data-reveal>
          <p className="text-sm uppercase tracking-[0.32em] text-[#f0c996]">{eyebrow}</p>
          <h1 className="title-font mt-4 text-4xl leading-[1.04] text-white sm:text-5xl lg:text-[4.35rem]">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">{description}</p>

          {chips.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="window-motion rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm text-white/82 backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}

          {actions.length ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className={`btn-lux inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold ${
                    action.variant === "secondary"
                      ? "border border-white/16 bg-white/8 text-white backdrop-blur"
                      : "bg-[linear-gradient(135deg,#d49358,#b76b32)] text-white"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
