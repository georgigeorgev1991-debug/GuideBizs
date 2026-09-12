"use client";

import { useTranslations } from "next-intl";
import { useActionState, useState, type FormEvent } from "react";

import { submitContact } from "@/app/actions/mail";
import { TrackOnSuccess } from "@/components/analytics/TrackOnSuccess";
import { Honeypot } from "@/components/forms/Honeypot";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { emptyFormState } from "@/lib/forms/state";
import { plausibleEvents } from "@/lib/plausible";
import { site } from "@/lib/site";

export function ContactForm({
  issuedAt,
  stamp,
  locale,
  consent,
}: {
  issuedAt: string;
  stamp: string;
  locale: string;
  consent: string;
}) {
  const t = useTranslations("forms");
  const [state, formAction, pending] = useActionState(
    submitContact,
    emptyFormState,
  );
  const [offlineMessage, setOfflineMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      event.preventDefault();
      setOfflineMessage(t("offline", { phone: site.phone }));
      return;
    }
    setOfflineMessage("");
  }

  return (
    <form action={formAction} noValidate onSubmit={onSubmit} className="relative mt-10 max-w-xl">
      <TrackOnSuccess state={state} event={plausibleEvents.enquiry} />
      <Honeypot />
      <input type="hidden" name="issuedAt" value={issuedAt} />
      <input type="hidden" name="stamp" value={stamp} />
      <input type="hidden" name="locale" value={locale} />
      <div aria-live="polite" aria-atomic="true" className="mb-6 text-sm">
        {offlineMessage || state.message ? (
          <p>{offlineMessage || state.message}</p>
        ) : null}
      </div>
      <div className="space-y-6">
        <Field label={t("nameLabel")} name="naam" autoComplete="name" error={state.errors.naam} />
        <Field
          label={t("emailLabel")}
          name="email"
          type="email"
          autoComplete="email"
          error={state.errors.email}
        />
        <div>
          <label htmlFor="bericht" className="block text-sm">
            {t("contactMessageLabel")}
          </label>
          <textarea
            id="bericht"
            name="bericht"
            rows={5}
            className="mt-2 w-full border border-glacier/40 bg-granite px-3 py-2 text-base text-snowfield"
            aria-invalid={state.errors.bericht ? true : undefined}
          />
          {state.errors.bericht ? (
            <p className="mt-2 text-sm text-blaze-ui" role="alert">
              {state.errors.bericht}
            </p>
          ) : null}
        </div>
        <div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="consent" value="ja" className="mt-1 size-4 shrink-0" />
            <span>{consent}</span>
          </label>
          {state.errors.consent ? (
            <p className="mt-2 text-sm text-blaze-ui" role="alert">
              {state.errors.consent}
            </p>
          ) : null}
        </div>
      </div>
      <Button type="submit" className="mt-8" disabled={pending}>
        {pending ? t("pending") : t("contactSubmit")}
      </Button>
    </form>
  );
}
