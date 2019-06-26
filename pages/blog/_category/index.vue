<template>
  <div class="iamatest">
    <div v-if="hasArticles">
      <p>I am the list of blog articles for this category.</p>

      <ul>
        <li v-for="(article, index) in articles" :key="index">
          <nuxt-link class="link" :to="article.path">{{ article.title }}</nuxt-link>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>This category has no articles!</p>
    </div>
  </div>
</template>

<script>
import { normalise, categories } from "~/data/blog.js";

export default {
  data() {
    return {
      articles: []
    };
  },

  computed: {
    hasArticles() {
      return this.articles.length;
    }
  },

  asyncData({ store, error, params }) {
    if (
      !categories.some(category => normalise(category.name) === params.category)
    )
      return error({
        statusCode: 404,
        message: "That blog category does not exist!"
      });

    return {
      articles: store.getters["blog/articlesByCategory"](params.category)
    };
  },

  layout: "blog"
};
</script>
