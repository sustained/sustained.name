<template>
  <section class="container-fixed pt-4">
    <ProjectInfo v-bind="project.attributes" />
    <DynamicMarkdown v-bind="project" />
  </section>
</template>

<script>
import { getMeta, setHead, asyncData } from "~/modules/dynamic-markdown-mixin";

import ProjectInfo from "@/components/projects/ProjectInfo.vue";

export default {
  layout: "projects",
  components: { ProjectInfo },
  mixins: [getMeta, setHead],
  asyncData
};
</script>
