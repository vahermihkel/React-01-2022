import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "cart-button": "Cart",
      "admin-button": "To admin view",
      "add-to-cart-button": "Add to cart"
    }
  },
  ee: {
    translation: {
      "cart-button": "Ostukorvi",
      "admin-button": "Administraatori vaatesse",
      "add-to-cart-button": "Lisa ostukorvi"
    }
  },
  ru: {
    translation: {
      "cart-button": "RU Ostukorvi",
      "admin-button": "RU Administraatori vaatesse",
      "add-to-cart-button": "RU Lisa ostukorvi"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language"), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "ee",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n; 