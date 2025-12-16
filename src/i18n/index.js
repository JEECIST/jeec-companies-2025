import { createI18n } from "vue-i18n";

import pt from "./locales/pt.json";
import en from "./locales/en.json";

const options = {
  legacy: false,
  locale: "en",
  fallbackLocale: ["en", "pt"],
  availableLocales: ["en", "pt"],
  messages: { pt, en },
};

const i18n = createI18n(options);
export default i18n;