<template>
  <nav @click.capture="onClick">
    <ul>
      <li>
        <nuxt-link class="router-link" to="/">Home</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" to="/blog">Blog</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" to="/projects">Projects</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" to="/open-source">Open Source</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" to="/portfolio">Portfolio</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" to="/resume">Résumé</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit("navigate");
    }
  }
};
</script>
