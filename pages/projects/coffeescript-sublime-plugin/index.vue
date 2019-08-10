<template>
  <section class="container">
    <div class="text-left">
      <h1 class="large-title">CoffeeScript-Sublime-Plugin</h1>

      <h2 class="normal-title">What is it?</h2>

      <p
        class="mb-4"
      >CoffeeScript-Sublime-Plugin does pretty much exactly what it says on the tin. A long time ago, before VS Code even existed, Sublime Text was my editor of choice.</p>

      <p>CoffeeScript was also rather popular at the time and I was one of many who had made the switch.</p>

      <p>But there was no plugin for CoffeeScript at the time, so I decided to try and make one.</p>

      <p>It actually got quite popular. It's probably the most popular project I ever created, in fact.</p>

      <p
        class="mb-4"
      >It's written in Python, which is a language I don't really have all that much experience with; especially at the time.</p>

      <h2 class="normal-title">What does it do?</h2>

      <p
        class="mb-4"
      >It added commands, shortcuts, snippets, build support... the usual shebang for such a plugin.</p>

      <h2 class="normal-title">What does it look like?</h2>

      <p>Right now I don't feel like downloading and installing Sublime Text then trying to get an old project working with it to provide screenshots but you're welcome to try yourself!</p>

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
    title: "CoffeeScript-Sublime-Plugin - Projects",

    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "CoffeeScript-Sublime-Plugin was a plugin for the Sublime Text editor, written in Python, that provided some useful features for CoffeeScript developers."
      }
    ]
  }
};
</script>
