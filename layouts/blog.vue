<template>
  <div class="section-blog">
    <Header />

    <main class="main">
      <div>
        <nuxt />
      </div>
    </main>

    <footer />
  </div>
</template>

<script>
import "~/assets/scss/blog.scss";

import Header from "~/components/layout/Header.vue";

export default {
  components: { Header }
};
</script>
