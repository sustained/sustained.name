<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">Projects Using Language ({{ language }})</h1>
    </header>

    <main>
      <div class="card">
        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li v-for="project of projectsUsingLanguage" :key="project" class="flex-1 p-6 min-w-1/3">
            <nuxt-link :to="'/projects/' + project" class="link text-2xl">{{ project }}</nuxt-link>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$route.params.language;
    },

    projectsUsingLanguage() {
      const projects = this.$store.state["dynamic-markdown"].projects;

      const projectsUsingLanguage = [];

      for (const [projectName, projectData] of Object.entries(projects)) {
        if (projectData.languages.includes(this.language)) {
          projectsUsingLanguage.push(projectName);
        }
      }

      return projectsUsingLanguage;
    }
  },

  layout: "projects"
};
</script>
