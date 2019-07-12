<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">Ascension</h1>

      <h2 class="normal-title">What is it?</h2>

      <p
        class="mb-4"
      >Ascenson is a Memrise clone. It's currently in the early planning/prototyping phase. The source is currently closed but will be opened up later.</p>

      <p
        class="mb-4"
      >It's written in Javascript and uses Vue but I think I'm going to rebuild it using the Quasar framework</p>

      <h2 class="normal-title">What does it do?</h2>

      <p class="mb-4">It mostly does (or will do) what Memrise does - look at Memrise.</p>

      <h2 class="normal-title">What does it look like?</h2>

      <p class="mb-4">Currently no screenshot!</p>

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
    title: "Ascension - Projects",

    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Ascension is a Memrise clone - an app for learning languages via the scientifically proven spaced repetition technique."
      }
    ]
  }
};
</script>
