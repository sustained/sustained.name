<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">{{ title }}</h1>

      <button class="requires-js button" @click.prevent="toggleRenderMode" v-text="showRenderText" />
    </header>

    <main class="blog-article">
      <div v-if="renderMode === 'html'" class="card p-4">
        <DynamicMarkdown v-bind="article" />
      </div>

      <div v-else-if="renderMode === 'markdown'" class="card p-4">
        <pre>{{ markdown }}</pre>
      </div>
    </main>
  </section>
</template>

<script>
import { stringify } from "gray-matter";

export default {
  data() {
    return {
      renderMode: "html"
    };
  },

  computed: {
    title() {
      return this.article.attributes.title;
    },

    showRenderText() {
      if (this.renderMode === "html") return "View Raw Markdown";
      else return "View Rendered HTML";
    },

    markdown() {
      const { rawMarkdown, attributes } = this.article;

      return stringify(`\n${rawMarkdown}`, attributes);
    }
  },

  async asyncData({ params, error, app }) {
    try {
      const article = await app.loadMarkdown(
        `blog/posts/${params.category}/${params.post}.md`
      );

      return { article };
    } catch (e) {
      error({ statusCode: 404, message: "That blog article does not exist!" });
    }
  },

  mounted() {
    try {
      if (!location.hash.length) return;

      const scrollTo = document.querySelector(location.hash);

      if (scrollTo)
        scrollTo.scrollIntoView({
          behavior: "smooth"
        });
    } catch (e) {
      console.error(e.message);
    }
  },

  methods: {
    toggleRenderMode() {
      if (this.renderMode === "html") this.renderMode = "markdown";
      else this.renderMode = "html";
    }
  },

  layout: "blog"
};
</script>
