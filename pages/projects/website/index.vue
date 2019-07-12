<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">sustained.name</h1>

      <h2 class="normal-title">What is it?</h2>

      <p class="mb-4">You're looking at it.</p>

      <p
        class="mb-4"
      >It's made using Nuxt.js and Tailwind. The blog is custom. It's open source and on Github.</p>

      <h2 class="normal-title">What does it do?</h2>

      <p class="mb-4">It doesn't really do much yet but I plan to keep working on it!</p>

      <h2 class="normal-title">What does it look like?</h2>

      <p class="mb-4">Umm.</p>

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
    title: "Personal Website - Projects",

    meta: [
      {
        hid: "description",
        name: "description",
        content: "sustained.name is my portfolio, résumé, blog and more!"
      }
    ]
  }
};
</script>
