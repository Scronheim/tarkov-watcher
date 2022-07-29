import Vue from 'vue'
import Vuex from 'vuex'
import electronStore from 'electron-store'

import questModule from '@/store/modules/quests'
import itemsModule from '@/store/modules/items'
import mapsModule from '@/store/modules/maps'
import tradersModule from "@/store/modules/traders";

const eStore = new electronStore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: "Tarkov Watcher",
    player: {
      level: eStore.get('player.level'),
      nickname: eStore.get('player.nickname')
    },
    levelGroups: [
      {id: 1, image: "/images/LevelGroup1.png", minLevel: 1, maxLevel: 4},
      {id: 2, image: "/images/LevelGroup2.png", minLevel: 5, maxLevel: 9},
      {id: 3, image: "/images/LevelGroup3.png", minLevel: 10, maxLevel: 14},
      {id: 4, image: "/images/LevelGroup4.png", minLevel: 15, maxLevel: 19},
      {id: 5, image: "/images/LevelGroup5.png", minLevel: 20, maxLevel: 24},
      {id: 6, image: "/images/LevelGroup6.png", minLevel: 25, maxLevel: 29},
      {id: 7, image: "/images/LevelGroup7.png", minLevel: 30, maxLevel: 34},
      {id: 8, image: "/images/LevelGroup8.png", minLevel: 35, maxLevel: 39},
      {id: 9, image: "/images/LevelGroup9.png", minLevel: 40, maxLevel: 44},
      {id: 10, image: "/images/LevelGroup10.png", minLevel: 45, maxLevel: 49},
      {id: 11, image: "/images/LevelGroup11.png", minLevel: 50, maxLevel: 54},
      {id: 12, image: "/images/LevelGroup12.png", minLevel: 55, maxLevel: 59},
      {id: 13, image: "/images/LevelGroup13.png", minLevel: 60, maxLevel: 64},
      {id: 14, image: "/images/LevelGroup14.png", minLevel: 65, maxLevel: 69},
      {id: 15, image: "/images/LevelGroup15.png", minLevel: 70, maxLevel: 74},
      {id: 16, image: "/images/LevelGroup16.png", minLevel: 75, maxLevel: 75},
    ],
  },
  mutations: {
    deletePlayer(state) {
      state.player = {
        nickname: undefined,
        level: 1
      }
      eStore.clear()
    },
    setInitSettings(state, payload) {
      state.player = payload

      eStore.set('player', payload)
    },
    incrementLevel(state) {
      state.player.level++
      if (state.player.level > 75) {
        state.player.level = 1
      }
      eStore.set('player.level', state.player.level)
    },
    decrementLevel(state) {
      state.player.level--
      if (state.player.level < 1) {
        state.player.level = 75
      }
      eStore.set('player.level', state.player.level)
    }
  },
  actions: {

  },
  getters: {
    appName: state => state.appName,
    playerIsSet: state => !!state.player.nickname,
    player: state => state.player,
    levelGroup: state => {
      return state.levelGroups.find((g) => {
        return state.player.level >= g.minLevel && state.player.level <= g.maxLevel
      })
    }
  },
  modules: {
    questModule,
    itemsModule,
    mapsModule,
    tradersModule,
  }
})
