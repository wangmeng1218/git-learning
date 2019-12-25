export default {
  namespaced:true,
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
  actions: {}
};
