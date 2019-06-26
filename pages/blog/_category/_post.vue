<template>
  <div>
    <no-ssr>
      <BlogPost
        :render-function="renderFunction"
        :static-render-functions="staticRenderFunctions"
        :component-list="components"
      />
    </no-ssr>
  </div>
</template>

<script>
import BlogPost from "~/components/BlogPost.vue";

export default {
  components: { BlogPost },

  async asyncData({ params, error }) {
    try {
      const content = await import(`~/contents/blog/posts/${params.category}/${
        params.post
      }.md`);

      return {
        renderFunction: content.vue.render,
        components: content.attributes.components,
        staticRenderFunctions: content.vue.staticRenderFns
      };
    } catch (e) {
      error({ statusCode: 404, message: "That blog article does not exist!" });
    }
  },

  layout: "blog"
};
</script>
