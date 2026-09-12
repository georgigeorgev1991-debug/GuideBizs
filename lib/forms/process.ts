import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

import { getPrivate, isLocale } from "@/lib/content";
import { requireMailEnv } from "@/lib/env";
import {
  antiSpam,
  isEmail,
  type FieldErrors,
  type FormState,
  type MailSource,
} from "@/lib/forms/guards";
import { site } from "@/lib/site";

const LEVELS = new Set(["gemiddeld", "pittig", "zwaar"]);

function sendKey() {
  return requireMailEnv().key;
}

function dryRun() {
  return sendKey().startsWith("build-placeholder");
}

function readLocale(form: FormData) {
  const value = String(form.get("locale") ?? "nl");
  return isLocale(value) ? value : "nl";
}

async function deliver(subject: string, text: string, locale: "nl" | "en"): Promise<FormState | null> {
  if (dryRun()) {
    return null;
  }

  const { key, to } = requireMailEnv();
  const resend = new Resend(key);
  const result = await resend.emails.send({
    from: `${site.brand} <onboarding@resend.dev>`,
    to,
    subject,
    text,
  });

  if (result.error) {
    const t = await getTranslations({ locale, namespace: "forms" });
    return {
      ok: false,
      message: t("mailserverRetry", { detail: t("mailserver"), phone: site.phone }),
      errors: {},
    };
  }

  return null;
}

export async function processListSignup(
  form: FormData,
  source: MailSource,
): Promise<FormState> {
  const locale = readLocale(form);
  const t = await getTranslations({ locale, namespace: "forms" });
  const spam = antiSpam(form);
  if (spam) {
    return {
      ok: false,
      message: t("spam", { phone: site.phone, email: site.email }),
      errors: {},
    };
  }

  const email = String(form.get("email") ?? "").trim();
  const consent = String(form.get("consent") ?? "") === "ja";
  const errors: FieldErrors = {};

  if (!email) {
    errors.email = t("emailRequired");
  } else if (!isEmail(email)) {
    errors.email = t("emailInvalid");
  }

  if (!consent) {
    errors.consent = t("consentRequired");
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: t("fields"), errors };
  }

  const sent = await deliver(
    source === "gpx" ? t("gpxSubject") : t("listSubject"),
    [`bron: ${source}`, `e-mail: ${email}`].join("\n"),
    locale,
  );
  if (sent) {
    return sent;
  }

  if (source === "gpx") {
    return {
      ok: true,
      message: t("gpxOk", { email, phone: site.phone }),
      errors: {},
    };
  }

  return {
    ok: true,
    message: t("listOk", { email, siteEmail: site.email }),
    errors: {},
  };
}

export async function processContact(form: FormData): Promise<FormState> {
  const locale = readLocale(form);
  const t = await getTranslations({ locale, namespace: "forms" });
  const spam = antiSpam(form);
  if (spam) {
    return {
      ok: false,
      message: t("spam", { phone: site.phone, email: site.email }),
      errors: {},
    };
  }

  const naam = String(form.get("naam") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const bericht = String(form.get("bericht") ?? "").trim();
  const consent = String(form.get("consent") ?? "") === "ja";
  const errors: FieldErrors = {};

  if (!naam) {
    errors.naam = t("nameRequired");
  }
  if (!email) {
    errors.email = t("emailRequired");
  } else if (!isEmail(email)) {
    errors.email = t("emailInvalid");
  }
  if (!bericht) {
    errors.bericht = t("messageRequired");
  }
  if (!consent) {
    errors.consent = t("consentRequired");
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: t("fields"), errors };
  }

  const sent = await deliver(
    t("contactSubject"),
    [`bron: contact`, `naam: ${naam}`, `e-mail: ${email}`, `bericht: ${bericht}`].join("\n"),
    locale,
  );
  if (sent) {
    return sent;
  }

  return {
    ok: true,
    message: t("contactOk", { phone: site.phone }),
    errors: {},
  };
}

export async function processPrivateEnquiry(form: FormData): Promise<FormState> {
  const locale = readLocale(form);
  const t = await getTranslations({ locale, namespace: "forms" });
  const offer = getPrivate(locale);
  const spam = antiSpam(form);
  if (spam) {
    return {
      ok: false,
      message: t("spam", { phone: site.phone, email: site.email }),
      errors: {},
    };
  }

  const naam = String(form.get("naam") ?? "").trim();
  const club = String(form.get("club") ?? "").trim();
  const periode = String(form.get("periode") ?? "").trim();
  const grootte = String(form.get("grootte") ?? "").trim();
  const niveau = String(form.get("niveau") ?? "").trim();
  const bericht = String(form.get("bericht") ?? "").trim();
  const consent = String(form.get("consent") ?? "") === "ja";
  const errors: FieldErrors = {};

  if (!naam) {
    errors.naam = t("nameRequired");
  }
  if (!club) {
    errors.club = t("clubRequired");
  }
  if (!periode) {
    errors.periode = t("periodRequired");
  }

  const size = Number(grootte);
  if (!grootte || !Number.isInteger(size)) {
    errors.grootte = t("sizeRequired");
  } else if (size < 2 || size > offer.maxParticipants) {
    errors.grootte = t("sizeRange", { max: offer.maxParticipants });
  }

  if (!LEVELS.has(niveau)) {
    errors.niveau = t("levelRequired");
  }

  if (!bericht) {
    errors.bericht = t("privateMessageRequired");
  }

  if (!consent) {
    errors.consent = t("consentRequired");
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: t("fields"), errors };
  }

  const sent = await deliver(
    t("privateSubject"),
    [
      `bron: prive`,
      `naam: ${naam}`,
      `club of groep: ${club}`,
      `periode: ${periode}`,
      `grootte: ${size}`,
      `niveau: ${niveau}`,
      `bericht: ${bericht}`,
    ].join("\n"),
    locale,
  );
  if (sent) {
    return sent;
  }

  return {
    ok: true,
    message: t("privateOk", { phone: site.phone }),
    errors: {},
  };
}
