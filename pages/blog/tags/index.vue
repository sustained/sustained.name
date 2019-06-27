<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">Tag List</h1>
    </header>

    <main>
      <div class="card">
        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li v-for="(tag, index) in tags" :key="index" class="flex-1 p-6 min-w-1/3">
            <nuxt-link :to="tag.path" class="link text-2xl">{{ tag.name}}</nuxt-link>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  computed: {
    tags() {
      return this.$store.state.blog.tags;
    }
  },

  layout: "blog"
};
</script>
