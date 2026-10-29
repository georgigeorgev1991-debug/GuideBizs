"use client";

import { useTranslations } from "next-intl";
import { useActionState, useState, type FormEvent } from "react";

import { submitGpx, submitNieuwsbrief } from "@/app/actions/mail";
import { TrackOnSuccess } from "@/components/analytics/TrackOnSuccess";
import { Honeypot } from "@/components/forms/Honeypot";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { emptyFormState } from "@/lib/forms/state";
import { plausibleEvents } from "@/lib/plausible";
import { site } from "@/lib/site";

export function EmailCapture({
  hint,
  submitLabel,
  variant = "primary",
  source = "nieuwsbrief",
  consentText,
  issuedAt,
  stamp,
  locale,
  plausibleEvent,
}: {
  hint: string;
  submitLabel: string;
  variant?: "primary" | "secondary";
  source?: "nieuwsbrief" | "gpx";
  consentText: string;
  issuedAt: string;
  stamp: string;
  locale: string;
  plausibleEvent?: string;
}) {
  const t = useTranslations("forms");
  const action = source === "gpx" ? submitGpx : submitNieuwsbrief;
  const [state, formAction, pending] = useActionState(action, emptyFormState);
  const [offlineMessage, setOfflineMessage] = useState("");
  const eventName =
    plausibleEvent ??
    (source === "gpx" ? plausibleEvents.emailGpx : plausibleEvents.emailCaptured);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      event.preventDefault();
      setOfflineMessage(t("offline", { phone: site.phone }));
      return;
    }
    setOfflineMessage("");
  }

  return (
    <form action={formAction} noValidate onSubmit={onSubmit} className="relative mt-8 max-w-md">
      <TrackOnSuccess state={state} event={eventName} />
      <Honeypot />
      <input type="hidden" name="issuedAt" value={issuedAt} />
      <input type="hidden" name="stamp" value={stamp} />
      <input type="hidden" name="locale" value={locale} />
      <div aria-live="polite" aria-atomic="true" className="mb-4 text-sm">
        {offlineMessage || state.message ? <p>{offlineMessage || state.message}</p> : null}
      </div>
      <Field
        label={t("emailLabel")}
        name="email"
        type="email"
        autoComplete="email"
        error={state.errors.email}
        hint={hint}
      />
      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            value="ja"
            className="mt-1 size-4 shrink-0"
          />
          <span>{consentText}</span>
        </label>
        {state.errors.consent ? (
          <p className="mt-2 text-sm text-blaze-ui" role="alert">
            {state.errors.consent}
          </p>
        ) : null}
      </div>
      <Button type="submit" variant={variant} className="mt-6" disabled={pending}>
        {pending ? t("pending") : submitLabel}
      </Button>
    </form>
  );
}
