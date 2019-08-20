<template>
  <section class="container-fixed pt-4">
    <header class="flex items-center px-4">
      <h1 class="normal-title flex-1">Projects Using Technology ({{ technology }})</h1>
    </header>

    <main>
      <div class="card">
        <ul class="flex w-full flex-wrap items-center justify-center text-center">
          <li
            v-for="project of projectsUsingTechnology"
            :key="project"
            class="flex-1 p-6 min-w-1/3"
          >
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
    technology() {
      return this.$route.params.technology;
    },

    projectsUsingTechnology() {
      const projects = this.$store.state["dynamic-markdown"].projects;

      const projectsUsingTechnology = [];

      for (const [projectName, projectData] of Object.entries(projects)) {
        if (projectData.technologies.includes(this.technology)) {
          projectsUsingTechnology.push(projectName);
        }
      }

      return projectsUsingTechnology;
    }
  },

  layout: "projects"
};
</script>
