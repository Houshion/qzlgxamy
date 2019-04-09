import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './type'

Vue.use(Vuex)

const state = {
  params: {}
}
const actions = {

}
const getters = {
  params: state => state.params,
}
const mutations = {
  [types.UPDATE_PARAMS](state, params) {
    state.params = params;
  },
}

//导出vue实例
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  getters,
  mutations
})
