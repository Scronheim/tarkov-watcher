import electronStore from 'electron-store'


const eStore = new electronStore()

const mapsModule = {
  state: () => ({
    maps: eStore.get('maps')
  }),
  mutations: {},
  actions: {},
  getters: {
    maps: state => state.maps
  }
}

export default mapsModule
