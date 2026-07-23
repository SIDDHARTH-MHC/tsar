import Image from "next/image";
import { cn } from "@/lib/cn";

export type BrandLogoVariant = "white" | "navy" | "gold";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
  /** Accessible label; defaults to brand name */
  alt?: string;
};

const SRC: Record<BrandLogoVariant, string> = {
  white: "/brand/darbaar-by-tsar-white.png",
  navy: "/brand/darbaar-by-tsar-navy.png",
  gold: "/brand/darbaar-by-tsar-gold.png",
};

/** Official Darbaar by TSAR lockup — aspect ≈ 3.2 : 1 */
export function BrandLogo({
  variant = "navy",
  className,
  priority = false,
  alt = "Darbaar by TSAR",
}: BrandLogoProps) {
  return (
    <Image
      src={SRC[variant]}
      alt={alt}
      width={1400}
      height={437}
      priority={priority}
      className={cn(
        "h-9 w-auto max-w-[min(72vw,220px)] object-contain object-left sm:h-10 sm:max-w-[240px] md:h-11 md:max-w-[280px]",
        className,
      )}
    />
  );
}
