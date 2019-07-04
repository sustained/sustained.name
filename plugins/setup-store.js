export default async ({ store }) => {
  const tags = await import("static/json/tags.json");
  const articles = await import("static/json/articles.json");
  const categories = await import("static/json/categories.json");

  store.commit("blog/setTags", tags.default);
  store.commit("blog/setArticles", articles.default);
  store.commit("blog/setCategories", categories.default);
};
