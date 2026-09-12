# Fotografie — opnamebriefing voor in het veld

Echte platen ontbreken nog. De site is zo gebouwd dat jullie alleen bestanden **op dezelfde plek, met dezelfde afmetingen** vervangen. Geen code, geen CMS. Pad: `public/images/placeholders/` — dezelfde bestandsnamen. `src`, `width`, `height` en de Nederlandse `alt` in `content/images.ts` blijven staan; alleen de pixels veranderen.

Lever **AVIF** (desnoods een hoogwaardige JPEG/WebP die we eenmalig omzetten). Geen tekst in beeld, geen watermerk, geen logo.

Belichting: dezelfde ochtend voor hero + drie graatlagen, zodat kleurtemperatuur klopt. Graniet, den, meer — geen Alpen-ansichtkaart, geen kabelbaan.

---

## Wat “cut-out” (uitknippen) in de praktijk is

De graatsectie op de homepage stapelt drie foto’s over elkaar, met de sitekleur `granite` (#1B2320) erachter. De **lucht moet weg**.

1. Fotografeer de berg tegen een rustige lucht (ochtend, geen drukke wolkenmass tegen de top als je kunt).
2. In Lightroom of Photoshop: masker de lucht tot **volledig transparant**. De berg zelf blijft ondoorzichtig.
3. Exporteer met **alfakanaal** (AVIF of PNG). Geen matte achtergrond “ongeveer granite” — die wijkt af van de pagina.
4. De rand van de kam moet scherp zijn. Geen zachte halo, geen overgesneden dennentoppen.
5. Geen mensen op de verre laag. Geen tent, geen paaltje, geen extra rood behalve de bestaande routemarkering op de middenlaag.

Als uitknippen in het veld niet lukt: lever de RAW + een notitie “lucht nog maskeren”. Zonder transparantie werkt de parallax als een plaat op een plaat.

---

## Opnamelijst

Pixelmaten zijn het **aanleverkader**. Schiet ruimer (minstens 1,5× op de lange zijde) en crop later. Houd de verhouding aan.

### Hero — LCP-kritiek

| Wat | Verhouding | Pixels (min. crop) | Doel |
|---|---|---|---|
| Ochtendlicht over graniet en een stil meer, geen figuren op de voorgrond | 16:9 | **1920×1080** (liefst 3840×2160 bron) | Home-hero én reis-hero. Dit moet het zwaarste, scherpste beeld van de site zijn. `priority`, AVIF. Dit is de LCP-candidate zodra de plaat echte textuur heeft. |

Standpunt: iets boven het meer, horizon niet in het midden. Geen zonbol in beeld (uitgebeten highlights doden AVIF). Geen drone-cliché recht van boven.

Bestand: `hero-16x9.avif`

### Route en galerij — 3:2

| Wat | Pixels | Doel | LCP |
|---|---|---|---|
| Smalle graat, rode markering op de rots, geen rij wandelaars | 1500×1000 | Etappe + galerij | nee |
| Turkoois meer, puinhelling, geen bebouwing | 1500×1000 | Etappe + galerij | nee |
| Houten guesthouse in het dal, waslijn of houtstapel | 1500×1000 | Etappe + galerij, “waar slaap je” | nee |
| Slaapzaal hut: stapelbed, wollen deken, klein raam. **Onderbeloven.** Geen gestylede chalet | 1500×1000 | “Waar slaap je?” | nee |
| Kleine groep op een stil pad, bus niet in beeld of alleen als vlek achter dennen | 1500×1000 | Privé-reizen | nee |
| Lotte en Niels samen op het pad, markering zichtbaar | 1500×1000 | Over ons, onder de kop | nee |

Bestanden: `graat-3x2.avif`, `meer-3x2.avif`, `dal-3x2.avif`, `hutslaapzaal-3x2.avif`, `prive-groep-3x2.avif`, `over-ons-samen-3x2.avif`

### Portretten — 4:5, rechtop

Hoofd en schouders plus omgeving. Geen studiostrobist. Buiten, pad of hutwand.

| Wie | Pixels | Doel | LCP |
|---|---|---|---|
| Lotte, dagrugzak, dennen | 800×1000 | Home + over ons | nee |
| Niels bij de rode markering | 800×1000 | Home + over ons | nee |
| Marleen van Dijk (gast) | 800×1000 | Testimonial | nee |
| Thomas Peeters (gast) | 800×1000 | Testimonial | nee |
| Anouk de Vries (gast) | 800×1000 | Testimonial | nee |

Bestanden: `portret-a-4x5.avif`, `portret-b-4x5.avif`, `portret-marleen-4x5.avif`, `portret-thomas-4x5.avif`, `portret-anouk-4x5.avif`

Gastenportretten: echte gasten als ze instemmen; anders dezelfde kaders, andere gezichten, `alt` in `content/images.ts` aanpassen (dat ís een regel copy, geen layoutwerk).

### Graatlagen — cut-outs, zelfde ochtend als de hero

Volle breedte, lucht transparant. Drie aparte opnamen, niet drie crops uit één bestand — parallax verraadt dat.

| Laag | Snelheid op de site | Wat je schiet | Kader / crop | Pixels | LCP |
|---|---|---|---|---|---|
| Ver | 0,2 | Verre granieten kim, **geen mensen** | Horizon hoog, veel lucht om weg te maskeren | **2400×900** | nee |
| Midden | 0,5 | Graat op middenafstand, **één** beschilderde rode markering | Liggende strook ~16:9 | **2400×700** | nee |
| Voor | 0,8 | Rots of den in het onderste derde, scherpe silhouetrand | Liggende strook, donker graniet | **2400×600** | nee |

Bestanden: `ridge-far.avif`, `ridge-mid.avif`, `ridge-fore.avif`

---

## Wat je níet hoeft te schieten

Open Graph 1200×630 is gegenereerd (`next/og`): granite, Archivo, routenaam, de datastrook van de tocht, één rood vlak. Geen fotografie.

---

## Technische randvoorwaarden (voor wie thuis exporteert)

- Kleur: sRGB.
- Hero: scherp tot in de hoeken; dit beeld wordt full-bleed op mobiel.
- Geen HDR-glow, geen extra saturatie “omdat Instagram”.
- Hutzaal: mag lelijk zijn. Dat is de belofte.
- Hut-hoogtes niet in het beeld zetten (nog niet geverifieerd tegen GPX).
- `next/image` vraagt AVIF en WebP af; jullie leveren één master per slot.

Als de hero-plaat ligt, is LCP opnieuw te meten. Tot die tijd blijft LCP tekst (placeholder heeft te weinig detail) — zie de performancerapportage, niet “opgelost”.
