<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">{{ category.name }}</h1>
    </header>

    <main>
      <div class="card">
        <h2 class="normal-subtitle block p-4 text-center">Articles</h2>

        <ul>
          <li v-for="(article, index) in articles" :key="index" class="flex-1 p-6 w-full">
            <nuxt-link :to="article.path" class="link">{{ article.title }}</nuxt-link>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  computed: {
    category() {
      return this.$store.getters["blog/getCategoryForSlug"](this.categorySlug);
    },

    articles() {
      return this.$store.getters["blog/articlesByCategorySlug"](
        this.categorySlug
      );
    },

    hasArticles() {
      return this.articles.length;
    }
  },

  asyncData({ params, error, store }) {
    if (!store.getters["blog/categorySlugExists"](params.category))
      return error({ statusCode: 404, message: "Category does not exist!" });

    return {
      categorySlug: params.category
    };
  },

  created() {
    console.log(this.category);
  },

  layout: "blog"
};
</script>
