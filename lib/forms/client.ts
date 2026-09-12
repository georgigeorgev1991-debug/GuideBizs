import { site } from "@/lib/site";
import type { FormState } from "@/lib/forms/state";

export function networkFailState(): FormState {
  return {
    ok: false,
    message: `Geen verbinding. Controleer je netwerk en probeer opnieuw, of bel ${site.phone}.`,
    errors: {},
  };
}

