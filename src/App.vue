<template>
  <v-app>
    <v-titlebar :theme="theme" :platform="platform" :on-close="close" :on-maximize="toggleMaximize"
                :on-minimize="minimize" :is-maximizable="false" :is-closable="isClosable"
                :is-minimizable="isMinimizable" :show-icon="showIcon" :show-title="showTitle">
      <template v-slot:title>
        {{ $store.getters.appName }}
      </template>
    </v-titlebar>
    <template v-if="playerIsSet">
      <v-navigation-drawer app absolute :mini-variant="drawerMini" src="/images/sidebar.jpg">
        <div class="mt-8"/>
        <v-img src="/images/logo.png"/>
        <v-list nav dense>
          <v-list-item>
            <v-list-item-title class="text-h6">{{ $store.getters.appName }}</v-list-item-title>
          </v-list-item>
          <v-divider class="mb-1"/>
          <v-list-item link to="/">
            <v-list-item-title class="text-h6">{{ player.nickname }}</v-list-item-title>
          </v-list-item>
          <v-divider/>
        </v-list>
        <div class="d-flex justify-center align-center mb-2">
          <span style="line-height: 0px;">
            <v-img :src="levelGroup.image" max-width="64"/>
          </span>
          <span>
            <p class="text-center mb-1" style="font-size: 0.9em;">Level</p>
            <div class="text-center">
              <h1 style="font-size: 2.5em; line-height: 0.8em;">{{ player.level }}</h1>
            </div>
          </span>
          <span>
            <v-btn icon class="ma-0" block @click="incrementLevel">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn icon class="ma-0" block @click="decrementLevel">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </span>
        </div>
        <v-divider/>
        <v-list nav dense>
          <v-list-item link to="/quests">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">Квесты</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/debug">
            <v-list-item-icon>
              <v-icon>mdi-bug</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">Debug</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-main>
    </template>
    <v-dialog v-model="newPlayerDialog" persistent max-width="40%" v-else>
      <v-card flat>
        <v-card-title>Первичная настройка</v-card-title>
        <v-card-text>
          <v-form ref="initForm">
            <c-text-field label="Ваш ник" v-model="newPlayer.nickname" :rules="requireRule"/>
            <c-text-field label="Ваш уровень" type="number" v-model.number="newPlayer.level"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <c-btn-success @click="saveInitSettings">Погнали!</c-btn-success>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// @ is an alias to /src
import {remote} from "electron"
export default {
  name: 'App',
  mounted() {
    if (!this.playerIsSet) {
      this.newPlayerDialog = true
    }
    this.$vuetify.theme.dark = true
  },
  computed: {
    playerIsSet() {
      return this.$store.getters.playerIsSet
    },
    player() {
      return this.$store.getters.player
    },
    levelGroup() {
      return this.$store.getters.levelGroup
    },
  },
  data: () => ({
    requireRule: [
      v => !!v || 'Поле обязательно надо заполнить',
    ],
    newPlayerDialog: false,
    newPlayer: {
      nickname: '',
      level: 1,
    },
    drawerMini: false,
    platform: process.platform,
    theme: "dark",
    isMaximizable: remote.getCurrentWindow().isMaximizable(),
    isMinimizable: remote.getCurrentWindow().isMinimizable(),
    isClosable: remote.getCurrentWindow().isClosable(),
    showTitle: true,
    showIcon: true,
  }),
  methods: {
    saveInitSettings() {
      this.$store.commit('setInitSettings', this.newPlayer)
    },
    incrementLevel() {
      this.$store.commit('incrementLevel')
    },
    decrementLevel() {
      this.$store.commit('decrementLevel')
    },
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
@font-face {
  font-family: Share Tech;
  src: url("/fonts/sharetechrus.ttf") format('truetype');
}
</style>
