<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">{{ $t("projects") }}</h1>

      <ul class="list-disc list-outside">
        <li>
          <nuxt-link
            :to="localePath('projects-ascension')"
            class="text-green-600 text-xl my-8"
          >Ascension</nuxt-link>
        </li>

        <li>
          <nuxt-link :to="localePath('projects-cello')" class="text-green-600 text-xl my-8">Cello</nuxt-link>
        </li>

        <li>
          <nuxt-link
            :to="localePath('projects-fladdermus')"
            class="text-green-600 text-xl my-8"
          >Fladdermus</nuxt-link>
        </li>

        <li>
          <nuxt-link
            :to="localePath('projects-motion')"
            class="text-green-600 text-xl my-8"
          >Motion.js</nuxt-link>
        </li>

        <li>
          <nuxt-link
            :to="localePath('projects-sforzando')"
            class="text-green-600 text-xl my-8"
          >Sforzando</nuxt-link>
        </li>

        <li>
          <nuxt-link
            :to="localePath('projects-website')"
            class="text-green-600 text-xl my-8"
          >sustained.name</nuxt-link>
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
