var _vm = null;

import { formrules } from "./formrules";

export default {
  formrules,
  isPRD(){
    // eslint-disable-next-line
    return process.env.NODE_ENV === 'production';
  },
  isMobile() {
    // aler(navigator.userAgent)
    return /ANDROID|WEBOS|IPHONE|IPAD|IPOD|BLACKBERRY|IEMOBILE|OPERA MINI/i.test(
      navigator.userAgent.toUpperCase()
    );
  },
  isIosMobile() {
    // alert(navigator.userAgent)
    return /IPHONE|IPAD|IPOD/i.test(navigator.userAgent.toUpperCase());
  },
  //is PWA app installed
  isInStandaloneMode() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && navigator.standalone)
    );
  },
  checkIndex() {
    var fromIndex = !!(
      _vm.$route.redirectedFrom && _vm.$route.redirectedFrom.includes("index.")
    );
    return fromIndex;
  },
  isRoute(routename) {
    // console.log(_vm.$route)
    return _vm.$route && _vm.$route.name == routename;
  },
  link(name, params) {
    var rota = {
      name: name
    };

    if (params != undefined) rota.params = params;

    _vm.$router.push(rota);
  },
  mainViewHeigth(){
    return "calc(100vh - " + _vm.$store.state.app.structure.heightBottom + ((_vm.$store.state.app.structure.toolbar) ? (" - " + _vm.$store.state.app.structure.heightToolbar) : "") + " - " + _vm.$store.state.app.structure.marginy + ")";
  },
  vue() {
    return _vm;
  },
  install(Vue, config) {
    _vm = config.vm;
    Vue.prototype.$util = this;
  }
};
