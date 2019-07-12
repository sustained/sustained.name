export const state = () => {
  return {
    isNavVisible: true
  };
};

export const mutations = {
  setNavVisible: (state, payload) => (state.isNavVisible = payload),

  toggleNavVisible: (state, payload) =>
    (state.isNavVisible = !state.isNavVisible)
};
