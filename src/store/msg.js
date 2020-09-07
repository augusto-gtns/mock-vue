export default {
  state: {
    msg: {
      timeout: 5000,
      show: false,
      data: {
        text: '',
        type: 'success',
      },
      reloadableKey: new Date().getTime(),
    },
  },
  mutations: {
    refreshReloadableMsgKey(state) {
      state.msg.reloadableKey = new Date().getTime()
    },
    hidemsg(state) {
      // console.log('hidemsg')
      state.msg.show = false
      state.msg.data.text = ''
    },
    showmsg(state, msg) {
      // console.log('showmsg')
      this.commit('refreshReloadableMsgKey');
      state.msg.data = Object.assign({}, state.msg.data, msg);
      state.msg.show = true
    },
    tooglemsg(state, show) {
      state.msg.show = show
    },
    showDefaultErrorMsg(state) {
      this.commit('showmsg', {
        text: 'Erro ao carregar',
        type: 'error'
      })
    }
  },
}