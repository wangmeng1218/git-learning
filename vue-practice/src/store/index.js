import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    menuNavData: []
  },
  getters: {
  },
  mutations: {
    setMenuNav: (state, data) => {
      state.menuNavData = data;
    }
  },
  actions: {},
  modules: {}
});

export default store;
