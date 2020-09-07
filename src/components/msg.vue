<template>
  <v-snackbar
    v-model="msgshow"
    :color="msg.data.type"
    :timeout="msg.timeout"
    top
    class="subtitle-1	font-weight-medium"
    :key="msg.reloadableKey"
  >
    {{ msg.data.text }}
    <v-btn text @click="hidemsg()">
      <v-icon rigth>fas fa-times</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["msg", "menu", "app"]),
    msgshow: {
      get: function() {
        return this.msg.show;
      },
      set: function(value) {
        this.tooglemsg(value);
      }
    }
  },
  methods: {
    ...mapMutations(["tooglemsg", "hidemsg"])
  }
};
</script>
