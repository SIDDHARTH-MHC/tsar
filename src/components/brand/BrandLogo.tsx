import Image from "next/image";
import { cn } from "@/lib/cn";

export type BrandLogoVariant = "white" | "navy" | "gold";
export type BrandLogoSize = "sm" | "md" | "lg";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  className?: string;
  priority?: boolean;
  alt?: string;
};

const SRC: Record<BrandLogoVariant, string> = {
  white: "/brand/darbaar-by-tsar-white.png",
  navy: "/brand/darbaar-by-tsar-navy.png",
  gold: "/brand/darbaar-by-tsar-gold.png",
};

/** Fixed boxes so Next/Image cannot expand to intrinsic width (aspect ≈ 2.62 : 1) */
const SIZE: Record<BrandLogoSize, string> = {
  sm: "h-8 w-[5.25rem] sm:h-9 sm:w-[5.9rem]",
  md: "h-9 w-[5.9rem] sm:h-10 sm:w-[6.55rem] md:h-11 md:w-[7.2rem]",
  lg: "h-10 w-[6.55rem] sm:h-11 sm:w-[7.2rem] md:h-12 md:w-[7.85rem]",
};

/** Official Darbaar by tsar lockup — Devanagari + Latin */
export function BrandLogo({
  variant = "navy",
  size = "md",
  className,
  priority = false,
  alt = "Darbaar by tsar",
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden",
        SIZE[size],
        className,
      )}
    >
      <Image
        src={SRC[variant]}
        alt={alt}
        fill
        sizes="200px"
        priority={priority}
        className="object-contain object-left"
      />
    </span>
  );
}
