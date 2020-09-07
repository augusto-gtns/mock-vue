<template>
  <v-toolbar id="toolbar" color="secondary elevation-0" dense flat :key="menu.reloadableKey">
    
    <v-toolbar-title class="text-truncate">
      <span class="subtitle-1">{{ rotaatual() }}</span>
    </v-toolbar-title>

    <span v-if="$auth.isAuthenticated()" :style="{ right: '20px', position: 'absolute' }">
      <v-avatar size="32">
        <img :src="$auth.user().avatar" />
      </v-avatar>
    </span>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {},
  computed: {
    ...mapState(["menu"])
  },
  methods: {
    rotaatual() {
      return this.$route.meta.title;
    }
  }
};
</script>