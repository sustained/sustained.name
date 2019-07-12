<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">Projects</h1>

      <ul class="list-disc list-outside">
        <li>
          <nuxt-link to="/projects/ascension" class="text-green-600 text-xl my-8">Ascension</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/projects/cello" class="text-green-600 text-xl my-8">Cello</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/projects/fladdermus" class="text-green-600 text-xl my-8">Fladdermus</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/projects/motion" class="text-green-600 text-xl my-8">Motion.js</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/projects/sforzando" class="text-green-600 text-xl my-8">Sforzando</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/projects/website" class="text-green-600 text-xl my-8">sustained.name</nuxt-link>
        </li>

        <li class="mt-4 list-none">More projects coming soon.</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  layout: "projects",

  head: {
    title: "Projects Listing"
  }
};
</script>
