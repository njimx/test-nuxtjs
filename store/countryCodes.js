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
  async nuxtServerInit({ commit, $content }) {
    const resp = await this.$content("countryCodes").fetch();
    const data = resp.data;
    commit("setData", data);
  }
};
