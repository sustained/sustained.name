<i18n>
{
  "en": {
    "subtitle": "My unfinished personal website."
  },
  "sv": {
    "subtitle": "Min oavslutade personliga webbsida."
  },
  "de": {
    "subtitle": "Meine unvollendete persönliche Webseite"
  }
}
</i18n>

<template>
  <section class="container">
    <div>
      <h1 class="large-title">sustained.name</h1>

      <h2 class="large-subtitle" v-text="$t('subtitle')" />

      <div class="links">
        <nuxt-link
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="button mr-4"
        >{{ locale.name }}</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      // WORKAROUND: https://github.com/nuxt-community/nuxt-i18n/issues/205
      return this.$root.$i18n.locales.filter(
        lang => lang.code !== this.$i18n.locale
      );
    }
  }
};
</script>

<style>
.links {
  padding-top: 15px;
}
</style>
