export const state = () => {
  return {
    section: "home"
  };
};

export const mutations = {
  setSection: (state, payload) => (state.section = payload)
};
