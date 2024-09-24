import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "../constants/translations/en.json";
import translationHi from "../constants/translations/hi.json";

const resources = {
  en: {
    translation: translationEn,
  },
  hi: {
    translation: translationHi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
