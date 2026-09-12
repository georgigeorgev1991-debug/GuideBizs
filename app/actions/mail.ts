"use server";

import { processContact, processListSignup, processPrivateEnquiry } from "@/lib/forms/process";
import type { FormState } from "@/lib/forms/state";

export async function submitNieuwsbrief(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  return processListSignup(form, "nieuwsbrief");
}

export async function submitGpx(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  return processListSignup(form, "gpx");
}

export async function submitPrivateEnquiry(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  return processPrivateEnquiry(form);
}

export async function submitContact(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  return processContact(form);
}
