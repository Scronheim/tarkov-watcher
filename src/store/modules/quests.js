import electronStore from 'electron-store'

const eStore = new electronStore()

const questsModule = {
  state: () => ({
    quests: eStore.get('quests') || [],
    trackingQuests: eStore.get('player.trackingQuests') || [],
    completedQuests: eStore.get('player.completedQuests') || [],
  }),
  mutations: {
    removeQuestFromCompleted(state, payload) {
      state.completedQuests.splice(payload.index, 1)
    },
    removeQuestFromTracking(state, payload) {
      state.trackingQuests.splice(payload.index, 1)
    },
    markQuestComplete(state, quest) {
      state.completedQuests.push(quest)
    },
    setTrackingQuests(state, payload) {
      state.trackingQuests = payload
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
