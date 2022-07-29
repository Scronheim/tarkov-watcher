import electronStore from 'electron-store'

const eStore = new electronStore()

const itemsModule = {
  state: () => ({
    items: eStore.get('items') || [],
    trackingItems: eStore.get('player.trackingItems') || []
  }),
  mutations: {
    setTrackingItems(state, payload) {
      state.trackingItems = payload
    }
  },
  actions: {},
  getters: {
    items: state => state.items,
    trackingItems: state => state.trackingItems,
  }
}

export default itemsModule
