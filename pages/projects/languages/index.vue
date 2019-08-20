<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">Language List</h1>
    </header>

    <main>
      <div class="card">
        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li
            v-for="(projectList, language) of languages"
            :key="language"
            class="flex-1 p-6 min-w-1/3"
          >
            <nuxt-link :to="'/projects/languages/' + language" class="link text-2xl">{{ language }}</nuxt-link>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  computed: {
    languages() {
      return this.$store.state["dynamic-markdown"].projects_languages;
    }
  },

  layout: "projects"
};
</script>
