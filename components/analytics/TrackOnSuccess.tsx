"use client";

import { useEffect } from "react";

import { trackPlausible } from "@/lib/plausible";
import type { FormState } from "@/lib/forms/state";

export function TrackOnSuccess({
  state,
  event,
}: {
  state: FormState;
  event: string;
}) {
  useEffect(() => {
    if (state.ok) {
      trackPlausible(event);
    }
  }, [state.ok, event]);

  return null;
}
