import { enCopy } from "@/content/en/placeholder";

export const CONCEPT_MARK = "CONCEPT — not yet legally reviewed";

export const termsPage = enCopy({
  h1: "Terms and conditions",
  description: "Placeholder outline for the travel terms. Not yet legally reviewed.",
  sections: [
    {
      title: "What this document is not yet",
      body: [
        "This is a sketch of the topics the terms must cover. None of these sentences is a binding promise, exclusion, or price rule. A lawyer must rewrite this before it is published as a contract. A Dutch lawyer's sign-off does not cover this English text.",
      ],
    },
    {
      title: "Topics still to fill in",
      body: [
        "Who the contracting party is (private individuals at launch; company details only once set in /content/legal.ts).",
        "What the trip includes, what sits outside the price, and how a programme change is announced.",
        "Deposit, remaining payment, and what happens if a departure does not go ahead because the group is too small or the weather requires it — only once consumer bookings are open.",
        "Cancellation by the traveller, and how that relates to their own cancellation cover.",
        "Liability and traveller money protection — only the facts that /content/legal.ts supports on the day of publication, in wording a lawyer approves.",
        "Which law applies, and where a dispute is heard.",
      ],
    },
  ],
});

export const privacyPage = enCopy({
  h1: "Privacy",
  description: "Placeholder text about personal data. Not yet legally reviewed.",
  sections: [
    {
      title: "What the forms collect",
      body: [
        "Private-trip enquiry: name, club or group, preferred period, number of participants, walking level, free text.",
        "Newsletter and GPX: email address, plus a source field (newsletter or gpx) so we know why the address is there.",
        "Contact form: name, email address, free text.",
        "Consent is asked explicitly, never pre-ticked. A honeypot field and a timing check catch automated sends; those fields are not content data.",
      ],
    },
    {
      title: "Resend as processor",
      body: [
        "Email goes via Resend. Resend processes the message on our instruction, to deliver it to us. No other mail, no sale of addresses. The processor agreement still needs to be signed and described here.",
      ],
    },
    {
      title: "Plausible as statistics",
      body: [
        "Visitor statistics run via Plausible: no cookies, no fingerprint, no ad profile. Only aggregated page counts. The domain sits in the environment variable for Plausible; without that variable nothing loads.",
      ],
    },
    {
      title: "Retention (proposal, not final)",
      body: [
        "Proposal: enquiries and contact messages up to 24 months after the last message, then erase or anonymise. Addresses on the list until you unsubscribe. This is not a set term until a lawyer locks it.",
      ],
    },
    {
      title: "Rights, articles 15 to 22 GDPR",
      body: [
        "Access, rectification, erasure, restriction, portability, objection, and the right not to be subject to a solely automated decision. We take no automated decisions on bookings. To exercise: mail the address on this site, or your data protection authority. A Dutch lawyer's sign-off does not cover this English text.",
      ],
    },
  ],
});
