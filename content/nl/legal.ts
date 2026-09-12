export const CONCEPT_MARK = "CONCEPT — nog niet juridisch gecontroleerd";

export const termsPage = {
  h1: "Algemene voorwaarden",
  description: "Concepttekst voor de reisvoorwaarden. Nog niet juridisch gecontroleerd.",
  sections: [
    {
      title: "Wat dit document nog niet is",
      body: [
        "Dit is een schets van de onderwerpen die in de voorwaarden moeten staan. Geen van deze zinnen is een bindende belofte, geen uitsluiting, geen prijsregel. Een advocaat moet dit herschrijven voor publicatie als contract.",
      ],
    },
    {
      title: "Onderwerpen die nog ingevuld moeten worden",
      body: [
        "Wie de contractpartij is (vennootschapsvorm, zetel, registernummer).",
        "Wat de reis omvat, wat buiten de prijs valt, en hoe een wijziging van het programma wordt gemeld.",
        "Aanbetaling, restbetaling, en wat er gebeurt als een vertrek niet doorgaat omdat de groep te klein is of het weer dat vraagt.",
        "Annulering door de reiziger, en hoe dat zich verhoudt tot een eigen annuleringsverzekering.",
        "Aansprakelijkheid en de verplichte verzekering onder de Bulgaarse Toerismewet, plus de Pakketreizenrichtlijn — in bewoording die een jurist goedkeurt.",
        "Welk recht van toepassing is, en waar een geschil wordt voorgelegd.",
      ],
    },
  ],
} as const;

export const privacyPage = {
  h1: "Privacy",
  description: "Concepttekst over persoonsgegevens. Nog niet juridisch gecontroleerd.",
  sections: [
    {
      title: "Wat de formulieren verzamelen",
      body: [
        "Aanvraag privé-reis: naam, club of groep, voorkeursperiode, aantal deelnemers, loopniveau, vrije tekst.",
        "Nieuwsbrief en GPX: e-mailadres, plus een bronveld (nieuwsbrief of gpx) zodat we weten waarom het adres er staat.",
        "Contactformulier: naam, e-mailadres, vrije tekst.",
        "Toestemming wordt expliciet gevraagd, nooit vooraf aangevinkt. Een honeypot-veld en een tijdscheck vangen geautomatiseerde zendingen; die velden zijn geen inhoudelijke gegevens.",
      ],
    },
    {
      title: "Resend als verwerker",
      body: [
        "E-mail gaat via Resend. Resend verwerkt het bericht in opdracht van ons, om het bij ons te bezorgen. Geen andere post, geen verkoop van adressen. De precieze verwerkersovereenkomst moet nog getekend en hier beschreven worden.",
      ],
    },
    {
      title: "Plausible als statistiek",
      body: [
        "Bezoekersstatistiek loopt via Plausible: geen cookies, geen vingerafdruk, geen reclameprofiel. Alleen geaggregeerde pagina-aantallen. Het domein staat in de omgevingsvariabele voor Plausible; zonder die variabele wordt er niets geladen.",
      ],
    },
    {
      title: "Bewaartermijn (voorstel, niet definitief)",
      body: [
        "Voorstel: aanvragen en contactberichten tot 24 maanden na het laatste bericht, daarna wissen of anonimiseren. Adressen op de lijst tot je je afmeldt. Dit is geen vastgelegde termijn totdat een jurist hem vastzet.",
      ],
    },
    {
      title: "Rechten, artikelen 15 tot en met 22 AVG",
      body: [
        "Inzage, rectificatie, wissing, beperking van de verwerking, overdraagbaarheid, bezwaar, en het recht niet onderworpen te zijn aan een uitsluitend geautomatiseerde beslissing. Wij nemen geen geautomatiseerde beslissingen over boekingen. Uitoefenen: een mail naar het adres op deze site, of de Autoriteit Persoonsgegevens.",
      ],
    },
  ],
} as const;
