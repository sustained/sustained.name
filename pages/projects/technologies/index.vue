<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">Technology List</h1>
    </header>

    <main>
      <div class="card">
        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li
            v-for="(projectList, technology) of technologies"
            :key="technology"
            class="flex-1 p-6 min-w-1/3"
          >
            <nuxt-link
              :to="'/projects/technologies/' + technology"
              class="link text-2xl"
            >{{ technology }}</nuxt-link>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  computed: {
    technologies() {
      return this.$store.state["dynamic-markdown"].projects_technologies;
    }
  },

  layout: "projects"
};
</script>
