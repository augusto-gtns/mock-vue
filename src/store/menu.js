export default {
  state: {
    menu: {
      reloadableKey: new Date().getTime()
    }
  },
  mutations: {
    refreshReloadableMenuKey(state) {
      state.menu.reloadableKey = new Date().getTime();
    },
    updateMenuState(state, menu) {
      state.menu = Object.assign(state.menu, menu);
    }
  }
};
