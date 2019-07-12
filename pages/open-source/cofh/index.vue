<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">Cult of the Full Hub</h1>

      <h2 class="normal-title">Documentation</h2>

      <p class="mb-4">I have contributed to the documentation on the official CoFH website.</p>

      <p
        class="mb-4"
      >More specifically, I added an examples system to the documentation for the CoFH World mod.</p>

      <ul class="mb-4 list-disc list-outside">
        <li>
          <a
            href="https://teamcofh.com/docs/cofh-world/"
            class="link text-xl my-8"
          >View the CoFH World docs</a>
        </li>

        <li>
          <a
            href="https://github.com/sustained/cofh.github.io"
            class="link text-xl my-8"
          >View the sustained/cofh.github.io repository on Github</a>
        </li>
      </ul>

      <p>
        <nuxt-link to="/open-source" class="text-teal-600 text-bold underline">Back to Open Source</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  layout: "open-source",

  head: {
    title: "CoFH - Open Source",

    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "I have contributed to the documentation on the official CoFH website."
      }
    ]
  }
};
</script>
