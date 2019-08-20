<template>
  <section class="container-fixed pt-4">
    <DynamicMarkdown v-bind="dynamicMarkdown" />

    <pre>
      {{ project }}
    </pre>
  </section>
</template>

<script>
export default {
  layout: "projects",

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

      return this.$store.state["dynamic-markdown"].projects[projectName];
    }
  },

  async asyncData({ app, store, params, error }) {
    const project = store.getters["dynamic-markdown/projects"](params.project);

    if (!project) {
      error({ statusCode: 404, message: "That project does not exist!" });
    }

    const dynamicMarkdown = await app.loadMarkdown(
      `projects/${params.project}/content.md`
    );

    return { dynamicMarkdown };
  }
};
</script>
