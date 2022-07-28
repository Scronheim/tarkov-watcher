import electronStore from 'electron-store'


const eStore = new electronStore()

const itemsModule = {
  state: () => ({
    items: eStore.get('items')
  }),
  mutations: {},
  actions: {},
  getters: {
    items: state => state.items
  }
}

export default itemsModule
