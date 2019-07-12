<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">Open Source</h1>

      <ul class="list-disc list-outside">
        <li>
          <nuxt-link to="/open-source/vue" class="link text-xl my-8">Vue.js</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/open-source/cofh" class="link text-xl my-8">CoFH</nuxt-link>
        </li>

        <li class="mt-4 list-none">More open source coming soon.</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  layout: "open-source",

  head: {
    title: "Open Source",

    meta: [
      {
        hid: "description",
        name: "description",
        content: "I <3 open source. Read about my contributions here."
      }
    ]
  }
};
</script>
