<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">Tag: {{ tag.name }}</h1>
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
  data() {
    return {
      tags: []
    };
  },

  computed: {
    tag() {
      return this.$store.getters["blog/tagByTagSlug"](this.tagSlug);
    },

    articles() {
      return this.$store.getters["blog/articlesByTagName"](this.tagSlug);
    },

    hasArticles() {
      return this.articles.length;
    }
  },

  asyncData({ store, error, params }) {
    if (!store.getters["blog/tagSlugExists"](params.tag))
      return error({ statusCode: 404, message: "Tag does not exist!" });

    return {
      tagSlug: params.tag
    };
  },

  layout: "blog"
};
</script>
