<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">Welcome to my blog!</h1>

      <button class="button mr-4" @click.prevent="toggleCategories" v-text="showCategoriesText"/>
      <button class="button" @click.prevent="toggleTags" v-text="showTagsText"/>
    </header>

    <main>
      <div v-show="showCategories" class="card">
        <h2 class="normal-title block p-4 text-center">Categories</h2>

        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li v-for="(category, index) in categories" :key="index" class="flex-1 p-6">
            <nuxt-link :to="category.path" class="link text-2xl">{{ category.name }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div v-show="showTags" class="card">
        <h2 class="normal-title block p-4 text-center">Tags</h2>

        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li v-for="(tag, index) in tags" :key="index" class="flex-1 p-6">
            <nuxt-link :to="tag.path" class="link text-2xl">{{ tag.name }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="card">
        <h2 class="normal-title block p-4 text-center">Articles</h2>

        <ul class>
          <li v-for="(article, index) in articles" :key="index" class="flex-1 p-6 w-full">
            <nuxt-link :to="article.path" class="link text-2xl">{{ article.title}}</nuxt-link>
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
      showCategories: false,
      showTags: false
    };
  },

  computed: {
    categories() {
      return this.$store.state.blog.categories;
    },

    articles() {
      return this.$store.state.blog.articles;
    },

    tags() {
      return this.$store.getters["blog/tags"];
    },

    showCategoriesText() {
      return this.showCategories ? "Hide Categories" : "Show Categories";
    },

    showTagsText() {
      return this.showTags ? "Hide Tags" : "Show Tags";
    }
  },

  layout: "blog",

  methods: {
    toggleCategories() {
      this.showCategories = !this.showCategories;
    },

    toggleTags() {
      this.showTags = !this.showTags;
    }
  }
};
</script>

<style scoped>
ul li {
  display: block;
  min-width: 33%;
}
</style>
