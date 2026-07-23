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

/** Fixed boxes so Next/Image cannot expand to intrinsic 1400px width */
const SIZE: Record<BrandLogoSize, string> = {
  sm: "h-8 w-[7.5rem] sm:h-9 sm:w-[8.75rem]",
  md: "h-9 w-[8.75rem] sm:h-10 sm:w-[10rem] md:h-11 md:w-[11.5rem]",
  lg: "h-10 w-[10rem] sm:h-11 sm:w-[11.5rem] md:h-12 md:w-[13rem]",
};

/** Official Darbaar by TSAR lockup — aspect ≈ 3.2 : 1 */
export function BrandLogo({
  variant = "navy",
  size = "md",
  className,
  priority = false,
  alt = "Darbaar by TSAR",
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
