export const state = () => {
  return {
    tags: [],
    articles: [],
    categories: []
  };
};

export const mutations = {
  setTags: (state, payload) => (state.tags = payload),
  setArticles: (state, payload) => (state.articles = payload),
  setCategories: (state, payload) => (state.categories = payload)
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
  }
};
