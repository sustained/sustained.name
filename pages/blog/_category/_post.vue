<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">{{ title }}</h1>
    </header>

    <main>
      <div class="card p-4">
        <no-ssr>
          <BlogPost
            :render-function="render"
            :static-render-functions="staticRenders"
            :component-list="components"
          />
        </no-ssr>
      </div>
    </main>
  </section>
</template>

<script>
import "highlight.js/styles/zenburn.css";

import BlogPost from "~/components/BlogPost.vue";

export default {
  components: { BlogPost },

  async asyncData({ params, error }) {
    try {
      let content = await import(`~/contents/blog/posts/${params.category}/${
        params.post
      }.md`);
      content = content.default;

      return {
        title: content.attributes.title,
        tags: content.attributes.tags,
        render: content.vue.render,
        staticRenders: content.vue.staticRenderFns,
        components: content.attributes.components || []
      };
    } catch (e) {
      error({ statusCode: 404, message: "That blog article does not exist!" });
    }
  },

  layout: "blog"
};
</script>
