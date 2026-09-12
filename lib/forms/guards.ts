import { createHmac, timingSafeEqual } from "node:crypto";

import { site } from "@/lib/site";
import type { FormState } from "@/lib/forms/state";

export const MIN_FORM_MS = 2000;
const MAX_FORM_MS = 1000 * 60 * 60 * 24 * 30;

export type { FieldErrors, FormState, MailSource } from "@/lib/forms/state";

function secret() {
  return process.env.RESEND_API_KEY?.trim() || "missing";
}

export function issueFormStamp() {
  const issuedAt = String(Date.now());
  const stamp = createHmac("sha256", secret()).update(issuedAt).digest("hex");
  return { issuedAt, stamp };
}

export function readStamp(form: FormData) {
  return {
    issuedAt: String(form.get("issuedAt") ?? ""),
    stamp: String(form.get("stamp") ?? ""),
  };
}

function stampValid(issuedAt: string, stamp: string) {
  if (!/^\d+$/.test(issuedAt) || !/^[a-f0-9]{64}$/.test(stamp)) {
    return false;
  }
  const expected = createHmac("sha256", secret()).update(issuedAt).digest("hex");
  const a = Buffer.from(stamp);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function antiSpam(form: FormData): string | null {
  const trap = String(form.get("bedrijf") ?? "").trim();
  if (trap) {
    return "trap";
  }

  const { issuedAt, stamp } = readStamp(form);
  if (!stampValid(issuedAt, stamp)) {
    return "stamp";
  }

  const age = Date.now() - Number(issuedAt);
  if (age < MIN_FORM_MS) {
    return "timing";
  }
  if (age > MAX_FORM_MS) {
    return "stale";
  }

  return null;
}

export function spamRejectState(): FormState {
  return {
    ok: false,
    message: `We konden dit verzoek niet aannemen. Bel ons op ${site.phone} of mail ${site.email}.`,
    errors: {},
  };
}

export function failPhone(detail: string): FormState {
  return {
    ok: false,
    message: `${detail} Probeer het opnieuw, of bel ${site.phone}.`,
    errors: {},
  };
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
