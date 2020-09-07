import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/styles/main.sass";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#800080",
        secondary: "#dddddd",
        tertiary: "#0000ff",
        facebook: "#4267B2",
        appbgcolor: "#ffffff",
      },
    },
    icons: {
      iconfont: "fa",
    },
    options: {
      customProperties: true,
      minifyTheme: function(css) {
        return css.replace(/[\r\n|\r|\n]/g, "");
      },
    },
  },
});
