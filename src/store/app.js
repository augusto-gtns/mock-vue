export default {
  state: {
    app: {
      dialogLoading: false,
      reloadableKey: new Date().getTime(),
      structure: {
        toolbar: true,
        heightToolbar: "48px",
        heightBottom: "",
        paddingBottom: "",
        marginy: ""
      }
    }
  },
  mutations: {
    refreshReloadableKey(state) {
      state.app.reloadableKey = new Date().getTime();
    },
    toogleDialogLoading(state, value) {
      state.app.dialogLoading = value;
      this.commit("toogleMainView", !state.app.dialogLoading);
    },
    toogleMainView(state, value) {
      state.app.mainView = value;
    },
    updateStructure(state, structure) {
      state.app.structure = Object.assign(state.app.structure, structure);
    }
  }
};
