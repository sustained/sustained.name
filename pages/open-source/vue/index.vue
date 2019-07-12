<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">Vue.js</h1>

      <h2 class="normal-title">Documentation</h2>

      <p
        class="mb-4"
      >I run the organisation that is working on translating the Vue website to Swedish.</p>

      <p class="mb-4">Once we're done, we may well start translating other Vue-related things too!</p>

      <ul class="mb-4 list-disc list-outside">
        <li>
          <a
            href="https://github.com/vuejs-sv"
            class="link text-xl my-8"
          >View vuejs-sv organisation on Github</a>
        </li>

        <li>
          <a
            href="https://github.com/vuejs-sv/vuejs.org"
            class="link text-xl my-8"
          >View vuejs-sv/vuejs.org repository on Github</a>
        </li>
      </ul>

      <p>
        <nuxt-link
          :to="localePath('open-source')"
          class="text-teal-600 text-bold underline"
        >Back to Open Source</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  layout: "open-source",

  head: {
    title: "Vue.js - Open Source",

    meta: [
      {
        hid: "description",
        name: "description",
        content: "I contribute to the Vue.js open source project."
      }
    ]
  }
};
</script>
