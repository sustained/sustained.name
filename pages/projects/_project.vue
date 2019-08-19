<template>
  <section class="container-fixed pt-4">
    <DynamicMarkdown v-bind="dynamicMarkdown" />

    <pre>
      {{ project }}
    </pre>
  </section>
</template>

<script>
import DynamicMarkdown from "~/components/DynamicMarkdown.vue";
import loadDynamicMarkdown from "~/library/dynamic-markdown";

export default {
  layout: "project",

  components: { DynamicMarkdown },

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

  async asyncData({ store, params, error }) {
    if (!store.getters["app/isValidProject"](params.project)) {
      error({ statusCode: 404, message: "That project does not exist!" });
    }

    const dynamicMarkdown = await loadDynamicMarkdown(
      `projects/${params.project}/content.md`
    );

    return { dynamicMarkdown };
  }
};
</script>
