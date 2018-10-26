import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// @see https://github.com/vuejs/vuex/blob/dev/examples/counter/store.js

const state = {
  openid: '',
  inviteCode: '',
  balance: 0
}

const mutations = {
  setOpenid (state, openid) {
    state.openid = openid
    wx.setStorageSync('openid', openid)
  },
  setInviteCode (state, inviteCode) {
    state.inviteCode = inviteCode
    wx.setStorageSync('inviteCode', inviteCode)
  },
  setBalance (state, balance) {
    state.stepTotal = balance
    wx.setStorageSync('balance', balance)
  }
}

const actions = {
  setOpenid: ({commit}, openid) => commit('setOpenid', openid),
  setInviteCode: ({commit}, inviteCode) => commit('setInviteCode', inviteCode),
  setBalance: ({commit}, balance) => commit('setBalance', balance)
}

// getters are functions
const getters = {
  openid: state => state.openid,
  inviteCode: state => state.inviteCode,
  balance: state => state.balance
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations})
