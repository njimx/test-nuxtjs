export const state = () => ({
  data: []
});

export const mutations = {
  setData(state, data) {
    state.data = data;
  }
};

export const getters = {
  get(state) {
    return state.data;
  }
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const resp = await this.$content("roles").fetch();
    const data = resp.data;
    commit("setData", data);
  }
};
