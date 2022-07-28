import electronStore from 'electron-store'

const eStore = new electronStore()

const questsModule = {
  state: () => ({
    quests: eStore.get('quests') || [],
    trackingQuests: eStore.get('player.trackingQuests') || [],
    completedQuests: eStore.get('player.completedQuests') || [],
  }),
  mutations: {
    removeQuestFromTracking(state, payload) {
      state.trackingQuests.splice(payload.index, 1)
      eStore.set('player.trackingQuests', state.trackingQuests)
      state.completedQuests.push(payload.quest)
      eStore.set('player.completedQuests', state.completedQuests)
    },
    setTrackingQuests(state, payload) {
      state.trackingQuests = payload
      eStore.set('player.trackingQuests', state.trackingQuests)
    }
  },
  actions: {},
  getters: {
    quests: state => state.quests,
    trackingQuests: state => state.trackingQuests,
    completedQuests: state => state.completedQuests,
  }
}

export default questsModule
