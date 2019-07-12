<template>
  <nav @click.capture="onClick">
    <ul>
      <li>
        <nuxt-link class="router-link" :to="localePath('index')">{{ $t('home') }}</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" :to="localePath('blog')">{{ $t('blog') }}</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" :to="localePath('projects')">{{ $t('projects') }}</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" :to="localePath('open-source')">{{ $t('open-source') }}</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" :to="localePath('portfolio')">{{ $t('portfolio') }}</nuxt-link>
      </li>

      <li>
        <nuxt-link class="router-link" :to="localePath('resume')">{{ $t('resume') }}</nuxt-link>
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
