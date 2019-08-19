export const state = () => {
  return {
    isNavVisible: true,

    projects: {}
  };
};

export const mutations = {
  setNavVisible: (state, payload) => (state.isNavVisible = payload),

  toggleNavVisible: (state, payload) =>
    (state.isNavVisible = !state.isNavVisible),

  setProjects(state, payload) {
    state.projects = payload;
  }
};

export const actions = {
  setProjects({ commit }, projects) {
    commit("setProjects", projects);
  }
};

export const getters = {
  isValidProject(state) {
    return projectName => !!state.projects[projectName];
  }
};
