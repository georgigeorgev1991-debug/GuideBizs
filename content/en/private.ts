import { site } from "@/lib/site";
import { privateFacts } from "@/content/shared/private";

export const privateCopy = {
  h1: "The van is yours",
  lead: "A hillwalking club, a group of friends, a fiftieth that needs a ridge rather than a restaurant: we drive the nine seats for you alone. Your dates, your pace, nobody else on the bunks.",
  organiserLine: `If you put the trip together, from ${privateFacts.organiserFreeFrom} paying walkers you travel at no charge.`,
  invitations: [
    "hillwalking clubs",
    "groups of friends",
    "a fiftieth",
    "a works walking weekend",
    "families",
  ],
  blocks: [
    {
      title: "Your dates",
      body: "No published calendar to fit. You name the days; we bring the van.",
    },
    {
      title: "Your pace",
      body: "Shorter days, more valley, less ridge: we set the stages to your legs, not to a brochure.",
    },
    {
      title: "Your company only",
      body: "No strangers in the dorm. No waiting for a group you have never met. Nine seats, all yours.",
    },
  ],
  consent: `We use your details only to answer this enquiry. No newsletter unless you ask separately. To stop or erase: email ${site.email}.`,
  vanLabel: "The whole van, up to {max} people",
  vanNote:
    "One price for the van. Not per person — then nobody starts splitting the bill.",
  forWhom: "Who it is for",
  formHeading: "Ask for the van",
  formLead: "No checkout. You write; we telephone or email back.",
} as const;
