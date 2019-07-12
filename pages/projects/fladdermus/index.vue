<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">Fladdermus</h1>

      <h2 class="normal-title">What is it?</h2>

      <p
        class="mb-4"
      >Fladdermus is my Discord bot. I'm currently working on the v3 rewrite. It's currently closed source.</p>

      <p
        class="mb-4"
      >It's written in Javascript and uses the Discord.js library. It uses Redis and PostgreSQL to store data.</p>

      <h2 class="normal-title">What does it do?</h2>

      <p
        class="mb-4"
      >It mostly does stuff relating to languages, like wiktionary and ord.se lookups, Duolingo/Memrise integration and so on.</p>

      <h2 class="normal-title">What does it look like?</h2>

      <p class="mb-4">
        <a
          href="https://sustained.github.io/fladdermus-static/previews/memrise-duolingo-integration.png"
          target="_blank"
          class="text-green-600 font-bold underline"
        >Click here for a screenshot.</a>
      </p>

      <p class="mb-4">It's currently being rewritten (again).</p>

      <p class="mb-4">
        <strong>More information/better project page coming soon.</strong>
      </p>

      <p>
        <nuxt-link
          :to="localePath('projects')"
          class="text-green-600 text-bold underline"
        >Back to Projects</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  layout: "projects",

  head: {
    title: "Fladdermus - Projects",

    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Fladdermus is a Discord bot that integrates with Wiktionary, Ord.se, Duolingo and Memrise and provides useful things for language nerds."
      }
    ]
  }
};
</script>
