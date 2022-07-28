import electronStore from 'electron-store'


const eStore = new electronStore()

const tradersModule = {
  state: () => ({
    traders: eStore.get('traders')
  }),
  mutations: {},
  actions: {},
  getters: {
    traders: state => state.traders
  }
}

export default tradersModule
