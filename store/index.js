export const state = () => ({});

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ dispatch }) {
    await dispatch("roles/nuxtServerInit");
    await dispatch("countryCodes/nuxtServerInit");
  }
};
