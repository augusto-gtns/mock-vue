import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import en from "./en.js";
import pt from "./pt.js";

const messages = {
  en,pt,
};

const i18n = new VueI18n({
  // locale: "", // set locale
  // fallbackLocale: 'en',
  messages, // set locale messages
});

try {
  i18n.locale = navigator.language;
} catch (e) {
  console.log('navigator.language error')
  console.log(e);
}

export default i18n;
