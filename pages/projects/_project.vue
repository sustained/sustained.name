<template>
  <section class="container-fixed pt-4">
    <pre>
      {{ project }}
    </pre>
  </section>
</template>

<script>
export default {
  layout: "project",

  data() {
    return {};
  },

  head() {
    return {
      title: `${this.project.name} - Projects`,

      meta: [
        {
          hid: "description",
          name: "description",
          content: this.project.description
        }
      ]
    };
  },

  computed: {
    project() {
      const projectName = this.$route.params.project;

      let project;
      try {
        project = this.$store.state.app.projects[projectName];

        if (project.__error) {
          throw new Error(project.__error);
        }
      } catch (e) {
        project = {
          name: projectName.substr(0, 1).toUpperCase() + projectName.substr(1),
          description: `The project page for ${projectName}.`,
          keywords: [projectName, "project"],
          license: null,
          repository: null,
          languages: [],
          technologies: [],
          screenshots: []
        };
      }

      return project;
    }
  },

  asyncData({ store, params, error }) {
    if (!store.getters["app/isValidProject"](params.project)) {
      error({ statusCode: 404, message: "That project does not exist!" });
    }

    return {};
  }
};
</script>
