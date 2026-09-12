import { site } from "@/lib/site";

export const about = {
  h1: "Wij wonen in het dal. De bus rijden we zelf.",
  lead: `Lotte en Niels. Allebei Nederlandstalig als moedertaal, allebei woonachtig in Bulgarije. Geen kantoor in de Randstad, geen stem op een bandje.`,
  story: [
    `We leerden deze paden niet uit een brochure. Lotte groeide Nederlandstalig op en woont hier. De ${site.range} loopt ze al twaalf seizoenen, winter en zomer: dezelfde hutbazen, dezelfde bronnen die in augustus nog lopen, dezelfde helling die je na regen beter links laat liggen.`,
    `Niels verhuisde naar het dal onder de berg omdat het pad hier nog stil is. Ook hij spreekt Nederlands als moedertaal. Samen koken we de picknick, slapen we in dezelfde slaapzaal als jullie, en rijden we de bus van negen zitplaatsen zelf. ${site.brand} is klein omdat die bus klein is. Meer willen we niet.`,
    `Op terrein waar zekerheid telt — glad graniet, een natte traverse, een dag waarop de mist op de graat gaat liggen — lopen we met een gecertificeerde lokale gids. Geen heldendom. Jullie bellen ${site.phone} en je krijgt een van ons twee.`,
  ],
} as const;
