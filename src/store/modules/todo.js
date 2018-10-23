const mock = require('../../assets/mock.js')

export default {
  // 默认 vuex 是开启命名空间的，即获取当前模块的 getter/action/mutation 都需要这样 this.$store.actions.items...
  // 设置为 false 后，即所有模块的 getter/action/mutation 都是注入到全局，即 this.$store.actions... 即可
  // 但 state 永远是有命名空间的，无论 namespaced 是否为 true，要获取当前模块的 state 必须通过 this.$store.state.items...
  namespaced: true,
  state: {
    msg: 'Vuex Todo Demo',
    typeList: ['待完成', '进行中', '已完成', '已取消'],
    allData: [],
    data: [],
    currentType: '待完成'
  },
  getters: {
    title (state) {
      return `我是getter ${state.msg}`
    }
  },
  actions: {
    getList ({ commit, dispath, state }) {
      return new Promise((resolve) => setTimeout(() => {
        commit('UPDATE_DATA', mock.data)
        commit('UPDATE_TYPE', state.currentType)
        resolve()
      }, 1500))
    }
  },
  mutations: {
    CHANGE_TITLE (state, text) {
      state.msg = text
    },
    UPDATE_DATA (state, data) {
      state.allData = data
    },
    UPDATE_TYPE (state, type) {
      const { allData } = state
      state.currentType = type
      state.data = allData.filter((item) => item.status === type)
    },
    UPDATE_ITEM_STATUS (state, { item, type }) {
      const { allData } = state
      const { status } = item
      item.status = type
      state.data = allData.filter((todo) => todo.status === status)
    }
  }
}
