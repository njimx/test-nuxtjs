export const state = () => ({
  menu: [
    {
      title: "Users",
      path: "/"
    },
    {
      title: "Roles",
      path: "/roles"
    }
  ]
});

export const mutations = {
  setData(state, menu) {
    state.menu = menu;
  }
};

export const getters = {
  get(state) {
    return state.menu;
  }
};
