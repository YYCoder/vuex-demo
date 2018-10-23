import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo'
import createLogger from 'vuex/dist/logger'
// 全局使用 Vuex ，从而每个组件可以使用 this.$store 获取全局 store
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    todo
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
