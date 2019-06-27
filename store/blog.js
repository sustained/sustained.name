export const state = () => {
  return {
    tags: [],
    articles: [],
    categories: [],

    showCategories: true,
    showTags: true
  };
};

export const mutations = {
  setTags: (state, payload) => (state.tags = payload),
  setArticles: (state, payload) => (state.articles = payload),
  setCategories: (state, payload) => (state.categories = payload),

  setShowTags: (state, payload) => (state.showTags = payload),
  setShowCategories: (state, payload) => (state.showCategories = payload)
};

export const actions = {
  toggleShowTags({ commit, state }) {
    commit("setShowTags", !state.showTags);
  },

  toggleShowCategories({ commit, state }) {
    commit("setShowCategories", !state.showCategories);
  }
};

export const getters = {
  articlesByTagName(state) {
    return name => {
      return state.articles.filter(article => article.tags.includes(name));
    };
  },

  articlesByCategorySlug(state) {
    return slug => {
      return state.articles.filter(article => article.categorySlug === slug);
    };
  },

  getCategoryForSlug(state) {
    return slug => {
      return state.categories.find(category => category.slug === slug);
    };
  },

  tagByTagSlug(state) {
    return slug => {
      return state.tags.find(tag => tag.slug === slug);
    };
  },

  categorySlugExists(state) {
    return slug => {
      return state.categories.some(category => category.slug === slug);
    };
  },

  tagSlugExists(state) {
    return slug => {
      return state.tags.some(tag => tag.slug === slug);
    };
  }
};
