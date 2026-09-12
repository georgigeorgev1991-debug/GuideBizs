import { site } from "@/lib/site";
import type { ImageKey } from "@/content/shared/images";

export const imageAlts: Record<ImageKey, string> = {
  hero: `Zonsopkomst over granieten toppen en een still gletsjermeer in de ${site.range}`,
  portretA: "Portret van Lotte op een bergpad, dagrugzak om, dennenbos op de achtergrond",
  portretB: "Portret van Niels bij een beschilderde rode routemarkering op graniet",
  portretMarleen: "Portret van Marleen van Dijk, lachend, met een pet en een windjack",
  portretThomas: "Portret van Thomas Peeters met een verrekijker om de hals",
  portretAnouk: "Portret van Anouk de Vries, zittend op een rots met zicht op een meer",
  hutslaapzaal:
    "Stapelbedden in een Bulgaarse berghut, wollen dekens, klein raam met uitzicht op dennen",
  graat: `Een smalle granieten graat in de ${site.range}, rode markering op de rots`,
  meer: "Turkoois gletsjermeer tussen puinhellingen, geen bebouwing aan de oever",
  dal: "Houten guesthouse in een dalweide, waslijnen en een houtstapel naast de deur",
  priveGroep: "Kleine groep op een stil pad, rugzakken om, de bus uit zicht achter een dennenrij",
  overOnsSamen: "Lotte en Niels naast elkaar op het pad, de rode markering op graniet achter hen",
  ridgeFar: "Verre granieten horizon zonder figuren, lucht uitgesneden",
  ridgeMid: "Middenplan van de graat met een beschilderde rode markering, lucht uitgesneden",
  ridgeFore: "Voorgrondrots en den in het onderste derde, lucht uitgesneden",
};
