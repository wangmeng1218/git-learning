export default {
  namespaced:true,
  state: {
    menuNavData: [],
    activedMenu: {}
  },
  getters: {
  },
  mutations: {
    setMenuNav: (state, data) => {
      state.menuNavData = data;
    },
    setActivedMenu: (state, data) => {
      state.activedMenu = data;
    }
  },
  actions: {}
};
