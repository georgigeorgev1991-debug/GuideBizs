import { site } from "@/lib/site";
import type { ImageKey } from "@/content/shared/images";

export const imageAlts: Record<ImageKey, string> = {
  hero: `Sunrise over granite peaks and a still glacial lake in the ${site.range}`,
  portretA: "Lotte on a mountain path, daypack on, pine forest behind",
  portretB: "Niels beside a painted red route mark on granite",
  portretMarleen: "Marleen van Dijk, smiling, cap and wind jacket",
  portretThomas: "Thomas Peeters with binoculars around the neck",
  portretAnouk: "Anouk de Vries, sitting on a rock with a lake view",
  hutslaapzaal: "Bunks in a Bulgarian mountain hut, wool blankets, a small window onto pines",
  graat: `A narrow granite ridge in the ${site.range}, red paint on the rock`,
  meer: "Turquoise glacial lake among scree, no buildings on the shore",
  dal: "Wooden guesthouse in a valley meadow, washing lines and a woodpile",
  priveGroep: "A small group on a quiet path, packs on, the van out of sight behind pines",
  overOnsSamen: "Lotte and Niels side by side on the path, the red mark on granite behind them",
  ridgeFar: "Distant granite horizon without figures, sky cut out",
  ridgeMid: "Mid ridge with a painted red mark, sky cut out",
  ridgeFore: "Foreground rock and pine in the lower third, sky cut out",
};
