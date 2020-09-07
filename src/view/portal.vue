<template>
  <v-content class app>
    <!-- scroll only container -->
    <v-style>
      #mainView{
      height: {{$util.mainViewHeigth()}} !important;
      }
    </v-style>

    <toolbarx v-if="app.structure.toolbar" />
    <div id="mainView">
      <router-view></router-view>
      <keep-alive>
        <router-view name="keepalive"></router-view>
      </keep-alive>
    </div>
    <menux />
  </v-content>
</template>

<script>
import { mapState } from "vuex";

import menux from "./../components/menu";
import toolbarx from "./../components/toolbar";

export default {
  computed: {
    ...mapState(["app", "menu"])
  },
  components: {
    menux,
    toolbarx
  }
};
</script>

<style>
html,
body,
div.application,
div.application--wrap,
div.v-content__wrap,
main {
  padding: 0 !important;
  margin: 0 !important;
}
body {
  background-image: linear-gradient(180deg,#000 0,#333 100%)
}
div.v-content__wrap {
  height: calc(100vh - var(--v-margin-y));
  background-color: var(--v-appbgcolor) !important;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}
#mainView {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
#menuFooter .v-btn:before {
  background-color: transparent;
}
div.container {
  background-color: transparent;
}
.v-input .v-icon {
  font-size: 14px !important;
}
.v-icon.v-icon {
  font-size: 22px;
}
</style>
