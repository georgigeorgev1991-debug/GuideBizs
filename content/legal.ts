export interface LegalStatus {
  entity: "individuals" | "company";
  companyName?: string;
  eik?: string;
  vatRegistered: boolean;
  vatNumber?: string;
  tourOperator: {
    route: "none" | "own" | "partner";
    registrationNumber?: string;
    partnerName?: string;
    insurer?: string;
  };
  liabilityInsurance?: { insurer: string; description: string };
  firstAidCertified: boolean;
  consumerBookingMode: "waitlist" | "enquiry";
  offsiteBookable: boolean;
}

/** Single source of every legal and trust claim. Launch values — Revision 3. */
export const legal: LegalStatus = {
  entity: "individuals",
  vatRegistered: false,
  tourOperator: {
    route: "none",
  },
  // liabilityInsurance unset at launch — do not invent.
  firstAidCertified: false,
  consumerBookingMode: "waitlist",
  offsiteBookable: false,
};

export function isWaitlistMode() {
  return legal.consumerBookingMode === "waitlist";
}

export function hasTourOperatorRoute() {
  return legal.tourOperator.route !== "none";
}
