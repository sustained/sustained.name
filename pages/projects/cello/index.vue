<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">Cello</h1>

      <h2 class="normal-title">What is it?</h2>

      <p
        class="mb-4"
      >Cello is a Trello clone in very early pre-alpha stages. It's open source and on Github.</p>

      <p class="mb-4">It's written in Javascript and uses Vue.</p>

      <h2 class="normal-title">What does it do?</h2>

      <p
        class="mb-4"
      >It does basically what Trello does - just look at Trello. Except much of the functionality isn't in place yet.</p>

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
    title: "Trello - Projects",

    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Cello is a Trello clone. A sort of kanban or task list app but on steroids. You can organise anything with it!"
      }
    ]
  }
};
</script>
