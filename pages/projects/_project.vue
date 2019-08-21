<template>
  <section class="container-fixed pt-4">
    <DynamicMarkdown v-bind="project" />
  </section>
</template>

<script>
import { getMeta, setHead, asyncData } from "~/modules/dynamic-markdown-mixin";

export default {
  layout: "projects",

  mixins: [getMeta, setHead],

  asyncData
};
</script>
