import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '0',
    user_id: 0,
    address: '0',
    balance: 0,
    is_login: false
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
    getUserId(state) {
      return state.user_id;
    },
    getAddress(state) {
      return state.address;
    },
    getBalance(state) {
      return state.balance;
    },
    getIsLogin(state) {
      return state.is_login;
    }
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setUserId(state, user_id) {
      state.user_id = user_id;
    },
    setAddress(state, address) {
      state.address = address;
    },
    setBalance(state, balance) {
      state.balance = balance;
    },
    setIsLogin(state, is_login) {
      state.is_login = is_login;
    }
  },
  actions: {
    setUsername(cxt, username) {
      cxt.commit('setUsername', username);
    },
    setUserId(cxt, user_id) {
      cxt.commit('setUserId', user_id);
    },
    setAddress(cxt, address) {
      cxt.commit('setAddress', address);
    },
    setBalance(cxt, balance) {
      cxt.commit('setBalance', balance);
    },
    setIsLogin(cxt, is_login) {
      cxt.commit('setIsLogin', is_login);
    }
  },
  modules: {
  }
})
