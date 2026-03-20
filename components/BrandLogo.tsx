import Image from "next/image";

export default function BrandLogo({
  className = "h-auto w-[104px] sm:w-[118px]",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Спутник Камчатка"
      width={150}
      height={75}
      priority={priority}
      className={className}
    />
  );
}
