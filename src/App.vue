<template>
  <v-app class="mainapp" :style="cssTheme">
    <msg />
    <router-view name="container"></router-view>
    <keep-alive>
      <router-view name="containerkeepalive"></router-view>
    </keep-alive>
  </v-app>
</template>

<script>
import msg from "./components/msg.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  mounted() {
    this.initialize();
  },
  methods: {
    ...mapMutations(["updateStructure"]),
    initialize() {
      this.checkSecurity();
    },
    checkSecurity() {
      if (this.$util.checkIndex()) this.$util.link("home");
      else this.$auth.checkAuthentication();
    }
  },
  watch: {
    $route() {
      this.checkSecurity();
      const toolbar = this.$route.meta.toolbar==false ? false : true;
      this.updateStructure({toolbar});
    }
  },
  computed: {
    ...mapState(["app"]),
    cssTheme() {
      const heightBottom = this.$util.isIosMobile() ? "75px" : "60px";
      const paddingBottom = this.$util.isIosMobile() ? "5px" : "0px";
      const marginy = this.$util.isMobile() ? "0px" : "40px";
      this.updateStructure({ heightBottom, paddingBottom, marginy });

      const out = {};
      out["--v-maxwidth"] = "1200px";
      out["--v-margin-y"] = marginy;
      out["--v-heightBottom"] = heightBottom;
      out["--v-paddingBottom"] = paddingBottom;

      for (const name of Object.keys(this.$vuetify.theme.themes.light))
        out["--v-" + name] = this.$vuetify.theme.themes.light[name];

      return out;
    }
  },
  components: { msg }
};
</script>

<style>
.mainapp {
  max-width: var(--v-maxwidth);
  margin: 0 auto;
}
.v-application {
  background: transparent !important;;
}
</style>
