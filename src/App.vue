<template>
  <v-app>
    <v-titlebar :theme="theme" :platform="platform" :on-close="close" :on-maximize="toggleMaximize"
                :on-minimize="minimize" :is-maximizable="false" :is-closable="isClosable"
                :is-minimizable="isMinimizable" :show-icon="showIcon" :show-title="showTitle">
      <template slot="title">
        Title
      </template>
    </v-titlebar>
    <v-main>

    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import {remote} from "electron"
export default {
  name: 'App',
  mounted() {
    this.$vuetify.theme.dark = true
  },
  computed: {

  },
  data: () => ({
    platform: process.platform,
    theme: "dark",
    isMaximizable: remote.getCurrentWindow().isMaximizable(),
    isMinimizable: remote.getCurrentWindow().isMinimizable(),
    isClosable: remote.getCurrentWindow().isClosable(),
    showTitle: true,
    showIcon: true,
  }),
  methods: {
    close() {
      remote.getCurrentWindow().close();
    },
    toggleMaximize() {
      let win = remote.getCurrentWindow();
      if (win.isMaximized())
        win.unmaximize();
      else
        win.maximize();
    },
    minimize() {
      remote.getCurrentWindow().minimize();
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
