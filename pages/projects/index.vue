<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">{{ $t("projects") }}</h1>

      <ul class="list-disc list-outside">
        <li v-for="(project, projectName) of projects" :key="projectName">
          <nuxt-link
            :to="localePath({ name: 'projects-project', params: { project: projectName }})"
            class="text-green-600 text-xl my-8"
          >{{ project.name }}</nuxt-link>
        </li>

        <li class="mt-4 list-none">More projects coming soon.</li>
      </ul>

      <h2 class="large-title">Languages</h2>

      <p>
        <nuxt-link :to="localePath({ name: 'projects-languages' })">View languages.</nuxt-link>
      </p>

      <h2 class="large-title">Technologies</h2>

      <p>
        <nuxt-link :to="localePath({ name: 'projects-technologies' })">View technologies.</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import { getEntities } from "~/modules/dynamic-markdown-mixin";

export default {
  layout: "projects",
  asyncData: getEntities("projects"),
  head() {
    return {
      title: "Projects"
    };
  }
};
</script>
