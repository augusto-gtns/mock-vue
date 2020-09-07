<template>
  <v-bottom-navigation
    :key="app.reloadableKey"
    app
    grow
    v-model="activeBtn"
    :value="true"
    :mandatory="false"
    background-color="secondary"
    id="menuFooter"
    class="elevation-3"
  >
    <template v-for="(item, index) in items">
      <v-btn v-show="validateMenu(item)" @click="$util.link(item.link)" class="pa-0" :key="index">
        <span
          :style="{
            'font-size': '11px !important',
          }"
          :class="(activeBtn === index ? 'primary' : 'black') + '--text'"
          v-html="item.text"
        ></span>

        <span id="menuIcons" :key="app.reloadableKey">
          <v-icon :color="activeBtn === index ? 'primary' : 'black'">
            {{
            item.icon
            }}
          </v-icon>
        </span>
      </v-btn>
    </template>
  </v-bottom-navigation>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    items: [],
    activeBtn: 0
  }),
  mounted() {
    this.loadItens();
    this.selectCurrent();
  },
  watch: {
    $route() {
      this.selectCurrent();
    }
  },
  computed: {
    ...mapState(["app"])
  },
  methods: {
    loadItens() {
      this.items = [
        {
          icon: "fas fa-home",
          link: "home",
          text: "Home",
          auth: true
        },
        {
          icon: "fas fa-sign-in-alt",
          link: "login",
          text: "Login",
          auth: false
        },
        {
          icon: "fas fa-sign-out-alt",
          link: "logout",
          text: "Sair",
          auth: true
        }
      ];
    },
    selectCurrent() {
      var index = this.items.findIndex(element => {
        return this.$util.vue().$route.name === element.link;
      });

      if (index >= 0 && index != undefined) {
        this.activeBtn = index;
      } else this.activeBtn = undefined;
    },
    validateMenu(item) {
      return item.auth == this.$auth.isAuthenticated();
    }
  }
};
</script>

<style>
#menuFooter {
  height: var(--v-heightBottom) !important;
  padding-bottom: var(--v-paddingBottom) !important;
}
</style>
