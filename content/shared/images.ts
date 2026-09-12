import type { ImageAsset } from "@/lib/types";

export const imageAssets = {
  hero: {
    src: "/images/placeholders/hero-16x9.avif",
    width: 1920,
    height: 1080,
  },
  portretA: {
    src: "/images/placeholders/portret-a-4x5.avif",
    width: 800,
    height: 1000,
  },
  portretB: {
    src: "/images/placeholders/portret-b-4x5.avif",
    width: 800,
    height: 1000,
  },
  portretMarleen: {
    src: "/images/placeholders/portret-marleen-4x5.avif",
    width: 800,
    height: 1000,
  },
  portretThomas: {
    src: "/images/placeholders/portret-thomas-4x5.avif",
    width: 800,
    height: 1000,
  },
  portretAnouk: {
    src: "/images/placeholders/portret-anouk-4x5.avif",
    width: 800,
    height: 1000,
  },
  hutslaapzaal: {
    src: "/images/placeholders/hutslaapzaal-3x2.avif",
    width: 1500,
    height: 1000,
  },
  graat: {
    src: "/images/placeholders/graat-3x2.avif",
    width: 1500,
    height: 1000,
  },
  meer: {
    src: "/images/placeholders/meer-3x2.avif",
    width: 1500,
    height: 1000,
  },
  dal: {
    src: "/images/placeholders/dal-3x2.avif",
    width: 1500,
    height: 1000,
  },
  priveGroep: {
    src: "/images/placeholders/prive-groep-3x2.avif",
    width: 1500,
    height: 1000,
  },
  overOnsSamen: {
    src: "/images/placeholders/over-ons-samen-3x2.avif",
    width: 1500,
    height: 1000,
  },
  ridgeFar: {
    src: "/images/placeholders/ridge-far.avif",
    width: 2400,
    height: 900,
  },
  ridgeMid: {
    src: "/images/placeholders/ridge-mid.avif",
    width: 2400,
    height: 700,
  },
  ridgeFore: {
    src: "/images/placeholders/ridge-fore.avif",
    width: 2400,
    height: 600,
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof imageAssets;
