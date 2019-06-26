import { articles, categories, normalise } from "~/data/blog.js";

function createArticles() {
  return articles.map(article => {
    return Object.assign({}, article, {
      path: `/blog/${normalise(article.category)}/${normalise(article.title)}`
    });
  });
}

function createCategories() {
  return categories.map(category => {
    return Object.assign({}, category, {
      path: `/blog/${normalise(category.name)}`
    });
  });
}

export const state = () => {
  return {
    articles: createArticles(),
    categories: createCategories()
  };
};

export const getters = {
  tags(state) {
    const tags = Object.values(state.articles).reduce((tags, article) => {
      article.tags.map(tag => {
        if (!tags[tag]) {
          tags.push({
            name: tag,
            path: `/blog/tags/${normalise(tag)}`,
            count: 1
          });
        } else {
          tags[tag].count++;
        }
      });

      return tags;
    }, []);

    // console.log("!!!", tags);

    return tags;
  },

  articlesByTag(state) {
    return tagName => {
      return state.articles.filter(article => article.tags.includes(tagName));
    };
  },

  articlesByCategory(state) {
    return categoryName => {
      return state.articles.filter(
        article => article.category === categoryName
      );
    };
  }
};
