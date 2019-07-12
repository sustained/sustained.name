<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">Sforzando</h1>

      <h2 class="normal-title">What is it?</h2>

      <p
        class="mb-4"
      >Sforzando is a tool for learning music theory. Think of it as an interactive piano on steroids.</p>

      <p class="mb-4">I'm currently looking into rewriting it.</p>

      <p class="mb-4">It's written in Javascript and uses the Tone,js library.</p>

      <h2 class="normal-title">What does it do?</h2>

      <p
        class="mb-4"
      >It knows scales and modes and chord progressions and arpeggios and such and can help you learn them.</p>

      <h2 class="normal-title">What does it look like?</h2>

      <p class="mb-4">Currently no screenshots/videos!</p>

      <p class="mb-4">
        <strong>More information/better project page coming soon.</strong>
      </p>

      <p>
        <nuxt-link to="/projects" class="text-green-600 text-bold underline">Back to Projects</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  layout: "projects",

  head: {
    title: "Sforzando - Projects",

    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Sforzando is an interactive music theory and composition app. It will help you learn scales, chords, arpeggios etc. and to make music."
      }
    ]
  }
};
</script>
