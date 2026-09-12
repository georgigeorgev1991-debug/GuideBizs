import { routing } from "./i18n/routing";
import type nl from "./messages/nl.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof nl;
  }
}
