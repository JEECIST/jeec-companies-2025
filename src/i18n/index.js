import { createI18n } from "vue-i18n";
import pt from "./locales/pt.json";
import en from "./locales/en.json";

function getLocale() {
  let userLanguage = (navigator.language || navigator.userLanguage).split("-")[0];

  if (userLanguage !== "pt" && userLanguage !== "en")
    userLanguage = "en";

  return userLanguage;
}

const options = {
  legacy: false,
  locale: getLocale(),
  fallbackLocale: ["en", "pt"],
  availableLocales: ["en", "pt"],
  messages: { pt, en },
};

const i18n = createI18n(options);
export default i18n;