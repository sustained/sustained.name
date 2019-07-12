<i18n>
{
  "en": {
    "welcome": "Welcome to my blog!",
    "show-tags": "Show tags",
    "hide-tags": "Hide tags",
    "show-categories": "Show categories",
    "hide-categories": "Hide categories",
    "tags": "Tags",
    "articles": "Articles",
    "categories": "Categories"
  },
  "sv": {
    "welcome": "Välkommen till min blogg!",
    "show-tags": "Visa taggar",
    "hide-tags": "Dölja taggar",
    "show-categories": "Visa kategorier",
    "hide-categories": "Dölja kategorier",
    "tags": "Taggar",
    "articles": "Artiklar",
    "categories": "Kategorier"
  }
}
</i18n>

<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">{{ $t("welcome" ) }}</h1>

      <button
        class="button mr-4 requires-js"
        @click.prevent="toggleCategories"
        v-text="showCategoriesText"
      />
      <button class="button requires-js" @click.prevent="toggleTags" v-text="showTagsText" />
    </header>

    <main>
      <div v-show="showCategories" class="card">
        <h2 class="normal-title block p-4 text-center">{{ $t("categories") }}</h2>

        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li v-for="(category, index) in categories" :key="index" class="flex-1 p-6 min-w-1/3">
            <nuxt-link :to="category.path" class="link">{{ category.name }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div v-show="showTags" class="card">
        <h2 class="normal-title block p-4 text-center">{{ $t("tags") }}</h2>

        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li v-for="(tag, index) in tags" :key="index" class="flex-1 p-6 min-w-1/3">
            <nuxt-link :to="tag.path" class="link">{{ tag.name }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="card">
        <h2 class="normal-title block p-4 text-center">{{ $t("articles") }}</h2>

        <ul class>
          <li v-for="(article, index) in articles" :key="index" class="flex-1 p-6 w-full">
            <nuxt-link :to="article.path" class="link">{{ article.title}}</nuxt-link>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  head: {
    title: "Blog",

    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "I blog about music composition, music, language learning, programming, web development, gaming, literature and more!"
      }
    ]
  },

  data() {
    return {
      // showCategories: true,
      // showTags: true
    };
  },

  computed: {
    categories() {
      return this.$store.state.blog.categories;
    },

    tags() {
      return this.$store.state.blog.tags;
    },

    articles() {
      return this.$store.state.blog.articles;
    },

    showCategoriesText() {
      return this.showCategories
        ? this.$t("hide-categories")
        : this.$t("show-categories");
    },

    showTagsText() {
      return this.showTags ? this.$t("hide-tags") : this.$t("show-tags");
    },

    showCategories() {
      return this.$store.state.blog.showCategories;
    },

    showTags() {
      return this.$store.state.blog.showTags;
    }
  },

  layout: "blog",

  methods: {
    toggleCategories() {
      this.$store.dispatch("blog/toggleShowCategories");
    },

    toggleTags() {
      this.$store.dispatch("blog/toggleShowTags");
    }
  }
};
</script>
