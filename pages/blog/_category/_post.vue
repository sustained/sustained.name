<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">{{ title }}</h1>

      <button class="requires-js button" @click.prevent="toggleRenderMode" v-text="showRenderText"/>
    </header>

    <main class="blog-article">
      <div v-if="renderMode === 'html'" class="card p-4">
        <BlogPost
          :render-function="render"
          :static-render-functions="staticRenders"
          :component-list="components"
        />
      </div>

      <div v-else-if="renderMode === 'markdown'" class="card p-4">
        <pre>{{ markdown }}</pre>
      </div>
    </main>
  </section>
</template>

<script>
import BlogPost from "~/components/BlogPost.vue";

import { stringify } from "gray-matter";

export default {
  components: { BlogPost },

  data() {
    return {
      renderMode: "html"
    };
  },

  computed: {
    showRenderText() {
      if (this.renderMode === "html") return "View Raw Markdown";
      else return "View Rendered HTML";
    },

    markdown() {
      return stringify("\n" + this.body, this.attrs);
    }
  },

  async asyncData({ params, error }) {
    try {
      let content = await import(`~/contents/blog/posts/${params.category}/${
        params.post
      }.md`);
      content = content.default;

      const attrs = Object.assign({}, content.attributes);
      delete attrs._meta;

      return {
        tags: content.attributes.tags,
        body: content.body,
        attrs: attrs,
        title: content.attributes.title,
        render: content.vue.render,
        staticRenders: content.vue.staticRenderFns,
        components: content.attributes.components || []
      };
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
